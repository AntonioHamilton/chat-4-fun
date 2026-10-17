import { createServer } from "http";
import next from "next";
import { WebSocket, WebSocketServer } from "ws";
import {
	ClientMessage,
	GameState,
	Mode,
	Seat,
	ServerMessage
} from "./src/GuessCountry/Types/game.types";
import {
	continueRound,
	createState,
	guess,
	handleTimeout,
	nextLetter,
	setCountries,
	viewFor
} from "./src/GuessCountry/Utils/engine";

type Room = {
	code: string;
	mode: Mode;
	sockets: [WebSocket | null, WebSocket | null];
	state: GameState | null;
	timer: NodeJS.Timeout | null;
};

const dev = !process.argv.includes("--prod");
const port = Number(process.env.PORT) || 3000;
const CODE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

const app = next({ dev });
const handle = app.getRequestHandler();
const rooms = new Map<string, Room>();
const seats = new WeakMap<WebSocket, { room: Room; seat: Seat }>();

const send = (socket: WebSocket | null, message: ServerMessage) => {
	if (socket && socket.readyState === WebSocket.OPEN) {
		socket.send(JSON.stringify(message));
	}
};

const createCode = () => {
	let code = "";
	do {
		code = Array.from(
			{ length: 5 },
			() => CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)]
		).join("");
	} while (rooms.has(code));
	return code;
};

const broadcast = (room: Room) => {
	if (!room.state) return;
	const now = Date.now();
	for (const seat of [0, 1] as Seat[]) {
		send(room.sockets[seat], {
			type: "view",
			view: viewFor(room.state, seat, now)
		});
	}
};

const schedule = (room: Room) => {
	if (room.timer) clearTimeout(room.timer);
	room.timer = null;
	const deadline = room.state?.deadline;
	if (deadline == null) return;

	room.timer = setTimeout(
		() => {
			if (!room.state) return;
			room.state = handleTimeout(room.state, Date.now());
			broadcast(room);
			schedule(room);
		},
		Math.max(0, deadline - Date.now()) + 50
	);
};

const closeRoom = (room: Room) => {
	if (room.timer) clearTimeout(room.timer);
	rooms.delete(room.code);
};

const isMode = (value: unknown): value is Mode =>
	value === "timed" || value === "untimed";

const applyAction = (room: Room, seat: Seat, message: ClientMessage) => {
	if (message.type !== "action" || !room.state) return;
	const { action } = message;
	const now = Date.now();
	const before = room.state;
	let after = before;

	if (action.type === "setCountries" && Array.isArray(action.countries)) {
		after = setCountries(before, seat, action.countries.map(String));
	} else if (action.type === "nextLetter") {
		after = nextLetter(before, seat, now);
	} else if (action.type === "guess" && typeof action.country === "string") {
		after = guess(before, seat, action.country, now);
	} else if (action.type === "continue") {
		after = continueRound(before, seat, now);
	}

	if (after === before) {
		send(room.sockets[seat], { type: "error", code: "invalid" });
		return;
	}
	room.state = after;
	broadcast(room);
	schedule(room);
};

const onMessage = (socket: WebSocket, raw: string) => {
	let message: ClientMessage;
	try {
		message = JSON.parse(raw);
	} catch {
		return;
	}

	const joined = seats.get(socket);

	if (message.type === "create" && !joined && isMode(message.mode)) {
		const room: Room = {
			code: createCode(),
			mode: message.mode,
			sockets: [socket, null],
			state: null,
			timer: null
		};
		rooms.set(room.code, room);
		seats.set(socket, { room, seat: 0 });
		send(socket, { type: "created", code: room.code });
		return;
	}

	if (message.type === "join" && !joined) {
		const room = rooms.get(String(message.code).toUpperCase());
		if (!room) return send(socket, { type: "error", code: "roomNotFound" });
		if (room.sockets[1])
			return send(socket, { type: "error", code: "roomFull" });

		room.sockets[1] = socket;
		seats.set(socket, { room, seat: 1 });
		room.state = createState(room.mode, Date.now());
		send(room.sockets[0], { type: "started" });
		send(socket, { type: "started" });
		broadcast(room);
		schedule(room);
		return;
	}

	if (joined) applyAction(joined.room, joined.seat, message);
};

app.prepare().then(() => {
	const server = createServer((req, res) => handle(req, res));
	const wss = new WebSocketServer({ noServer: true });
	const upgrade = app.getUpgradeHandler();

	server.on("upgrade", (req, socket, head) => {
		if (req.url === "/ws") {
			wss.handleUpgrade(req, socket, head, (ws) => {
				wss.emit("connection", ws, req);
			});
		} else {
			upgrade(req, socket, head);
		}
	});

	wss.on("connection", (socket) => {
		socket.on("message", (data) => onMessage(socket, data.toString()));
		socket.on("close", () => {
			const joined = seats.get(socket);
			if (!joined) return;
			const opponent = joined.room.sockets[joined.seat === 0 ? 1 : 0];
			send(opponent, { type: "opponentLeft" });
			closeRoom(joined.room);
		});
	});

	server.listen(port, () => {
		console.log(`> Ready on http://localhost:${port}`);
	});
});

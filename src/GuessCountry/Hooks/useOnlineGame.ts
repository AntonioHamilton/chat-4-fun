import { useCallback, useEffect, useRef, useState } from "react";
import {
	ClientMessage,
	GameAction,
	GameView,
	Mode,
	ServerMessage
} from "../Types/game.types";
import { Language } from "@/Types/Language";

export type OnlineStart =
	| { type: "create"; mode: Mode }
	| { type: "join"; code: string };

export type OnlineStatus = "connecting" | "waiting" | "playing" | "error";
export type OnlineError =
	| "roomNotFound"
	| "roomFull"
	| "connectionError"
	| "opponentLeft"
	| null;

const CONNECT_TIMEOUT_MS = 60000;

const getSocketUrl = () => {
	const configured = process.env.NEXT_PUBLIC_WS_URL;
	if (configured) return configured;
	const protocol = window.location.protocol === "https:" ? "wss" : "ws";
	return `${protocol}://${window.location.host}/ws`;
};

export const useOnlineGame = (start: OnlineStart, language: Language) => {
	const [status, setStatus] = useState<OnlineStatus>("connecting");
	const [code, setCode] = useState<string | null>(
		start.type === "join" ? start.code.toUpperCase() : null
	);
	const [view, setView] = useState<GameView | null>(null);
	const [error, setError] = useState<OnlineError>(null);
	const socketRef = useRef<WebSocket | null>(null);
	const languageRef = useRef(language);
	languageRef.current = language;

	useEffect(() => {
		const socket = new WebSocket(getSocketUrl());
		socketRef.current = socket;
		let finished = false;

		const fail = (reason: Exclude<OnlineError, null>) => {
			finished = true;
			clearTimeout(connectTimer);
			setError(reason);
			setStatus("error");
		};

		const connectTimer = setTimeout(() => {
			if (socket.readyState !== WebSocket.OPEN) {
				fail("connectionError");
				socket.close();
			}
		}, CONNECT_TIMEOUT_MS);

		socket.onopen = () => {
			clearTimeout(connectTimer);
			const message: ClientMessage =
				start.type === "create"
					? { type: "create", mode: start.mode, language: languageRef.current }
					: {
							type: "join",
							code: start.code.toUpperCase(),
							language: languageRef.current
						};
			socket.send(JSON.stringify(message));
		};

		socket.onmessage = (event) => {
			const message: ServerMessage = JSON.parse(event.data);
			if (message.type === "created") {
				setCode(message.code);
				setStatus("waiting");
			} else if (message.type === "started") {
				setStatus("playing");
			} else if (message.type === "view") {
				setView(message.view);
			} else if (message.type === "error" && message.code !== "invalid") {
				fail(message.code);
			} else if (message.type === "opponentLeft") {
				fail("opponentLeft");
			}
		};

		socket.onerror = () => {
			if (!finished) fail("connectionError");
		};

		socket.onclose = () => {
			if (!finished) fail("connectionError");
		};

		return () => {
			finished = true;
			clearTimeout(connectTimer);
			socket.close();
		};
	}, [start]);

	const send = useCallback((action: GameAction) => {
		const socket = socketRef.current;
		if (socket?.readyState !== WebSocket.OPEN) return;
		const message: ClientMessage = { type: "action", action };
		socket.send(JSON.stringify(message));
	}, []);

	return { status, code, view, error, send };
};

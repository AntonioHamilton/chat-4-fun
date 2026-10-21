import { Mode, NewRankingEntry, RankingEntry } from "../Types/game.types";

const SAVE_WINDOW_MS = 60_000;
const RETRY_MS = 2_000;
const REQUEST_TIMEOUT_MS = 10_000;

const getBaseUrl = () => {
	const configured = process.env.NEXT_PUBLIC_WS_URL;
	if (!configured) return "http://localhost:3001";
	return configured.replace(/^ws/, "http").replace(/\/ws$/, "");
};

const request = (
	path: string,
	init?: RequestInit,
	timeoutMs = REQUEST_TIMEOUT_MS
) =>
	fetch(`${getBaseUrl()}${path}`, {
		...init,
		signal: AbortSignal.timeout(timeoutMs)
	});

const delay = (ms: number) =>
	new Promise<void>((resolve) => setTimeout(resolve, ms));

export const wakeServer = async () => {
	try {
		await request("/health");
	} catch {
		return;
	}
};

export const fetchRanking = async (mode: Mode): Promise<RankingEntry[]> => {
	const response = await request(`/ranking?mode=${mode}`);
	if (!response.ok) throw new Error(`ranking status ${response.status}`);
	return (await response.json()) as RankingEntry[];
};

const postScore = (entry: NewRankingEntry, timeoutMs: number) =>
	request(
		"/ranking",
		{
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(entry)
		},
		timeoutMs
	).catch(() => null);

export const saveScore = async (entry: Omit<NewRankingEntry, "id">) => {
	const payload: NewRankingEntry = { ...entry, id: crypto.randomUUID() };
	const deadline = Date.now() + SAVE_WINDOW_MS;
	for (;;) {
		const timeoutMs = Math.min(REQUEST_TIMEOUT_MS, deadline - Date.now());
		const response = await postScore(payload, Math.max(timeoutMs, 1));
		if (response && response.status < 500) {
			if (response.ok) return;
			throw new Error(`save status ${response.status}`);
		}
		if (Date.now() >= deadline) throw new Error("save window expired");
		await delay(RETRY_MS);
	}
};

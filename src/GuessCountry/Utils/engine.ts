import { COUNTRIES_PER_PLAYER } from "@/GuessCountry/Constants/game";
import { GameState, GameView, Mode, Seat, Side } from "../Types/game.types";
import { Language } from "@/Types/Language";
import { countryName, findCountry, randomCountries } from "@/Utils/countries";
import { countLetters, normalize, revealPrefix } from "@/Utils/text";

export const PICK_MS = 120_000;
export const GUESS_MS = 30_000;
export const WINS_NEEDED = 2;
export const MAX_ROUNDS = 3;
const MAX_GUESS_LENGTH = 60;

const other = (seat: Seat): Seat => (seat === 0 ? 1 : 0);

const pickDeadline = (mode: Mode, now: number) =>
	mode === "timed" ? now + PICK_MS : null;

const guessDeadline = (mode: Mode, now: number) =>
	mode === "timed" ? now + GUESS_MS : null;

export const createState = (
	mode: Mode,
	now: number,
	random: () => number = Math.random
): GameState => {
	const starter: Seat = random() < 0.5 ? 0 : 1;
	return {
		mode,
		phase: "picking",
		round: 1,
		starter,
		giver: starter,
		countries: [null, null],
		solved: [0, 0],
		revealed: [0, 0],
		wrong: [[], []],
		awaitingGuess: false,
		wins: [0, 0],
		roundWinner: null,
		matchWinner: null,
		acks: [false, false],
		deadline: pickDeadline(mode, now),
		lastGuess: null,
		eventId: 0
	};
};

const currentWord = (state: GameState, seat: Seat): string | null =>
	state.countries[seat]?.[state.solved[seat]] ?? null;

const maxLetters = (word: string): number =>
	Math.max(countLetters(word), countLetters(countryName(word, "EN_US")));

const startTurn = (state: GameState, now: number): GameState => {
	if (state.phase !== "playing" || state.awaitingGuess) return state;
	const word = currentWord(state, state.giver);
	if (!word) return state;

	const revealed: [number, number] = [...state.revealed];
	revealed[state.giver] = Math.min(revealed[state.giver] + 1, maxLetters(word));
	return {
		...state,
		revealed,
		awaitingGuess: true,
		deadline: guessDeadline(state.mode, now)
	};
};

export const setCountries = (
	state: GameState,
	seat: Seat,
	countries: string[],
	now: number = Date.now()
): GameState => {
	if (state.phase !== "picking" || state.countries[seat]) return state;
	if (countries.length !== COUNTRIES_PER_PLAYER) return state;

	const canonical = countries.map(findCountry);
	if (canonical.some((name) => name === null)) return state;
	if (new Set(canonical).size !== COUNTRIES_PER_PLAYER) return state;

	const next: GameState = {
		...state,
		countries: [...state.countries] as GameState["countries"]
	};
	next.countries[seat] = canonical as string[];

	if (next.countries[0] && next.countries[1]) {
		next.phase = "playing";
		next.giver = next.starter;
		next.deadline = null;
		return startTurn(next, now);
	}
	return next;
};

export const guess = (
	state: GameState,
	seat: Seat,
	country: string,
	now: number,
	timedOut = false,
	passed = false
): GameState => {
	if (state.phase !== "playing" || !state.awaitingGuess) return state;
	if (seat !== other(state.giver)) return state;

	const skipped = timedOut || passed;
	const typed = country.trim().slice(0, MAX_GUESS_LENGTH);
	const text = skipped ? "" : (findCountry(typed) ?? typed);
	if (!skipped && !text) return state;

	const giver = state.giver;
	const word = currentWord(state, giver) as string;
	const correct = !skipped && normalize(word) === normalize(text);
	const event = {
		id: state.eventId + 1,
		seat,
		country: text,
		correct,
		timeout: timedOut,
		passed
	};

	const solved: [number, number] = [...state.solved];
	const revealed: [number, number] = [...state.revealed];
	const wrong: [string[], string[]] = [
		[...state.wrong[0]],
		[...state.wrong[1]]
	];

	if (correct) {
		solved[giver]++;
		revealed[giver] = 0;
		wrong[giver] = [];
	} else if (text && !wrong[giver].includes(text)) {
		wrong[giver].push(text);
	}

	const next: GameState = {
		...state,
		solved,
		revealed,
		wrong,
		awaitingGuess: false,
		deadline: null,
		lastGuess: event,
		eventId: event.id,
		giver: seat
	};
	return correct && solved[giver] >= COUNTRIES_PER_PLAYER
		? finishRound(next, seat)
		: startTurn(next, now);
};

export const pass = (state: GameState, seat: Seat, now: number): GameState =>
	guess(state, seat, "", now, false, true);

const finishRound = (state: GameState, winner: Seat): GameState => {
	const wins: [number, number] = [...state.wins];
	wins[winner]++;
	const matchOver = wins[winner] >= WINS_NEEDED;
	return {
		...state,
		wins,
		phase: matchOver ? "matchOver" : "roundOver",
		roundWinner: winner,
		matchWinner: matchOver ? winner : null,
		acks: [false, false],
		deadline: null
	};
};

export const continueRound = (
	state: GameState,
	seat: Seat,
	now: number
): GameState => {
	if (state.phase !== "roundOver") return state;

	const acks: [boolean, boolean] = [...state.acks];
	acks[seat] = true;
	if (!acks[0] || !acks[1]) return { ...state, acks };

	const starter = other(state.starter);
	return {
		...state,
		phase: "picking",
		round: state.round + 1,
		starter,
		giver: starter,
		countries: [null, null],
		solved: [0, 0],
		revealed: [0, 0],
		wrong: [[], []],
		awaitingGuess: false,
		roundWinner: null,
		acks: [false, false],
		deadline: pickDeadline(state.mode, now),
		lastGuess: null
	};
};

export const handleTimeout = (state: GameState, now: number): GameState => {
	if (state.deadline === null || now < state.deadline) return state;

	if (state.phase === "picking") {
		let next = state;
		for (const seat of [0, 1] as Seat[]) {
			if (!next.countries[seat]) {
				next = setCountries(
					next,
					seat,
					randomCountries(COUNTRIES_PER_PLAYER),
					now
				);
			}
		}
		return next;
	}

	if (state.phase === "playing" && state.awaitingGuess) {
		return guess(state, other(state.giver), "", now, true);
	}
	return state;
};

const side = (seat: Seat | null, viewer: Seat): Side | null =>
	seat === null ? null : seat === viewer ? "me" : "opp";

export const viewFor = (
	state: GameState,
	viewer: Seat,
	now: number,
	language: Language = "PT_BR"
): GameView => {
	const opp = other(viewer);
	const playing = state.phase === "playing";
	const isGiver = state.giver === viewer;
	const ended = state.phase === "roundOver" || state.phase === "matchOver";
	const oppWord = currentWord(state, opp);
	const oppCountries = state.countries[opp];
	const guessEvent = state.lastGuess;

	return {
		mode: state.mode,
		phase: state.phase,
		round: state.round,
		starter: side(state.starter, viewer) as Side,
		wins: { me: state.wins[viewer], opp: state.wins[opp] },
		myCountries: state.countries[viewer],
		myReady: state.countries[viewer] !== null,
		oppReady: state.countries[opp] !== null,
		mySolved: state.solved[viewer],
		myRevealedCount: state.revealed[viewer],
		oppSolved: (oppCountries ?? []).slice(0, state.solved[opp]),
		oppRevealed: oppWord
			? revealPrefix(countryName(oppWord, language), state.revealed[opp])
			: "",
		role: isGiver ? "giver" : "guesser",
		canGuess: playing && !isGiver && state.awaitingGuess,
		currentWrong: playing ? state.wrong[opp] : [],
		lastGuess: guessEvent
			? {
					id: guessEvent.id,
					by: side(guessEvent.seat, viewer) as Side,
					country: guessEvent.country,
					correct: guessEvent.correct,
					timeout: guessEvent.timeout,
					passed: guessEvent.passed
				}
			: null,
		roundWinner: side(state.roundWinner, viewer),
		matchWinner: side(state.matchWinner, viewer),
		oppCountries: ended ? oppCountries : null,
		meAcked: state.acks[viewer],
		oppAcked: state.acks[opp],
		timeLeftMs:
			state.deadline === null ? null : Math.max(0, state.deadline - now),
		timerKind:
			state.deadline === null
				? null
				: state.phase === "picking"
					? "picking"
					: "guess"
	};
};

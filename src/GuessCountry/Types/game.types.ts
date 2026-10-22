import { Language } from "@/Types/Language";
export type Seat = 0 | 1;
export type Mode = "timed" | "untimed";
export type Phase = "picking" | "playing" | "roundOver" | "matchOver";
export type Side = "me" | "opp";

export type GuessEvent = {
	id: number;
	seat: Seat;
	country: string;
	correct: boolean;
	timeout: boolean;
	passed: boolean;
};

export type GameState = {
	mode: Mode;
	phase: Phase;
	round: number;
	starter: Seat;
	giver: Seat;
	countries: [string[] | null, string[] | null];
	solved: [number, number];
	revealed: [number, number];
	wrong: [string[], string[]];
	awaitingGuess: boolean;
	wins: [number, number];
	roundWinner: Seat | null;
	matchWinner: Seat | null;
	acks: [boolean, boolean];
	deadline: number | null;
	lastGuess: GuessEvent | null;
	eventId: number;
};

export type GameView = {
	mode: Mode;
	phase: Phase;
	round: number;
	starter: Side;
	wins: { me: number; opp: number };
	myCountries: string[] | null;
	myReady: boolean;
	oppReady: boolean;
	mySolved: number;
	myRevealedCount: number;
	oppSolved: string[];
	oppRevealed: string;
	role: "giver" | "guesser";
	canGuess: boolean;
	currentWrong: string[];
	lastGuess: {
		id: number;
		by: Side;
		country: string;
		correct: boolean;
		timeout: boolean;
		passed: boolean;
	} | null;
	roundWinner: Side | null;
	matchWinner: Side | null;
	oppCountries: string[] | null;
	meAcked: boolean;
	oppAcked: boolean;
	timeLeftMs: number | null;
	timerKind: "picking" | "guess" | null;
};

export type GameAction =
	| { type: "setCountries"; countries: string[] }
	| { type: "guess"; country: string }
	| { type: "pass" }
	| { type: "continue" };

export type ClientMessage =
	| { type: "create"; mode: Mode; language?: Language }
	| { type: "join"; code: string; language?: Language }
	| { type: "action"; action: GameAction };

export type ServerMessage =
	| { type: "created"; code: string }
	| { type: "started" }
	| { type: "view"; view: GameView }
	| { type: "error"; code: "roomNotFound" | "roomFull" | "invalid" }
	| { type: "opponentLeft" };

import { Character } from "./character.types";
import { Board } from "./board.types";

export type GamePhase = "setup" | "playing" | "finished";

export type GameState = {
	currentPlayer: number;
	players: Character[];
	board: Board;
	turn: number;
	phase: GamePhase;
	winner?: number;
	actionsRemaining: number;
};

export type Action = "maneuver" | "attack" | "scheme";

export type Position = {
	x: number;
	y: number;
};

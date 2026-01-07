import { Character } from "./character.types";
import { Board } from "./board.types";
import { Card } from "./card.types";

export type GamePhase = "setup" | "playing" | "waitingForDefense" | "finished";

export type GameState = {
	currentPlayer: number;
	players: Character[];
	board: Board;
	turn: number;
	phase: GamePhase;
	winner?: number;
	actionsRemaining: number;
	godspeedActive?: boolean;
	godspeedTurnsRemaining?: number;
	activeEffects?: {
		attackBonus?: number;
		rangeBonus?: number;
		ignoreDefense?: number;
	};
	pendingAttack?: {
		attackerId: string;
		defenderId: string;
		attackCard: Card;
		targetPosition: Position;
	};
	lastUsedScheme?: Card;
};

export type Action = "maneuver" | "attack" | "scheme";

export type Position = {
	x: number;
	y: number;
};

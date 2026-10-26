import type { Player } from "@/LendasBrasileiras/Types/player";

export type PlayerIndex = 0 | 1;

export type Phase = "draw" | "main1" | "combat" | "main2" | "end";

export type Match = {
	players: [Player, Player];
	activePlayer: PlayerIndex;
	phase: Phase;
	turn: number;
	winner: PlayerIndex | null;
};

export type MatchErrorCode =
	| "match_over"
	| "card_not_found"
	| "wrong_zone"
	| "wrong_phase"
	| "not_active_player"
	| "land_already_played"
	| "not_a_land"
	| "not_castable"
	| "insufficient_mana";

export type MatchError = {
	code: MatchErrorCode;
	message: string;
};

export type MoveResult =
	| { ok: true; match: Match }
	| { ok: false; error: MatchError };

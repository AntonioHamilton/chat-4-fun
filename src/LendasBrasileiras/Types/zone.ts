export type Zone =
	| "library"
	| "hand"
	| "battlefield"
	| "support"
	| "lands"
	| "graveyard"
	| "exile"
	| "command"
	| "usage";

export type ListZone = Extract<Zone, "graveyard" | "exile">;

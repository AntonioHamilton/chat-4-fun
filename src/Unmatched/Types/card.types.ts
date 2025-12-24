export type CardType = "attack" | "defense" | "scheme" | "maneuver";

export type Effect = {
	type: string;
	value?: number;
	description?: string;
};

export type Card = {
	id: string;
	name: string;
	type: CardType;
	value: number;
	range?: number;
	effects?: Effect[];
	description: string;
};

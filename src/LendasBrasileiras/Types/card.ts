export type CardType =
	| "creature"
	| "enchantment"
	| "instant"
	| "sorcery"
	| "artifact"
	| "land"
	| "commander";

export type ManaColor =
	| "green"
	| "blue"
	| "black"
	| "red"
	| "white"
	| "colorless";

export type ManaCost = Partial<Record<ManaColor, number>>;

export type Card = {
	id: string;
	name: string;
	type: CardType;
	cost: ManaCost;
	produces?: ManaColor;
	power?: number;
	toughness?: number;
	flavor?: string;
	art: string | null;
};

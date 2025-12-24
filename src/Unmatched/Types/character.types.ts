import { Card } from "./card.types";

export type Ability = {
	id: string;
	name: string;
	description: string;
};

export type Character = {
	id: string;
	name: string;
	health: number;
	maxHealth: number;
	position: { x: number; y: number };
	deck: Card[];
	hand: Card[];
	discardPile: Card[];
	specialAbility: Ability;
};

import { Character } from "../Types/character.types";
import { gonDeck, killuaDeck } from "./cards";

const shuffleArray = <T>(array: T[]): T[] => {
	const shuffled = [...array];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled;
};

export const createGon = (startPosition: {
	x: number;
	y: number;
}): Character => {
	const shuffledDeck = shuffleArray(gonDeck);
	return {
		id: "gon",
		name: "Gon Freecss",
		health: 16,
		maxHealth: 16,
		position: startPosition,
		deck: shuffledDeck,
		hand: [],
		discardPile: [],
		specialAbility: {
			id: "jajanken",
			name: "Jajanken",
			description: "Pedra-Papel-Tesoura: Escolhe uma variação antes de atacar"
		}
	};
};

export const createKillua = (startPosition: {
	x: number;
	y: number;
}): Character => {
	const shuffledDeck = shuffleArray(killuaDeck);
	return {
		id: "killua",
		name: "Killua Zoldyck",
		health: 14,
		maxHealth: 14,
		position: startPosition,
		deck: shuffledDeck,
		hand: [],
		discardPile: [],
		specialAbility: {
			id: "godspeed",
			name: "Godspeed",
			description: "Velocidade Divina: Aumenta velocidade e reflexos"
		}
	};
};

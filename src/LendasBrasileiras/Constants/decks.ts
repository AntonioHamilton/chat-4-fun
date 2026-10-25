import { Deck } from "@/LendasBrasileiras/Types/deck";
import {
	capivaraCards,
	capivaraCommander,
	saciCards,
	saciCommander
} from "@/LendasBrasileiras/Constants/cards";

export const saciDeck: Deck = {
	id: "saci",
	name: "Saci",
	cards: saciCards,
	commander: saciCommander
};

export const capivaraDeck: Deck = {
	id: "capivara",
	name: "Capivara",
	cards: capivaraCards,
	commander: capivaraCommander
};

export const decks: Deck[] = [saciDeck, capivaraDeck];

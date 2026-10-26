import { Card } from "@/LendasBrasileiras/Types/card";

export type Deck = {
	id: string;
	name: string;
	cards: Card[];
	commander: Card;
};

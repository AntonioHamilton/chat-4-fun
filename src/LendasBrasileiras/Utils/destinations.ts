import type { Card, CardType } from "@/LendasBrasileiras/Types/card";
import type { Zone } from "@/LendasBrasileiras/Types/zone";

const playZones: Record<CardType, Zone> = {
	creature: "battlefield",
	commander: "battlefield",
	enchantment: "support",
	artifact: "support",
	instant: "usage",
	sorcery: "usage",
	land: "lands"
};

export const getPlayZone = (card: Card): Zone => playZones[card.type];

export const getPlayLabel = (card: Card): string => {
	if (card.type === "land") return "Jogar terreno";
	if (card.type === "instant" || card.type === "sorcery") return "Lançar";
	return "Colocar em campo";
};

export const isPlayMove = (card: Card, from: Zone, to: Zone): boolean =>
	(from === "hand" || from === "command") && to === getPlayZone(card);

export const getDestinations = (card: Card, zone: Zone): Zone[] => {
	const back: Zone = card.type === "commander" ? "command" : "hand";
	switch (zone) {
		case "hand":
			return [getPlayZone(card), "graveyard", "exile"];
		case "command":
			return [getPlayZone(card)];
		case "battlefield":
		case "support":
		case "lands":
		case "usage":
			return [back, "graveyard", "exile"];
		case "graveyard":
			return [back, "exile"];
		case "exile":
			return [back, "graveyard"];
		default:
			return [];
	}
};

import type { Card, ManaColor } from "@/LendasBrasileiras/Types/card";
import { manaSymbols } from "@/LendasBrasileiras/Constants/colors";

export const formatCost = (card: Card): string =>
	(Object.keys(card.cost) as ManaColor[])
		.filter((color) => (card.cost[color] ?? 0) > 0)
		.map((color) => `${card.cost[color]}${manaSymbols[color]}`)
		.join(" ");

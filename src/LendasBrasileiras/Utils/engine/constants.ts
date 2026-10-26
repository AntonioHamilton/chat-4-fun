import type { ManaColor } from "@/LendasBrasileiras/Types/card";
import type { Zone } from "@/LendasBrasileiras/Types/zone";

export const STARTING_LIFE = 40;
export const STARTING_HAND_SIZE = 7;

export const ZONES: Zone[] = [
	"library",
	"hand",
	"battlefield",
	"support",
	"lands",
	"graveyard",
	"exile",
	"command"
];

export const MANA_COLORS: ManaColor[] = [
	"green",
	"blue",
	"black",
	"red",
	"white",
	"colorless"
];

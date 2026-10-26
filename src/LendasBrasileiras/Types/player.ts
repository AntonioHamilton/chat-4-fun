import type { Card, ManaColor } from "@/LendasBrasileiras/Types/card";
import type { Zone } from "@/LendasBrasileiras/Types/zone";

export type CardInstance = {
	instanceId: string;
	card: Card;
};

export type ManaPool = Record<ManaColor, number>;

export type Player = {
	id: string;
	life: number;
	zones: Record<Zone, CardInstance[]>;
	tappedLands: string[];
	manaPool: ManaPool;
	landPlayedThisTurn: boolean;
};

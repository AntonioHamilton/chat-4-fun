import type { Card } from "@/LendasBrasileiras/Types/card";
import type { Zone } from "@/LendasBrasileiras/Types/zone";

export type CardInstance = {
	instanceId: string;
	card: Card;
};

export type Player = {
	id: string;
	life: number;
	zones: Record<Zone, CardInstance[]>;
	tappedLands: string[];
	landPlayedThisTurn: boolean;
};

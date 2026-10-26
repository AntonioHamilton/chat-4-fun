import type { PlayerIndex } from "@/LendasBrasileiras/Types/match";
import type { Zone } from "@/LendasBrasileiras/Types/zone";

export type CardSource = {
	playerIndex: PlayerIndex;
	instanceId: string;
	zone: Zone;
};

export type DropTarget = {
	playerIndex: PlayerIndex;
	zone: Zone;
};

export type MenuOption = {
	label: string;
	onSelect: () => void;
};

import type { PointerEvent } from "react";
import type { Card } from "@/LendasBrasileiras/Types/card";
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

export type CardHandlers = {
	dragTarget: DropTarget | null;
	draggingId: string | null;
	locked: boolean;
	onCardPointerDown: (
		event: PointerEvent<HTMLElement>,
		source: CardSource,
		card: Card
	) => void;
	onCardClick: (source: CardSource) => void;
	onCardFocus: (card: Card) => void;
	onCardBlur: () => void;
};

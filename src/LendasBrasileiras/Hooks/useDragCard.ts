import { useCallback, useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import type { Card } from "@/LendasBrasileiras/Types/card";
import type { PlayerIndex } from "@/LendasBrasileiras/Types/match";
import type { CardSource, DropTarget } from "@/LendasBrasileiras/Types/ui";
import type { Zone } from "@/LendasBrasileiras/Types/zone";

const DRAG_THRESHOLD = 6;
const LONG_PRESS_MS = 500;
const CLICK_SUPPRESS_MS = 150;

export type DragState = {
	source: CardSource;
	card: Card;
	x: number;
	y: number;
	target: DropTarget | null;
};

type DragOptions = {
	onDrop: (source: CardSource, target: DropTarget) => void;
	onLongPress: (card: Card) => void;
};

const undroppableZones: Zone[] = ["exile"];

const findTarget = (x: number, y: number): DropTarget | null => {
	const nodes = document.querySelectorAll<HTMLElement>("[data-zone]");
	for (const node of Array.from(nodes)) {
		if (undroppableZones.includes(node.dataset.zone as Zone)) continue;
		const rect = node.getBoundingClientRect();
		if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom)
			return {
				playerIndex: Number(node.dataset.player) as PlayerIndex,
				zone: node.dataset.zone as Zone
			};
	}
	return null;
};

export const useDragCard = ({ onDrop, onLongPress }: DragOptions) => {
	const [drag, setDrag] = useState<DragState | null>(null);
	const suppressClick = useRef(false);
	const stopTracking = useRef<(() => void) | null>(null);
	const callbacks = useRef({ onDrop, onLongPress });

	useEffect(() => {
		callbacks.current = { onDrop, onLongPress };
	}, [onDrop, onLongPress]);

	useEffect(() => () => stopTracking.current?.(), []);

	const blockNextClick = () => {
		suppressClick.current = true;
		window.setTimeout(() => {
			suppressClick.current = false;
		}, CLICK_SUPPRESS_MS);
	};

	const consumeClick = useCallback((): boolean => {
		if (!suppressClick.current) return false;
		suppressClick.current = false;
		return true;
	}, []);

	const startDrag = useCallback(
		(event: ReactPointerEvent<HTMLElement>, source: CardSource, card: Card) => {
			if (event.pointerType === "mouse" && event.button !== 0) return;
			stopTracking.current?.();
			const startX = event.clientX;
			const startY = event.clientY;
			let dragging = false;
			let longPressed = false;

			const timer = window.setTimeout(() => {
				if (dragging) return;
				longPressed = true;
				blockNextClick();
				callbacks.current.onLongPress(card);
			}, LONG_PRESS_MS);

			const handleMove = (moveEvent: PointerEvent) => {
				if (longPressed) return;
				const distance = Math.hypot(
					moveEvent.clientX - startX,
					moveEvent.clientY - startY
				);
				if (!dragging && distance < DRAG_THRESHOLD) return;
				if (!dragging) {
					dragging = true;
					window.clearTimeout(timer);
				}
				setDrag({
					source,
					card,
					x: moveEvent.clientX,
					y: moveEvent.clientY,
					target: findTarget(moveEvent.clientX, moveEvent.clientY)
				});
			};

			const stop = () => {
				window.clearTimeout(timer);
				window.removeEventListener("pointermove", handleMove);
				window.removeEventListener("pointerup", handleUp);
				window.removeEventListener("pointercancel", handleCancel);
				stopTracking.current = null;
			};

			const handleUp = (upEvent: PointerEvent) => {
				stop();
				if (!dragging) return;
				setDrag(null);
				blockNextClick();
				const target = findTarget(upEvent.clientX, upEvent.clientY);
				if (target) callbacks.current.onDrop(source, target);
			};

			const handleCancel = () => {
				stop();
				setDrag(null);
			};

			window.addEventListener("pointermove", handleMove);
			window.addEventListener("pointerup", handleUp);
			window.addEventListener("pointercancel", handleCancel);
			stopTracking.current = stop;
		},
		[]
	);

	return { drag, startDrag, consumeClick };
};

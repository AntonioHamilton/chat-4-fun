import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import type { KeyboardEvent } from "react";

export const useModal = (
	onClose: () => void,
	fallbackFocusRef?: RefObject<HTMLElement>
) => {
	const dialogRef = useRef<HTMLDivElement>(null);
	const closeRef = useRef(onClose);

	useEffect(() => {
		closeRef.current = onClose;
	}, [onClose]);

	useEffect(() => {
		const opener = document.activeElement;
		const fallback = fallbackFocusRef?.current;
		dialogRef.current?.querySelector("button")?.focus();
		const handleEscape = (event: globalThis.KeyboardEvent) => {
			if (event.key === "Escape") closeRef.current();
		};
		document.addEventListener("keydown", handleEscape);
		return () => {
			document.removeEventListener("keydown", handleEscape);
			const target =
				opener instanceof HTMLElement &&
				opener !== document.body &&
				opener.isConnected
					? opener
					: fallback;
			target?.focus();
		};
	}, [fallbackFocusRef]);

	const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
		if (event.key !== "Tab") return;
		const buttons = dialogRef.current?.querySelectorAll("button");
		if (!buttons || buttons.length === 0) return;
		const first = buttons[0];
		const last = buttons[buttons.length - 1];
		if (event.shiftKey && document.activeElement === first) {
			event.preventDefault();
			last.focus();
		} else if (!event.shiftKey && document.activeElement === last) {
			event.preventDefault();
			first.focus();
		}
	};

	return { dialogRef, handleKeyDown };
};

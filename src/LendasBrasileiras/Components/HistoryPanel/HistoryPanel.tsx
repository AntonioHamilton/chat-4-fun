import { useEffect, useState } from "react";
import { History } from "@/LendasBrasileiras/Components/History/History";
import * as SC from "./styled";

type HistoryPanelProps = {
	lines: string[];
};

export const HistoryPanel = ({ lines }: HistoryPanelProps) => {
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (!open) return undefined;
		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === "Escape") setOpen(false);
		};
		document.addEventListener("keydown", handleEscape);
		return () => document.removeEventListener("keydown", handleEscape);
	}, [open]);

	return (
		<>
			{open && <SC.Backdrop onClick={() => setOpen(false)} />}
			<SC.Toggle
				type="button"
				aria-expanded={open}
				aria-controls="history-panel"
				aria-label={open ? "Fechar histórico" : "Abrir histórico"}
				onClick={() => setOpen((value) => !value)}
			>
				<svg
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					aria-hidden="true"
				>
					<path d="M4 6h16M4 12h16M4 18h10" />
				</svg>
			</SC.Toggle>
			{open && (
				<SC.Panel id="history-panel">
					<History lines={[...lines].reverse()} />
				</SC.Panel>
			)}
		</>
	);
};

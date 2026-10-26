import { useEffect, useRef } from "react";
import * as SC from "./styled";

type HistoryProps = {
	lines: string[];
};

export const History = ({ lines }: HistoryProps) => {
	const containerRef = useRef<HTMLElement>(null);

	useEffect(() => {
		const container = containerRef.current;
		if (container) container.scrollTop = container.scrollHeight;
	}, [lines]);

	return (
		<SC.Container ref={containerRef} aria-label="Histórico de jogadas">
			<SC.Title>Histórico</SC.Title>
			<SC.List>
				{lines.map((line, index) => (
					<li key={`${index}-${line}`}>{line}</li>
				))}
			</SC.List>
		</SC.Container>
	);
};

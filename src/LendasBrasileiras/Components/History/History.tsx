import { useEffect, useRef } from "react";
import * as SC from "./styled";

const FOLLOW_THRESHOLD_PX = 24;

type HistoryProps = {
	lines: string[];
};

export const History = ({ lines }: HistoryProps) => {
	const containerRef = useRef<HTMLElement>(null);
	const followEnd = useRef(true);

	useEffect(() => {
		const container = containerRef.current;
		if (container && followEnd.current)
			container.scrollTop = container.scrollHeight;
	}, [lines]);

	const handleScroll = () => {
		const container = containerRef.current;
		if (!container) return;
		followEnd.current =
			container.scrollHeight - container.scrollTop - container.clientHeight <
			FOLLOW_THRESHOLD_PX;
	};

	return (
		<SC.Container
			ref={containerRef}
			aria-label="Histórico de jogadas"
			onScroll={handleScroll}
		>
			<SC.Title>Histórico</SC.Title>
			<SC.List>
				{lines.map((line, index) => (
					<li key={`${index}-${line}`}>{line}</li>
				))}
			</SC.List>
		</SC.Container>
	);
};

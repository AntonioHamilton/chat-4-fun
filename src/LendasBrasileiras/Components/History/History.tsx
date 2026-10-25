import * as SC from "./styled";

type HistoryProps = {
	lines: string[];
};

export const History = ({ lines }: HistoryProps) => {
	return (
		<SC.Container aria-label="Histórico de jogadas">
			<SC.Title>Histórico</SC.Title>
			<SC.List>
				{lines.map((line, index) => (
					<li key={`${index}-${line}`}>{line}</li>
				))}
			</SC.List>
		</SC.Container>
	);
};

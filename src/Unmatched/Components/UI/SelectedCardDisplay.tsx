import * as SC from "./styled";
import { Card } from "../../Types/card.types";

type SelectedCardDisplayProps = {
	card: Card | null;
};

export const SelectedCardDisplay = ({ card }: SelectedCardDisplayProps) => {
	if (!card) return null;

	return (
		<SC.SelectedCardWrapper>
			<SC.SelectedCardLabel>Carta Selecionada:</SC.SelectedCardLabel>
			<SC.SelectedCardInfo>
				<SC.SelectedCardName>{card.name}</SC.SelectedCardName>
				{card.description && (
					<SC.SelectedCardDescription>
						{card.description}
					</SC.SelectedCardDescription>
				)}
				{card.value > 0 && (
					<SC.SelectedCardValue>Valor: {card.value}</SC.SelectedCardValue>
				)}
				{card.range !== undefined && (
					<SC.SelectedCardRange>Alcance: {card.range}</SC.SelectedCardRange>
				)}
			</SC.SelectedCardInfo>
		</SC.SelectedCardWrapper>
	);
};

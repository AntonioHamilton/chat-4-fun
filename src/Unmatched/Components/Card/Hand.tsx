import * as SC from "./styled";
import { Card } from "./Card";
import { Card as CardType } from "../../Types/card.types";

type HandProps = {
	cards: CardType[];
	onCardClick?: (card: CardType) => void;
	selectedCardId?: string;
};

export const Hand = ({ cards, onCardClick, selectedCardId }: HandProps) => {
	return (
		<SC.HandContainer>
			{cards.map((card) => (
				<Card
					key={card.id}
					card={card}
					onClick={() => onCardClick?.(card)}
					isSelected={card.id === selectedCardId}
				/>
			))}
		</SC.HandContainer>
	);
};

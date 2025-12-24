import * as SC from "./styled";
import { Card } from "./Card";
import { Card as CardType } from "../../Types/card.types";

type HandProps = {
	cards: CardType[];
	onCardClick?: (card: CardType) => void;
};

export const Hand = ({ cards, onCardClick }: HandProps) => {
	return (
		<SC.HandContainer>
			{cards.map((card) => (
				<Card key={card.id} card={card} onClick={() => onCardClick?.(card)} />
			))}
		</SC.HandContainer>
	);
};

import * as SC from "./styled";
import { Card as CardType } from "../../Types/card.types";

type CardProps = {
	card: CardType;
	onClick?: () => void;
};

export const Card = ({ card, onClick }: CardProps) => {
	return (
		<SC.CardContainer $type={card.type} onClick={onClick}>
			<SC.CardName>{card.name}</SC.CardName>
			{card.value > 0 && <SC.CardValue>{card.value}</SC.CardValue>}
			<SC.CardDescription>{card.description}</SC.CardDescription>
			<SC.CardType>{card.type}</SC.CardType>
		</SC.CardContainer>
	);
};

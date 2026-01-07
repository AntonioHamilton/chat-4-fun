import * as SC from "./styled";
import { Card as CardType } from "../../Types/card.types";

type CardProps = {
	card: CardType;
	onClick?: () => void;
	isSelected?: boolean;
};

export const Card = ({ card, onClick, isSelected }: CardProps) => {
	const getTypeLabel = (type: string) => {
		switch (type) {
			case "attack":
				return "Ataque";
			case "defense":
				return "Defesa";
			case "scheme":
				return "Esquema";
			case "maneuver":
				return "Manobra";
			default:
				return type;
		}
	};

	const getEffectsText = () => {
		if (!card.effects || card.effects.length === 0) {
			return null;
		}
		return card.effects
			.map((effect) => effect.description || effect.type)
			.join(", ");
	};

	return (
		<SC.CardContainer
			$type={card.type}
			$isSelected={isSelected}
			onClick={onClick}
		>
			<SC.CardHeader>
				<SC.CardName>{card.name}</SC.CardName>
				<SC.CardType>{getTypeLabel(card.type)}</SC.CardType>
			</SC.CardHeader>
			<SC.CardBody>
				{card.value > 0 && <SC.CardValue>{card.value}</SC.CardValue>}
				{card.range !== undefined && (
					<SC.CardRange>Alcance: {card.range}</SC.CardRange>
				)}
			</SC.CardBody>
			<SC.CardFooter>
				<SC.CardDescription>{card.description}</SC.CardDescription>
				{getEffectsText() && (
					<SC.CardEffects>{getEffectsText()}</SC.CardEffects>
				)}
			</SC.CardFooter>
		</SC.CardContainer>
	);
};

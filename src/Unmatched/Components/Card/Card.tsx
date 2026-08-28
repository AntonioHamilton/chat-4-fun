import * as SC from "./styled";
import { Card as CardType } from "../../Types/card.types";
import { getCardTooltip } from "../../Utils/cardTooltips";
import { useTranslation } from "@/hooks/useTranslation";
import { getCardText, unmatchedTranslations } from "@/Translations/unmatched";

type CardProps = {
	card: CardType;
	onClick?: () => void;
	isSelected?: boolean;
};

export const Card = ({ card, onClick, isSelected }: CardProps) => {
	const { language } = useTranslation();
	const t = unmatchedTranslations[language];
	const tooltip = getCardTooltip(card, language);
	const text = getCardText(card.id, card.name, card.description, language);

	const getTypeLabel = (type: string) => t.cardTypes[type] ?? type;

	const getEffectsText = () => {
		if (!card.effects || card.effects.length === 0) {
			return null;
		}
		return card.effects
			.map((effect) => {
				const effectText = t.effectTexts[effect.type];
				return effectText
					? effectText(effect.value)
					: effect.description || effect.type;
			})
			.join(", ");
	};

	return (
		<SC.CardContainer
			$type={card.type}
			$isSelected={isSelected}
			onClick={onClick}
			title={tooltip}
		>
			<SC.CardHeader>
				<SC.CardName>{text.name}</SC.CardName>
				<SC.CardType>{getTypeLabel(card.type)}</SC.CardType>
			</SC.CardHeader>
			<SC.CardBody>
				{card.value > 0 && <SC.CardValue>{card.value}</SC.CardValue>}
				{card.range !== undefined && (
					<SC.CardRange>
						{t.range}: {card.range}
					</SC.CardRange>
				)}
			</SC.CardBody>
			<SC.CardFooter>
				<SC.CardDescription>{text.description}</SC.CardDescription>
				{getEffectsText() && (
					<SC.CardEffects>{getEffectsText()}</SC.CardEffects>
				)}
			</SC.CardFooter>
		</SC.CardContainer>
	);
};

import * as SC from "./styled";
import { Card } from "../../Types/card.types";
import { useTranslation } from "@/hooks/useTranslation";
import { getCardText, unmatchedTranslations } from "@/Translations/unmatched";

type SelectedCardDisplayProps = {
	card: Card | null;
};

export const SelectedCardDisplay = ({ card }: SelectedCardDisplayProps) => {
	const { language } = useTranslation();
	const t = unmatchedTranslations[language];

	if (!card) return null;

	const text = getCardText(card.id, card.name, card.description, language);

	return (
		<SC.SelectedCardWrapper>
			<SC.SelectedCardLabel>{t.selectedCard}</SC.SelectedCardLabel>
			<SC.SelectedCardInfo>
				<SC.SelectedCardName>{text.name}</SC.SelectedCardName>
				{text.description && (
					<SC.SelectedCardDescription>
						{text.description}
					</SC.SelectedCardDescription>
				)}
				{card.value > 0 && (
					<SC.SelectedCardValue>
						{t.value}: {card.value}
					</SC.SelectedCardValue>
				)}
				{card.range !== undefined && (
					<SC.SelectedCardRange>
						{t.range}: {card.range}
					</SC.SelectedCardRange>
				)}
			</SC.SelectedCardInfo>
		</SC.SelectedCardWrapper>
	);
};

import * as SC from "./styled";
import { Card } from "../../Types/card.types";
import { getCardTooltip } from "../../Utils/cardTooltips";
import { useTranslation } from "@/hooks/useTranslation";
import { unmatchedTranslations } from "@/Translations/unmatched";

type SchemeMessageProps = {
	card: Card | null | undefined;
};

export const SchemeMessage = ({ card }: SchemeMessageProps) => {
	const { language } = useTranslation();
	const t = unmatchedTranslations[language];

	if (!card) return null;

	const tooltip = getCardTooltip(card, language);

	return (
		<SC.SchemeMessageWrapper>
			<SC.SchemeMessageLabel>{t.schemeUsed}</SC.SchemeMessageLabel>
			<SC.SchemeMessageContent>{tooltip}</SC.SchemeMessageContent>
		</SC.SchemeMessageWrapper>
	);
};

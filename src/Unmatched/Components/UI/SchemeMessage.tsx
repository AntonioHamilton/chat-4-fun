import * as SC from "./styled";
import { Card } from "../../Types/card.types";
import { getCardTooltip } from "../../Utils/cardTooltips";

type SchemeMessageProps = {
	card: Card | null | undefined;
};

export const SchemeMessage = ({ card }: SchemeMessageProps) => {
	if (!card) return null;

	const tooltip = getCardTooltip(card);

	return (
		<SC.SchemeMessageWrapper>
			<SC.SchemeMessageLabel>Carta de Esquema Usada:</SC.SchemeMessageLabel>
			<SC.SchemeMessageContent>{tooltip}</SC.SchemeMessageContent>
		</SC.SchemeMessageWrapper>
	);
};

import type { Card as CardData } from "@/LendasBrasileiras/Types/card";
import { Card } from "@/LendasBrasileiras/Components/Card/Card";
import * as SC from "./styled";

type CardPreviewProps = {
	card: CardData;
	onClose: () => void;
};

export const CardPreview = ({ card, onClose }: CardPreviewProps) => {
	return (
		<SC.Container aria-label={`Carta ampliada: ${card.name}`}>
			<Card card={card} large interactive={false} />
			<SC.CloseButton type="button" onClick={onClose}>
				Fechar
			</SC.CloseButton>
		</SC.Container>
	);
};

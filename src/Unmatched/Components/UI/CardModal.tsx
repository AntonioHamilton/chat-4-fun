import * as SC from "./styled";
import { Hand } from "../Card/Hand";
import { Card } from "../../Types/card.types";
import { Action } from "../../Types/game.types";

type CardModalProps = {
	isOpen: boolean;
	cards: Card[];
	onCardClick: (card: Card) => void;
	onClose: () => void;
	selectedCardId?: string;
	filterByAction?: Action | null;
};

export const CardModal = ({
	isOpen,
	cards,
	onCardClick,
	onClose,
	selectedCardId,
	filterByAction
}: CardModalProps) => {
	if (!isOpen) {
		return null;
	}

	const filteredCards = filterByAction
		? cards.filter((card) => {
				if (filterByAction === "attack") return card.type === "attack";
				if (filterByAction === "scheme") return card.type === "scheme";
				return true;
			})
		: cards;

	const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	const handleCardClick = (card: Card) => {
		onCardClick(card);
		onClose();
	};

	return (
		<SC.CardModalOverlay onClick={handleBackdropClick}>
			<SC.CardModalContainer>
				<SC.CardModalHeader>
					<SC.CardModalTitle>
						{filterByAction === "attack"
							? "Escolha uma carta de Ataque"
							: filterByAction === "scheme"
								? "Escolha uma carta de Esquema"
								: "Suas Cartas"}
					</SC.CardModalTitle>
					<SC.CardModalCloseButton onClick={onClose}>×</SC.CardModalCloseButton>
				</SC.CardModalHeader>
				<SC.CardModalContent>
					<Hand
						cards={filteredCards}
						onCardClick={handleCardClick}
						selectedCardId={selectedCardId}
					/>
				</SC.CardModalContent>
			</SC.CardModalContainer>
		</SC.CardModalOverlay>
	);
};

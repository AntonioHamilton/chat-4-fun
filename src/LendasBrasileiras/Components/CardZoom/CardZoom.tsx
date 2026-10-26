import type { RefObject } from "react";
import type { Card as CardData } from "@/LendasBrasileiras/Types/card";
import type { MenuOption } from "@/LendasBrasileiras/Types/ui";
import { Card } from "@/LendasBrasileiras/Components/Card/Card";
import { useModal } from "@/LendasBrasileiras/Hooks/useModal";
import * as SC from "./styled";

type CardZoomProps = {
	card: CardData;
	actions: MenuOption[];
	error: string | null;
	onClose: () => void;
	fallbackFocusRef?: RefObject<HTMLElement>;
};

export const CardZoom = ({
	card,
	actions,
	error,
	onClose,
	fallbackFocusRef
}: CardZoomProps) => {
	const { dialogRef, handleKeyDown } = useModal(onClose, fallbackFocusRef);

	return (
		<SC.Overlay onClick={onClose}>
			<SC.Dialog
				ref={dialogRef}
				role="dialog"
				aria-modal="true"
				aria-label={`Carta ampliada: ${card.name}`}
				onClick={(event) => event.stopPropagation()}
				onKeyDown={handleKeyDown}
			>
				<Card card={card} large interactive={false} />
				{error && <SC.Error role="alert">{error}</SC.Error>}
				<SC.Actions>
					{actions.map((action) => (
						<SC.Primary
							key={action.label}
							type="button"
							onClick={action.onSelect}
						>
							{action.label}
						</SC.Primary>
					))}
					<SC.Close type="button" onClick={onClose}>
						Fechar
					</SC.Close>
				</SC.Actions>
			</SC.Dialog>
		</SC.Overlay>
	);
};

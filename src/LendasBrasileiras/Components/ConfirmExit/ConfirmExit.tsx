import type { RefObject } from "react";
import { useModal } from "@/LendasBrasileiras/Hooks/useModal";
import * as SC from "./styled";

type ConfirmExitProps = {
	onConfirm: () => void;
	onCancel: () => void;
	fallbackFocusRef?: RefObject<HTMLElement>;
};

export const ConfirmExit = ({
	onConfirm,
	onCancel,
	fallbackFocusRef
}: ConfirmExitProps) => {
	const { dialogRef, handleKeyDown } = useModal(onCancel, fallbackFocusRef);

	return (
		<SC.Overlay onClick={onCancel}>
			<SC.Dialog
				ref={dialogRef}
				role="alertdialog"
				aria-modal="true"
				aria-label="Sair da partida"
				onClick={(event) => event.stopPropagation()}
				onKeyDown={handleKeyDown}
			>
				<SC.Text>Sair da partida? A partida atual será perdida.</SC.Text>
				<SC.Actions>
					<SC.Keep type="button" onClick={onCancel}>
						Continuar
					</SC.Keep>
					<SC.Leave type="button" onClick={onConfirm}>
						Sair
					</SC.Leave>
				</SC.Actions>
			</SC.Dialog>
		</SC.Overlay>
	);
};

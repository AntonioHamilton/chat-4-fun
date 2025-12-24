import * as SC from "./styled";
import { Action } from "../../Types/game.types";

type ActionButtonsProps = {
	actionsRemaining: number;
	currentAction: Action | null;
	onActionClick: (action: Action) => void;
	onEndTurn: () => void;
};

export const ActionButtons = ({
	actionsRemaining,
	currentAction,
	onActionClick,
	onEndTurn
}: ActionButtonsProps) => {
	return (
		<SC.ActionsContainer>
			<SC.ActionsInfo>Ações restantes: {actionsRemaining}</SC.ActionsInfo>
			<SC.ButtonsWrapper>
				<SC.ActionButton
					$active={currentAction === "maneuver"}
					onClick={() => onActionClick("maneuver")}
					disabled={actionsRemaining === 0}
				>
					Manobra
				</SC.ActionButton>
				<SC.ActionButton
					$active={currentAction === "attack"}
					onClick={() => onActionClick("attack")}
					disabled={actionsRemaining === 0}
				>
					Ataque
				</SC.ActionButton>
				<SC.ActionButton
					$active={currentAction === "scheme"}
					onClick={() => onActionClick("scheme")}
					disabled={actionsRemaining === 0}
				>
					Esquema
				</SC.ActionButton>
				<SC.EndTurnButton onClick={onEndTurn}>Finalizar Turno</SC.EndTurnButton>
			</SC.ButtonsWrapper>
		</SC.ActionsContainer>
	);
};

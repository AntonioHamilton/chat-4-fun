import * as SC from "./styled";
import { Action } from "../../Types/game.types";
import { useTranslation } from "@/hooks/useTranslation";
import { unmatchedTranslations } from "@/Translations/unmatched";

type ActionButtonsProps = {
	actionsRemaining: number;
	currentAction: Action | null;
	onActionClick: (action: Action) => void;
	onEndTurn: () => void;
	disabled?: boolean;
};

export const ActionButtons = ({
	actionsRemaining,
	currentAction,
	onActionClick,
	onEndTurn,
	disabled = false
}: ActionButtonsProps) => {
	const { language } = useTranslation();
	const t = unmatchedTranslations[language];

	return (
		<SC.ActionsContainer>
			<SC.ActionsInfo>
				{t.actionsRemaining}: {actionsRemaining}
			</SC.ActionsInfo>
			<SC.ButtonsWrapper>
				<SC.ActionButton
					$active={currentAction === "maneuver"}
					onClick={() => onActionClick("maneuver")}
					disabled={disabled || actionsRemaining === 0}
				>
					{t.cardTypes.maneuver}
				</SC.ActionButton>
				<SC.ActionButton
					$active={currentAction === "attack"}
					onClick={() => onActionClick("attack")}
					disabled={disabled || actionsRemaining === 0}
				>
					{t.cardTypes.attack}
				</SC.ActionButton>
				<SC.ActionButton
					$active={currentAction === "scheme"}
					onClick={() => onActionClick("scheme")}
					disabled={disabled || actionsRemaining === 0}
				>
					{t.cardTypes.scheme}
				</SC.ActionButton>
				<SC.EndTurnButton onClick={onEndTurn} disabled={disabled}>
					{t.endTurn}
				</SC.EndTurnButton>
			</SC.ButtonsWrapper>
		</SC.ActionsContainer>
	);
};

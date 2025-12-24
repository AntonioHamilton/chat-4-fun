import styled from "styled-components";

export const HealthBarContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 4px;
	min-width: 200px;
`;

export const CharacterName = styled.div`
	font-weight: bold;
	font-size: 14px;
	color: #2c3e50;
`;

export const HealthBarWrapper = styled.div`
	width: 100%;
	height: 24px;
	background-color: #ecf0f1;
	border-radius: 12px;
	overflow: hidden;
	border: 2px solid #bdc3c7;
`;

export const HealthBarFill = styled.div<{
	$percentage: number;
	$color: string;
}>`
	width: ${(props) => props.$percentage}%;
	height: 100%;
	background-color: ${(props) => props.$color};
	transition: width 0.3s ease;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const HealthText = styled.span`
	color: #fff;
	font-weight: bold;
	font-size: 12px;
	text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

export const ActionsContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
	padding: 20px;
	background-color: rgba(0, 0, 0, 0.3);
	border-radius: 8px;
	width: 100%;
	max-width: 1200px;
`;

export const ActionsInfo = styled.div`
	color: #ecf0f1;
	font-size: 16px;
	font-weight: bold;
	text-align: center;
`;

export const ButtonsWrapper = styled.div`
	display: flex;
	gap: 10px;
	justify-content: center;
	flex-wrap: wrap;
`;

export const ActionButton = styled.button<{ $active: boolean }>`
	background: ${(props) =>
		props.$active
			? "linear-gradient(145deg, #27ae60, #229954)"
			: "linear-gradient(145deg, #3498db, #2980b9)"};
	color: white;
	font-size: 16px;
	font-weight: bold;
	padding: 12px 24px;
	border: none;
	border-radius: 8px;
	cursor: pointer;
	transition: all 0.2s ease;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

	&:hover:not(:disabled) {
		transform: scale(1.05);
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
	}

	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
`;

export const EndTurnButton = styled.button`
	background: linear-gradient(145deg, #e74c3c, #c0392b);
	color: white;
	font-size: 16px;
	font-weight: bold;
	padding: 12px 24px;
	border: none;
	border-radius: 8px;
	cursor: pointer;
	transition: all 0.2s ease;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

	&:hover {
		transform: scale(1.05);
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
	}
`;

export const SpecialAbilityContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
	padding: 15px;
	background-color: rgba(155, 89, 182, 0.2);
	border-radius: 8px;
	border: 2px solid #9b59b6;
`;

export const AbilityTitle = styled.div`
	color: #ecf0f1;
	font-size: 14px;
	font-weight: bold;
	text-align: center;
`;

export const JajankenButtons = styled.div`
	display: flex;
	gap: 8px;
	justify-content: center;
	flex-wrap: wrap;
`;

export const JajankenButton = styled.button<{ $active: boolean }>`
	background: ${(props) =>
		props.$active
			? "linear-gradient(145deg, #f39c12, #e67e22)"
			: "linear-gradient(145deg, #95a5a6, #7f8c8d)"};
	color: white;
	font-size: 12px;
	font-weight: bold;
	padding: 8px 16px;
	border: none;
	border-radius: 6px;
	cursor: pointer;
	transition: all 0.2s ease;

	&:hover {
		transform: scale(1.05);
	}
`;

export const GodspeedButton = styled.button<{ $active: boolean }>`
	background: ${(props) =>
		props.$active
			? "linear-gradient(145deg, #3498db, #2980b9)"
			: "linear-gradient(145deg, #95a5a6, #7f8c8d)"};
	color: white;
	font-size: 14px;
	font-weight: bold;
	padding: 10px 20px;
	border: none;
	border-radius: 6px;
	cursor: pointer;
	transition: all 0.2s ease;

	&:hover:not(:disabled) {
		transform: scale(1.05);
	}

	&:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}
`;

import styled from "styled-components";

export const HealthBarContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 6px;
	min-width: 220px;
	padding: 12px;
	background-color: rgba(0, 0, 0, 0.4);
	border-radius: 10px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
`;

export const CharacterName = styled.div`
	font-weight: bold;
	font-size: 16px;
	color: #ecf0f1;
	text-align: center;
	text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
	letter-spacing: 1px;
`;

export const HealthBarWrapper = styled.div`
	width: 100%;
	height: 28px;
	background-color: #2c3e50;
	border-radius: 14px;
	overflow: hidden;
	border: 3px solid rgba(236, 240, 241, 0.3);
	box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
`;

export const HealthBarFill = styled.div<{
	$percentage: number;
	$color: string;
}>`
	width: ${(props) => props.$percentage}%;
	height: 100%;
	background: linear-gradient(
		90deg,
		${(props) => props.$color},
		${(props) => {
			if (props.$color === "#f39c12") {
				return "#e67e22";
			}
			return "#2980b9";
		}}
	);
	transition: width 0.5s ease;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	box-shadow: 0 0 10px ${(props) => props.$color};

	&::after {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 50%;
		background: linear-gradient(
			180deg,
			rgba(255, 255, 255, 0.3) 0%,
			transparent 100%
		);
	}
`;

export const HealthText = styled.span`
	color: #fff;
	font-weight: bold;
	font-size: 13px;
	text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
	z-index: 1;
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

	&:hover:not(:disabled) {
		transform: scale(1.05);
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
	}

	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
`;

export const SpecialAbilityContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 12px;
	padding: 18px;
	background: linear-gradient(
		145deg,
		rgba(155, 89, 182, 0.3),
		rgba(142, 68, 173, 0.3)
	);
	border-radius: 10px;
	border: 3px solid #9b59b6;
	box-shadow: 0 4px 8px rgba(155, 89, 182, 0.4);
`;

export const AbilityTitle = styled.div`
	color: #ecf0f1;
	font-size: 16px;
	font-weight: bold;
	text-align: center;
	text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
	letter-spacing: 1px;
`;

export const JajankenButtons = styled.div`
	display: flex;
	gap: 10px;
	justify-content: center;
	flex-wrap: wrap;
`;

export const JajankenButton = styled.button<{ $active: boolean }>`
	background: ${(props) =>
		props.$active
			? "linear-gradient(145deg, #f39c12, #d68910)"
			: "linear-gradient(145deg, #7f8c8d, #5d6d7e)"};
	color: white;
	font-size: 13px;
	font-weight: bold;
	padding: 10px 20px;
	border: none;
	border-radius: 8px;
	cursor: pointer;
	transition: all 0.3s ease;
	box-shadow: ${(props) =>
		props.$active
			? "0 4px 12px rgba(243, 156, 18, 0.6)"
			: "0 2px 4px rgba(0, 0, 0, 0.3)"};
	text-transform: uppercase;
	letter-spacing: 1px;

	&:hover {
		transform: scale(1.1) translateY(-2px);
		box-shadow: ${(props) =>
			props.$active
				? "0 6px 16px rgba(243, 156, 18, 0.8)"
				: "0 4px 8px rgba(0, 0, 0, 0.4)"};
	}
`;

export const GodspeedButton = styled.button<{ $active: boolean }>`
	background: ${(props) =>
		props.$active
			? "linear-gradient(145deg, #3498db, #1f618d)"
			: "linear-gradient(145deg, #7f8c8d, #5d6d7e)"};
	color: white;
	font-size: 15px;
	font-weight: bold;
	padding: 12px 24px;
	border: none;
	border-radius: 8px;
	cursor: pointer;
	transition: all 0.3s ease;
	box-shadow: ${(props) =>
		props.$active
			? "0 4px 12px rgba(52, 152, 219, 0.6), inset 0 0 20px rgba(255, 255, 255, 0.2)"
			: "0 2px 4px rgba(0, 0, 0, 0.3)"};
	text-transform: uppercase;
	letter-spacing: 1.5px;
	position: relative;
	overflow: hidden;

	${(props) =>
		props.$active &&
		`
		animation: pulse 1.5s ease-in-out infinite;
		
		@keyframes pulse {
			0%, 100% {
				box-shadow: 0 4px 12px rgba(52, 152, 219, 0.6);
			}
			50% {
				box-shadow: 0 6px 20px rgba(52, 152, 219, 1);
			}
		}
	`}

	&:hover:not(:disabled) {
		transform: scale(1.1) translateY(-2px);
		box-shadow: ${(props) =>
			props.$active
				? "0 6px 16px rgba(52, 152, 219, 0.8)"
				: "0 4px 8px rgba(0, 0, 0, 0.4)"};
	}

	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
		transform: none;
	}
`;

export const CardModalOverlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.7);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 500;
	animation: fadeIn 0.2s ease-out;

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
`;

export const CardModalContainer = styled.div`
	background: linear-gradient(145deg, #2c3e50, #34495e);
	border-radius: 20px;
	box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
	max-width: 95%;
	max-height: 85vh;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	animation: scaleIn 0.3s ease-out;

	@keyframes scaleIn {
		from {
			transform: scale(0.9);
			opacity: 0;
		}
		to {
			transform: scale(1);
			opacity: 1;
		}
	}
`;

export const CardModalHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20px 30px;
	border-bottom: 2px solid rgba(255, 255, 255, 0.1);
`;

export const CardModalTitle = styled.h2`
	color: #ecf0f1;
	font-size: 24px;
	font-weight: bold;
	margin: 0;
`;

export const CardModalCloseButton = styled.button`
	background: transparent;
	border: none;
	color: #ecf0f1;
	font-size: 36px;
	font-weight: bold;
	cursor: pointer;
	line-height: 1;
	padding: 0;
	width: 40px;
	height: 40px;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: all 0.2s ease;

	&:hover {
		transform: scale(1.1);
		color: #e74c3c;
	}
`;

export const CardModalContent = styled.div`
	padding: 30px;
	overflow-y: auto;
	max-height: calc(85vh - 80px);
`;

export const StatusMessageContainer = styled.div<{ $type: string }>`
	padding: 12px 20px;
	border-radius: 8px;
	font-size: 14px;
	font-weight: 500;
	text-align: center;
	margin: 10px 0;
	background: ${(props) => {
		switch (props.$type) {
			case "success":
				return "linear-gradient(145deg, #27ae60, #229954)";
			case "warning":
				return "linear-gradient(145deg, #f39c12, #e67e22)";
			case "error":
				return "linear-gradient(145deg, #e74c3c, #c0392b)";
			default:
				return "linear-gradient(145deg, #3498db, #2980b9)";
		}
	}};
	color: white;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
	animation: fadeInStatus 0.3s ease-out;

	@keyframes fadeInStatus {
		from {
			opacity: 0;
			transform: translateY(-10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
`;

export const SelectedCardWrapper = styled.div`
	background: rgba(0, 0, 0, 0.4);
	border-radius: 10px;
	padding: 12px 16px;
	border: 2px solid rgba(255, 215, 0, 0.5);
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
`;

export const SelectedCardLabel = styled.div`
	font-size: 12px;
	font-weight: bold;
	color: #f39c12;
	text-transform: uppercase;
	letter-spacing: 1px;
	margin-bottom: 8px;
`;

export const SelectedCardInfo = styled.div`
	display: flex;
	flex-direction: column;
	gap: 4px;
`;

export const SelectedCardName = styled.div`
	font-size: 14px;
	font-weight: bold;
	color: #ecf0f1;
`;

export const SelectedCardDescription = styled.div`
	font-size: 11px;
	color: #bdc3c7;
	font-style: italic;
`;

export const SelectedCardValue = styled.div`
	font-size: 12px;
	color: #3498db;
	font-weight: 500;
`;

export const SelectedCardRange = styled.div`
	font-size: 12px;
	color: #9b59b6;
	font-weight: 500;
`;

export const SchemeMessageWrapper = styled.div`
	background: linear-gradient(145deg, #9b59b6, #8e44ad);
	border-radius: 10px;
	padding: 16px 20px;
	border: 2px solid rgba(255, 255, 255, 0.2);
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
	margin: 10px 0;
	animation: fadeInStatus 0.3s ease-out;
`;

export const SchemeMessageLabel = styled.div`
	font-size: 12px;
	font-weight: bold;
	color: rgba(255, 255, 255, 0.9);
	text-transform: uppercase;
	letter-spacing: 1px;
	margin-bottom: 8px;
`;

export const SchemeMessageContent = styled.div`
	font-size: 14px;
	color: #ffffff;
	font-weight: 500;
	line-height: 1.4;
`;

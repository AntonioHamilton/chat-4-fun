import styled from "styled-components";

export const Container = styled.div`
	min-height: 100vh;
	background: linear-gradient(135deg, #1a252f 0%, #34495e 50%, #2c3e50 100%);
	padding: 20px;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 20px;
	position: relative;
	overflow-x: hidden;

	&::before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-image:
			radial-gradient(
				circle at 20% 50%,
				rgba(243, 156, 18, 0.1) 0%,
				transparent 50%
			),
			radial-gradient(
				circle at 80% 50%,
				rgba(52, 152, 219, 0.1) 0%,
				transparent 50%
			);
		pointer-events: none;
	}
`;

export const SetupScreen = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 30px;
	min-height: 80vh;
`;

export const Title = styled.h1`
	color: #ecf0f1;
	font-size: 48px;
	font-weight: bold;
	text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

export const StartButton = styled.button`
	background: linear-gradient(145deg, #3498db, #2980b9);
	color: white;
	font-size: 24px;
	font-weight: bold;
	padding: 20px 40px;
	border: none;
	border-radius: 12px;
	cursor: pointer;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
	transition: all 0.2s ease;

	&:hover {
		transform: scale(1.05);
		box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
	}

	&:active {
		transform: scale(0.98);
	}
`;

export const GameHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	max-width: 1200px;
	gap: 20px;
`;

export const PlayerSection = styled.div`
	flex: 1;
`;

export const TurnIndicator = styled.div`
	color: #ecf0f1;
	font-size: 18px;
	font-weight: bold;
	text-align: center;
	padding: 10px 20px;
	background-color: rgba(0, 0, 0, 0.3);
	border-radius: 8px;
`;

export const BoardWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const HandSection = styled.div`
	width: 100%;
	max-width: 1200px;
`;

export const ActionsSection = styled.div`
	width: 100%;
	max-width: 1200px;
`;

export const WinnerMessage = styled.div`
	background: linear-gradient(145deg, #27ae60, #229954);
	color: white;
	font-size: 32px;
	font-weight: bold;
	padding: 20px 40px;
	border-radius: 12px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
	text-align: center;
`;

export const SpecialAbilityWrapper = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 15px;
`;

export const GameOverOverlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.8);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1000;
	animation: fadeIn 0.3s ease-out;

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
`;

export const GameOverModal = styled.div`
	background: linear-gradient(145deg, #2c3e50, #34495e);
	padding: 60px 80px;
	border-radius: 20px;
	box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
	text-align: center;
	animation: scaleIn 0.4s ease-out;

	@keyframes scaleIn {
		from {
			transform: scale(0.8);
			opacity: 0;
		}
		to {
			transform: scale(1);
			opacity: 1;
		}
	}
`;

export const VictoryMessage = styled.h2`
	color: #f39c12;
	font-size: 48px;
	font-weight: bold;
	margin-bottom: 30px;
	text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.7);
`;

export const RestartButton = styled.button`
	background: linear-gradient(145deg, #27ae60, #229954);
	color: white;
	font-size: 24px;
	font-weight: bold;
	padding: 16px 32px;
	border: none;
	border-radius: 12px;
	cursor: pointer;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
	transition: all 0.2s ease;

	&:hover {
		transform: scale(1.05);
		box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
	}

	&:active {
		transform: scale(0.98);
	}
`;

export const DefenseOverlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.7);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 999;
	animation: fadeIn 0.3s ease-out;
`;

export const DefenseModal = styled.div`
	background: linear-gradient(145deg, #2c3e50, #34495e);
	padding: 40px;
	border-radius: 20px;
	box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
	max-width: 90%;
	max-height: 90vh;
	overflow-y: auto;
	animation: scaleIn 0.4s ease-out;
`;

export const DefenseTitle = styled.h2`
	color: #3498db;
	font-size: 28px;
	font-weight: bold;
	margin-bottom: 20px;
	text-align: center;
	text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

export const DefenseOptions = styled.div`
	display: flex;
	justify-content: center;
	margin-bottom: 30px;
`;

export const PassButton = styled.button`
	background: linear-gradient(145deg, #e74c3c, #c0392b);
	color: white;
	font-size: 18px;
	font-weight: bold;
	padding: 12px 24px;
	border: none;
	border-radius: 8px;
	cursor: pointer;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
	transition: all 0.2s ease;

	&:hover {
		transform: scale(1.05);
		box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
	}

	&:active {
		transform: scale(0.98);
	}
`;

export const DefenseHandSection = styled.div`
	display: flex;
	justify-content: center;
`;

export const ViewCardsButton = styled.button`
	position: fixed;
	bottom: 20px;
	right: 20px;
	background: linear-gradient(145deg, #9b59b6, #8e44ad);
	color: white;
	font-size: 18px;
	font-weight: bold;
	padding: 16px 24px;
	border: none;
	border-radius: 50px;
	cursor: pointer;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
	transition: all 0.3s ease;
	z-index: 100;

	&:hover {
		transform: scale(1.1);
		box-shadow: 0 6px 16px rgba(0, 0, 0, 0.5);
	}

	&:active {
		transform: scale(0.95);
	}
`;

export const SchemeMessageSection = styled.div`
	width: 100%;
	max-width: 1200px;
`;

export const SelectedCardSection = styled.div`
	width: 100%;
	max-width: 1200px;
`;

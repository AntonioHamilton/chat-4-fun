import styled from "styled-components";

export const Container = styled.div`
	min-height: 100vh;
	background-color: #34495e;
	padding: 20px;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 20px;
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

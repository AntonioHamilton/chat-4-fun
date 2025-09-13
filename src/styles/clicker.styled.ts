import styled from "styled-components";

export const Container = styled.div`
	min-height: 100vh;
	background-color: #f5f4f8;
`;

export const ImageContainer = styled.div`
	.muscled-finger__right {
		transform: rotateY(180deg);
	}
`;

export const Logo = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	color: #000;
	font-family: "Anton";
`;

export const ButtonContainer = styled.div`
	height: 80vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const MuscleButton = styled.button`
	background: linear-gradient(145deg, #ff6b6b, #ff3b3b);
	color: white;
	font-size: 1.2rem;
	font-weight: bold;
	padding: 18px 40px;
	border: none;
	border-radius: 50px; /* deixa "redondinho", lembrando músculo */
	cursor: pointer;
	text-transform: uppercase;
	letter-spacing: 2px;
	box-shadow:
		0 8px #c62828,
		inset 0 -4px #ff9999; /* sombra "musculosa" */
	transition: all 0.15s ease-in-out;
	position: relative;

	&:before {
		content: "💪";
		position: absolute;
		left: -35px;
		font-size: 1.8rem;
	}

	&:after {
		content: "💪";
		position: absolute;
		right: -35px;
		font-size: 1.8rem;
		transform: rotateY(180deg);
	}

	&:hover {
		transform: scale(1.1);
		box-shadow:
			0 10px #b71c1c,
			inset 0 -6px #ffcccc;
	}

	&:active {
		transform: scale(0.95);
		box-shadow:
			0 4px #b71c1c,
			inset 0 -2px #ffcccc;
	}
`;

export const GainsCounter = styled.div`
	position: absolute;
	top: 20px;
	right: 20px;
	background: linear-gradient(145deg, #ffd54f, #ffca28);
	color: #222;
	font-size: 1.2rem;
	font-weight: bold;
	padding: 12px 20px;
	border-radius: 12px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
	display: flex;
	align-items: center;
	gap: 8px;

	&::before {
		content: "🏋️"; /* ícone antes do texto */
		font-size: 1.4rem;
	}
`;

import styled from "styled-components";
import { breakpoints } from "./breakpoints";

export const Container = styled.div`
	min-height: 100vh;
	@supports (height: 100dvh) {
		min-height: 100dvh; /* browsers modernos */
	}
	background-color: #f5f4f8;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	padding: 20px 20px 40px;

	@media (max-width: 768px) {
		padding: 20px 8px 40px;
	}
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
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 24px;
`;

export const LiftersContainer = styled.div`
	display: flex;
	gap: 30px;
	justify-content: center;

	.image-space {
		height: 210px;
		width: 1px;

		@media (max-width: ${breakpoints.md}) {
			height: 164px;
		}

		@media (max-width: ${breakpoints.sm}) {
			height: 104px;
		}
	}

	.lifters {
		display: flex;
		flex-direction: column;
		height: 257px;
		width: 200px;

		@media (max-width: ${breakpoints.md}) {
			height: 200px;
			width: 160px;
		}

		@media (max-width: ${breakpoints.sm}) {
			width: 100px;
			height: 160px;
		}
	}

	@media (max-width: ${breakpoints.md}) {
		gap: 12px;
	}

	@media (max-width: ${breakpoints.sm}) {
		gap: 4px;
	}
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

	@media (max-width: 768px) {
		top: 160px;
		right: auto;
	}
`;

export const UpgradeButton = styled.button`
	display: flex;
	flex-direction: column;
	font-family: "Roboto";
	background: linear-gradient(145deg, #6a11cb, #2575fc);
	color: #fff;
	font-weight: bold;
	font-size: 1rem;
	padding: 6px;
	border-radius: 12px;
	border: none;
	cursor: pointer;
	box-shadow: 0 6px 12px rgba(0, 0, 0, 0.25);
	transition: all 0.2s ease-in-out;
	letter-spacing: 1px;
	display: flex;
	align-items: center;
	justify-content: center;

	&:hover {
		transform: scale(1.05);
		background: linear-gradient(145deg, #2575fc, #6a11cb);
		box-shadow: 0 8px 16px rgba(0, 0, 0, 0.35);
	}

	&:active {
		transform: scale(0.95);
	}

	&:disabled {
		background: #969696ff;
		cursor: not-allowed;
		box-shadow: none;

		&:hover {
			transform: none;
		}
	}

	@media (max-width: ${breakpoints.sm}) {
		padding: 8px 6px;
	}
`;

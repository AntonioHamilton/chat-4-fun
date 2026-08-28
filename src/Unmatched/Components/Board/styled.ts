import styled from "styled-components";
import { breakpoints } from "@styles/breakpoints";

export const BoardContainer = styled.div`
	display: grid;
	gap: 2px;
	background-color: #2c3e50;
	padding: 10px;
	border-radius: 8px;
	width: 100%;
	max-width: 638px;

	@media (max-width: ${breakpoints.md}) {
		gap: 1px;
		padding: 6px;
	}
`;

export const Zone = styled.div<{
	$isOccupied: boolean;
	$isSelected: boolean;
	$isValid: boolean;
}>`
	width: 100%;
	aspect-ratio: 1 / 1;
	background-color: ${(props) => {
		if (props.$isSelected) return "#3498db";
		if (props.$isOccupied) return "#e74c3c";
		if (props.$isValid) return "#2ecc71";
		return "#ecf0f1";
	}};
	border: 2px solid
		${(props) => {
			if (props.$isSelected) return "#2980b9";
			if (props.$isValid) return "#27ae60";
			return "#bdc3c7";
		}};
	border-radius: 4px;
	cursor: pointer;
	transition: all 0.2s ease;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;

	@media (max-width: ${breakpoints.md}) {
		border-width: 1px;
		border-radius: 2px;
	}

	&:hover {
		background-color: ${(props) => {
			if (props.$isOccupied) return "#c0392b";
			if (props.$isValid) return "#27ae60";
			return "#d5dbdb";
		}};
		transform: scale(1.05);
	}
`;

export const CharacterMarker = styled.div<{ $characterId: string }>`
	width: 68%;
	aspect-ratio: 1 / 1;
	border-radius: 50%;
	border: 3px solid #fff;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: clamp(11px, 3.2vw, 24px);
	font-weight: bold;

	@media (max-width: ${breakpoints.md}) {
		border-width: 2px;
	}
	background: ${(props) =>
		props.$characterId === "gon"
			? "linear-gradient(135deg, #f39c12 0%, #e67e22 100%)"
			: "linear-gradient(135deg, #3498db 0%, #2980b9 100%)"};
	color: #fff;
	text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
	transition:
		transform 0.3s ease,
		box-shadow 0.2s ease,
		top 0.3s ease,
		left 0.3s ease;
	position: relative;
	animation: fadeInMarker 0.3s ease;

	&.attacking {
		animation: attackPulse 0.5s ease;
	}

	&.takingDamage {
		animation: damageShake 0.5s ease;
	}

	@keyframes attackPulse {
		0% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.3);
			box-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
		}
		100% {
			transform: scale(1);
		}
	}

	@keyframes damageShake {
		0%,
		100% {
			transform: translateX(0);
		}
		25% {
			transform: translateX(-5px);
		}
		75% {
			transform: translateX(5px);
		}
	}

	@keyframes fadeInMarker {
		from {
			opacity: 0;
			transform: scale(0.8);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}
`;

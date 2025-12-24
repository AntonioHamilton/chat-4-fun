import styled from "styled-components";

export const BoardContainer = styled.div`
	display: grid;
	gap: 2px;
	background-color: #2c3e50;
	padding: 10px;
	border-radius: 8px;
`;

export const Zone = styled.div<{
	$isOccupied: boolean;
	$isSelected: boolean;
	$isValid: boolean;
}>`
	width: 60px;
	height: 60px;
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

	&:hover {
		background-color: ${(props) => {
			if (props.$isOccupied) return "#c0392b";
			if (props.$isValid) return "#27ae60";
			return "#d5dbdb";
		}};
		transform: scale(1.05);
	}
`;

export const CharacterMarker = styled.div<{ $color: string }>`
	width: 40px;
	height: 40px;
	background-color: ${(props) => props.$color};
	border-radius: 50%;
	border: 3px solid #fff;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

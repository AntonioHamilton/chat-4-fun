import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
	from {
		opacity: 0;
		transform: translateY(20px) scale(0.8);
	}
	to {
		opacity: 1;
		transform: translateY(0) scale(1);
	}
`;

const shimmer = keyframes`
	0% {
		background-position: -200% center;
	}
	100% {
		background-position: 200% center;
	}
`;

export const HandContainer = styled.div`
	display: flex;
	gap: 10px;
	padding: 20px;
	background-color: rgba(0, 0, 0, 0.3);
	border-radius: 8px;
	flex-wrap: wrap;
	justify-content: center;
	animation: ${fadeIn} 0.5s ease-out;
`;

export const CardContainer = styled.div<{
	$type: string;
	$isSelected?: boolean;
}>`
	width: 140px;
	height: 200px;
	background: linear-gradient(
		145deg,
		${(props) => {
			switch (props.$type) {
				case "attack":
					return "#e74c3c, #c0392b";
				case "defense":
					return "#3498db, #2980b9";
				case "scheme":
					return "#9b59b6, #8e44ad";
				case "maneuver":
					return "#f39c12, #e67e22";
				default:
					return "#95a5a6, #7f8c8d";
			}
		}}
	);
	border-radius: 10px;
	padding: 12px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	color: white;
	cursor: pointer;
	transition: all 0.3s ease;
	box-shadow: ${(props) =>
		props.$isSelected
			? "0 6px 12px rgba(255, 215, 0, 0.8)"
			: "0 2px 4px rgba(0, 0, 0, 0.3)"};
	border: ${(props) =>
		props.$isSelected
			? "3px solid gold"
			: "2px solid rgba(255, 255, 255, 0.3)"};
	animation: ${fadeIn} 0.4s ease-out;
	position: relative;
	overflow: hidden;

	${(props) =>
		props.$isSelected &&
		`
		&::before {
			content: "";
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: linear-gradient(
				90deg,
				transparent 0%,
				rgba(255, 215, 0, 0.3) 50%,
				transparent 100%
			);
			background-size: 200% 100%;
			animation: shimmer 1.5s infinite;
			pointer-events: none;
		}

		@keyframes shimmer {
			0% {
				background-position: -200% center;
			}
			100% {
				background-position: 200% center;
			}
		}
	`}

	&:hover {
		transform: translateY(-8px) scale(1.05);
		box-shadow: 0 6px 12px rgba(0, 0, 0, 0.6);
		border-color: rgba(255, 255, 255, 0.6);
	}

	&:active {
		transform: translateY(-5px) scale(1.02);
		transition: all 0.1s ease;
	}
`;

export const CardHeader = styled.div`
	display: flex;
	flex-direction: column;
	gap: 4px;
	border-bottom: 1px solid rgba(255, 255, 255, 0.3);
	padding-bottom: 6px;
`;

export const CardName = styled.div`
	font-weight: bold;
	font-size: 11px;
	text-align: center;
	line-height: 1.2;
`;

export const CardType = styled.div`
	font-size: 9px;
	text-align: center;
	opacity: 0.9;
	text-transform: uppercase;
	letter-spacing: 0.5px;
`;

export const CardBody = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	flex: 1;
	gap: 6px;
`;

export const CardValue = styled.div`
	font-size: 32px;
	font-weight: bold;
	text-align: center;
	text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.7);
	line-height: 1;
`;

export const CardRange = styled.div`
	font-size: 10px;
	text-align: center;
	opacity: 0.9;
	background-color: rgba(0, 0, 0, 0.3);
	padding: 2px 8px;
	border-radius: 4px;
`;

export const CardFooter = styled.div`
	display: flex;
	flex-direction: column;
	gap: 4px;
	border-top: 1px solid rgba(255, 255, 255, 0.3);
	padding-top: 6px;
`;

export const CardDescription = styled.div`
	font-size: 9px;
	text-align: center;
	opacity: 0.95;
	line-height: 1.3;
	font-style: italic;
`;

export const CardEffects = styled.div`
	font-size: 8px;
	text-align: center;
	opacity: 0.85;
	background-color: rgba(0, 0, 0, 0.2);
	padding: 3px 6px;
	border-radius: 4px;
	line-height: 1.2;
`;

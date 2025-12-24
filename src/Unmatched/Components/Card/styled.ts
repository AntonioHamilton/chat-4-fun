import styled from "styled-components";

export const HandContainer = styled.div`
	display: flex;
	gap: 10px;
	padding: 20px;
	background-color: rgba(0, 0, 0, 0.3);
	border-radius: 8px;
	flex-wrap: wrap;
	justify-content: center;
`;

export const CardContainer = styled.div<{ $type: string }>`
	width: 120px;
	height: 160px;
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
	border-radius: 8px;
	padding: 10px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	color: white;
	cursor: pointer;
	transition: all 0.2s ease;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
	border: 2px solid rgba(255, 255, 255, 0.3);

	&:hover {
		transform: translateY(-5px);
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
	}
`;

export const CardName = styled.div`
	font-weight: bold;
	font-size: 12px;
	text-align: center;
	margin-bottom: 5px;
`;

export const CardValue = styled.div`
	font-size: 24px;
	font-weight: bold;
	text-align: center;
	text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

export const CardDescription = styled.div`
	font-size: 10px;
	text-align: center;
	opacity: 0.9;
	margin-top: auto;
`;

export const CardType = styled.div`
	font-size: 10px;
	text-align: center;
	opacity: 0.8;
	text-transform: uppercase;
	margin-top: 5px;
`;

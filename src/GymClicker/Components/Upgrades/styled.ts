import styled from "styled-components";

export const UpgradesButton = styled.button`
	background: linear-gradient(45deg, #ff416c, #ff4b2b);
	color: white;
	font-weight: bold;
	border: none;
	border-radius: 12px;
	padding: 8px 12px 12px;
	cursor: pointer;
	font-size: 1.1rem;
	font-family: "Roboto";
	transition:
		transform 0.2s ease,
		box-shadow 0.2s ease;

	&:hover {
		transform: scale(1.1);
		box-shadow: 0px 0px 12px rgba(255, 75, 43, 0.7);
	}
`;

export const ModalOverlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.6);
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const ModalContent = styled.div`
	background: #fff;
	border-radius: 16px;
	padding: 30px;
	text-align: center;
	min-width: 300px;
	max-width: 400px;
	box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.3);
	color: #000;
	font-family: "Roboto";
`;

export const UpgradeOptionContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const UpgradeOption = styled.button`
	background: #f1f1f1;
	padding: 12px;
	border-radius: 10px;
	border: none;
	margin: 4px 0;
	cursor: pointer;
	color: #000;
	transition: all 0.2s ease;

	&:hover {
		background: #ddd;
	}

	&.--active {
		display: block;
	}

	&.--inactive {
		display: none;
	}
`;

export const CloseButton = styled.button`
	margin-top: 20px;
	padding: 10px 15px;
	background: #ff4b2b;
	color: white;
	border: none;
	border-radius: 8px;
	cursor: pointer;

	&:hover {
		background: #ff1e00;
	}
`;

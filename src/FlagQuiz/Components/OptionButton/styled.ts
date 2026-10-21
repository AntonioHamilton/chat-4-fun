import styled from "styled-components";
import { PrimaryButton } from "@/styles/guess-country.styled";
import { theme } from "@/styles/theme";

export const Row = styled.div`
	position: relative;
	width: 100%;
`;

export const Button = styled(PrimaryButton)`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 10px;
	width: 100%;
	padding-right: 48px;

	svg {
		width: 20px;
		height: 20px;
		flex-shrink: 0;
	}
`;

export const InfoButton = styled.button`
	position: absolute;
	top: 50%;
	right: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 4px;
	font-size: 18px;
	color: ${theme.backgroundPrimary};
	background: none;
	border: none;
	border-radius: 50%;
	cursor: pointer;
	transform: translateY(-50%);

	&:focus-visible {
		outline: 2px solid ${theme.backgroundPrimary};
		outline-offset: 2px;
	}
`;

export const Tooltip = styled.p`
	position: absolute;
	top: calc(100% + 8px);
	left: 0;
	right: 0;
	z-index: 10;
	margin: 0;
	padding: 10px 12px;
	font-size: 13px;
	line-height: 1.4;
	color: ${theme.textPrimary};
	background: #0b0b12;
	border-radius: 10px;
	box-shadow: 0 10px 24px ${theme.shadowColor};

	&[hidden] {
		display: none;
	}
`;

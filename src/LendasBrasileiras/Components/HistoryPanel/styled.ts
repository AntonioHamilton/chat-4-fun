import styled from "styled-components";
import { theme } from "@/styles/theme";

export const Backdrop = styled.div`
	position: absolute;
	inset: 0;
	z-index: 20;
`;

export const Toggle = styled.button`
	position: absolute;
	top: 50%;
	left: 0;
	z-index: 22;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 24px;
	height: 44px;
	padding: 0;
	transform: translateY(-50%);
	border-radius: 0 8px 8px 0;
	border: 1px solid ${theme.gold500};
	border-left: none;
	background: ${theme.backgroundSecondary};
	color: ${theme.gold400};
	cursor: pointer;

	&:hover {
		background: ${theme.cardBgHover};
	}

	&:focus-visible {
		outline: 2px solid ${theme.gold400};
		outline-offset: 2px;
	}
`;

export const Panel = styled.div`
	position: absolute;
	top: 48px;
	bottom: 48px;
	left: 34px;
	z-index: 21;
	width: min(300px, 60vw);
`;

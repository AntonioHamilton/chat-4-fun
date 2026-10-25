import styled from "styled-components";
import { theme } from "@/styles/theme";

export const Overlay = styled.div`
	position: fixed;
	inset: 0;
	z-index: 50;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 16px;
	background: ${theme.overlayBg};
`;

export const Dialog = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
	width: min(320px, 100%);
	padding: 16px;
	border-radius: 12px;
	border: 1px solid ${theme.borderSubtle};
	background: ${theme.backgroundSecondary};
	box-shadow: 0 12px 30px ${theme.shadowColor};
`;

export const Title = styled.h2`
	margin: 0 0 4px;
	font-size: 1rem;
	color: ${theme.gold400};
`;

export const Option = styled.button`
	padding: 12px 14px;
	border-radius: 6px;
	border: 1px solid ${theme.borderSubtle};
	background: ${theme.cardBg};
	color: ${theme.textPrimary};
	font-size: 0.9rem;
	text-align: left;
	cursor: pointer;

	&:hover {
		background: ${theme.cardBgHover};
		border-color: ${theme.gold500};
	}

	&:focus-visible {
		outline: 2px solid ${theme.gold400};
	}
`;

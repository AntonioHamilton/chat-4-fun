import styled from "styled-components";
import { theme } from "@/styles/theme";

export const Overlay = styled.div`
	position: fixed;
	inset: 0;
	z-index: 50;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 8px;
	background: ${theme.overlayBg};
`;

export const Dialog = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 8px;
	max-height: 100%;
	max-width: 100%;
	overflow-y: auto;
`;

export const Error = styled.p`
	margin: 0;
	padding: 6px 10px;
	border-radius: 6px;
	border: 1px solid ${theme.gold500};
	background: ${theme.backgroundSecondary};
	color: ${theme.gold400};
	font-size: 0.8rem;
	text-align: center;
`;

export const Actions = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 8px;
`;

export const Primary = styled.button`
	min-height: 40px;
	padding: 8px 14px;
	border-radius: 8px;
	border: none;
	background: ${theme.gold500};
	color: ${theme.backgroundPrimary};
	font-size: 0.85rem;
	font-weight: 700;
	cursor: pointer;

	&:focus-visible {
		outline: 2px solid ${theme.gold400};
		outline-offset: 2px;
	}
`;

export const Close = styled.button`
	min-height: 40px;
	padding: 8px 14px;
	border-radius: 8px;
	border: 1px solid ${theme.gold500};
	background: ${theme.backgroundSecondary};
	color: ${theme.gold400};
	font-size: 0.85rem;
	font-weight: 700;
	cursor: pointer;

	&:focus-visible {
		outline: 2px solid ${theme.gold400};
		outline-offset: 2px;
	}
`;

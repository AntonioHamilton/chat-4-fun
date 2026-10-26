import styled from "styled-components";
import { theme } from "@/styles/theme";

export const Overlay = styled.div`
	position: absolute;
	inset: 0;
	z-index: 40;
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
	gap: 12px;
	max-width: 100%;
	padding: 16px 20px;
	border-radius: 12px;
	border: 1px solid ${theme.gold500};
	background: ${theme.backgroundSecondary};
`;

export const Text = styled.p`
	margin: 0;
	color: ${theme.textPrimary};
	font-size: 0.95rem;
	text-align: center;
`;

export const Actions = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 8px;
`;

export const Keep = styled.button`
	min-width: 96px;
	min-height: 44px;
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

export const Leave = styled.button`
	min-width: 96px;
	min-height: 44px;
	padding: 8px 14px;
	border-radius: 8px;
	border: 1px solid ${theme.gold500};
	background: transparent;
	color: ${theme.gold400};
	font-size: 0.85rem;
	font-weight: 700;
	cursor: pointer;

	&:focus-visible {
		outline: 2px solid ${theme.gold400};
		outline-offset: 2px;
	}
`;

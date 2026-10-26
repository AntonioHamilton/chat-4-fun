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
	gap: 8px;
	box-sizing: border-box;
	width: min(420px, 100%);
	max-height: 100%;
	padding: 12px;
	border-radius: 12px;
	border: 1px solid ${theme.borderSubtle};
	background: ${theme.backgroundSecondary};
	box-shadow: 0 12px 30px ${theme.shadowColor};
`;

export const Title = styled.h2`
	margin: 0;
	font-size: 1rem;
	color: ${theme.gold400};
`;

export const Empty = styled.p`
	margin: 0;
	font-size: 0.85rem;
	color: ${theme.textSecondary};
`;

export const List = styled.ul`
	display: flex;
	flex-direction: column;
	gap: 4px;
	margin: 0;
	padding: 0;
	list-style: none;
	min-height: 0;
	overflow-y: auto;
`;

export const Item = styled.li`
	display: grid;
	grid-template-columns: minmax(0, 1fr) auto auto;
	gap: 10px;
	padding: 6px 8px;
	border-radius: 6px;
	border: 1px solid ${theme.borderSubtle};
	background: ${theme.cardBg};
	font-size: 0.8rem;
	color: ${theme.textSecondary};
`;

export const Name = styled.span`
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	color: ${theme.textPrimary};
	font-weight: 700;
`;

export const Close = styled.button`
	align-self: center;
	flex: 0 0 auto;
	min-height: 40px;
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

import styled from "styled-components";
import { breakpoints } from "@/styles/breakpoints";
import { theme } from "@/styles/theme";

export const Bar = styled.header<{ $active: boolean }>`
	display: flex;
	flex-wrap: nowrap;
	align-items: center;
	gap: 4px 12px;
	min-width: 0;
	padding: 4px 8px;
	border-radius: 12px;
	border: 1px solid
		${({ $active }) => ($active ? theme.gold500 : theme.borderSubtle)};
	background: ${theme.panelBg};
	font-size: 0.75rem;
	color: ${theme.textSecondary};
`;

export const Name = styled.h2`
	margin: 0;
	white-space: nowrap;
	font-size: 0.85rem;
	color: ${theme.textPrimary};
`;

export const Badge = styled.span`
	margin-left: 6px;
	padding: 1px 6px;
	border-radius: 8px;
	background: ${theme.gold500};
	color: ${theme.backgroundPrimary};
	font-size: 0.65rem;
	font-weight: 700;
`;

export const Hand = styled.div`
	display: flex;
	align-items: center;
	padding-left: 10px;
`;

export const Back = styled.div`
	flex: 0 0 auto;
	width: 20px;
	aspect-ratio: 5 / 7;
	margin-left: -10px;
	border-radius: 3px;
	border: 1px solid ${theme.gold500};
	background: repeating-linear-gradient(
		45deg,
		${theme.blue500},
		${theme.blue500} 3px,
		${theme.purple500} 3px,
		${theme.purple500} 6px
	);
`;

export const Chips = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
`;

export const Extra = styled.div`
	display: none;
	align-items: center;
	gap: 10px;

	@media (min-width: ${breakpoints.lg}) {
		display: flex;
	}
`;

export const Chip = styled.button`
	padding: 2px 8px;
	border-radius: 8px;
	border: 1px solid ${theme.borderSubtle};
	background: ${theme.cardBg};
	color: inherit;
	font-size: inherit;
	white-space: nowrap;
	cursor: pointer;

	&:hover {
		background: ${theme.cardBgHover};
		border-color: ${theme.gold500};
	}

	&:focus-visible {
		outline: 2px solid ${theme.gold400};
	}
`;

export const CommanderTag = styled.span`
	max-width: 160px;
	padding: 2px 8px;
	overflow: hidden;
	text-overflow: ellipsis;
	border-radius: 8px;
	border: 1px solid ${theme.gold500};
	background: ${theme.cardBg};
	color: ${theme.gold400};
	white-space: nowrap;
`;

export const End = styled.div`
	min-width: 0;
	margin-left: auto;
	display: flex;
	align-items: center;
	gap: 10px;
`;

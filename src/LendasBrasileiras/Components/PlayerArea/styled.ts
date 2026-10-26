import styled, { css } from "styled-components";
import { breakpoints } from "@/styles/breakpoints";
import { theme } from "@/styles/theme";

type Position = "top" | "bottom";

const mobileAreas = (position: Position) =>
	position === "top"
		? `"support usage usage usage" "battle battle battle battle" "lands lands lands lands" "lib grave exile cmd"`
		: `"lib grave exile cmd" "lands lands lands lands" "battle battle battle battle" "support usage usage usage"`;

const wideAreas = (position: Position) =>
	position === "top"
		? `"cmd lands lands" "exile lands lands" "grave support usage" "lib battle battle"`
		: `"lib battle battle" "grave support usage" "exile lands lands" "cmd lands lands"`;

export const Root = styled.section<{ $position: Position; $active: boolean }>`
	display: flex;
	flex-direction: column;
	gap: 8px;
	padding: 8px;
	border-radius: 12px;
	border: 1px solid
		${({ $active }) => ($active ? theme.gold500 : theme.borderSubtle)};
	background: ${theme.panelBg};
	user-select: none;
	-webkit-user-select: none;
`;

export const Header = styled.header<{ $position: Position }>`
	order: ${({ $position }) => ($position === "top" ? 0 : 1)};
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: space-between;
	gap: 8px 16px;
`;

export const Name = styled.h2`
	margin: 0;
	font-size: 0.95rem;
	color: ${theme.textPrimary};
`;

export const Badge = styled.span`
	margin-left: 8px;
	padding: 1px 8px;
	border-radius: 8px;
	background: ${theme.gold500};
	color: ${theme.backgroundPrimary};
	font-size: 0.7rem;
	font-weight: 700;
`;

export const Board = styled.div<{ $position: Position }>`
	order: ${({ $position }) => ($position === "top" ? 2 : 0)};
	display: grid;
	gap: 6px;
	grid-template-columns: repeat(4, minmax(0, 1fr));
	grid-template-areas: ${({ $position }) => mobileAreas($position)};

	@media (min-width: ${breakpoints.md}) {
		grid-template-columns: calc(var(--card-w) + 24px) minmax(0, 1fr) minmax(
				0,
				1fr
			);
		grid-template-areas: ${({ $position }) => wideAreas($position)};
	}
`;

export const HandWrapper = styled.div<{ $position: Position }>`
	order: ${({ $position }) => ($position === "top" ? 1 : 2)};
	min-width: 0;
`;

export const Back = styled.div`
	width: var(--card-w, 64px);
	aspect-ratio: 5 / 7;
	border-radius: 6px;
	border: 2px solid ${theme.gold500};
	background: repeating-linear-gradient(
		45deg,
		${theme.blue500},
		${theme.blue500} 6px,
		${theme.purple500} 6px,
		${theme.purple500} 12px
	);
`;

const smallButton = css`
	padding: 4px 8px;
	border-radius: 4px;
	border: 1px solid ${theme.gold500};
	background: transparent;
	color: ${theme.gold400};
	font-size: 0.65rem;
	font-weight: 700;
	cursor: pointer;

	&:hover {
		background: ${theme.cardBgHover};
	}

	&:focus-visible {
		outline: 2px solid ${theme.gold400};
	}
`;

export const DrawButton = styled.button`
	${smallButton};
`;

export const ClearButton = styled.button`
	${smallButton};
	padding: 1px 6px;
`;

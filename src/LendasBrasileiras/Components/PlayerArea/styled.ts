import styled from "styled-components";
import { theme } from "@/styles/theme";

type Position = "top" | "bottom";

const areas = (position: Position) =>
	position === "top"
		? `"lands support cmd usage" "battle battle battle battle"`
		: `"battle battle battle battle" "lands support cmd usage"`;

const rows = (position: Position) =>
	position === "top" ? "auto minmax(0, 1fr)" : "minmax(0, 1fr) auto";

export const Root = styled.section<{ $position: Position; $active: boolean }>`
	display: grid;
	grid-template-columns:
		calc(var(--card-w) + 12px) minmax(0, 1fr) calc(var(--cmd-w) + 12px)
		minmax(0, 0.7fr);
	grid-template-rows: ${({ $position }) => rows($position)};
	grid-template-areas: ${({ $position }) => areas($position)};
	--cmd-w: calc(var(--card-w) * 1.5);
	gap: 8px 6px;
	min-height: 0;
	padding: 10px 8px 6px;
	border-radius: 12px;
	border: 1px solid
		${({ $active }) => ($active ? theme.gold500 : theme.borderSubtle)};
	background: ${theme.panelBg};

	@media (max-height: 599px) {
		grid-template-columns:
			calc(var(--card-w) + 12px) minmax(0, 1fr) minmax(0, 0.5fr)
			calc(var(--card-w) + 12px) minmax(0, 0.4fr);
		grid-template-rows: minmax(0, 1fr);
		grid-template-areas: "lands battle support cmd usage";
	}

	user-select: none;
	-webkit-user-select: none;

	[data-zone="command"] {
		--card-w: var(--cmd-w);
	}
`;

export const TappedMarker = styled.span`
	position: absolute;
	bottom: -7px;
	left: 50%;
	z-index: 2;
	transform: translateX(-50%);
	padding: 0 6px;
	border-radius: 8px;
	background: ${theme.gold500};
	color: ${theme.backgroundPrimary};
	font-size: 0.6rem;
	font-weight: 700;
	white-space: nowrap;
`;

export const ClearButton = styled.button`
	padding: 1px 6px;
	border-radius: 4px;
	border: 1px solid ${theme.gold500};
	background: transparent;
	color: ${theme.gold400};
	font-size: 0.6rem;
	font-weight: 700;
	cursor: pointer;

	&:hover {
		background: ${theme.cardBgHover};
	}

	&:focus-visible {
		outline: 2px solid ${theme.gold400};
	}
`;

import styled from "styled-components";
import { breakpoints } from "@/styles/breakpoints";
import { pageBackground } from "@/styles/guess-country.styled";
import { theme } from "@/styles/theme";

export const Wrapper = styled.div`
	--card-w: clamp(32px, 9vh, 88px);
	--hand-w: clamp(46px, 12vh, 110px);
	position: fixed;
	inset: 0;
	z-index: 30;
	box-sizing: border-box;
	display: grid;
	grid-template-columns: minmax(0, 1fr);
	grid-template-rows: auto minmax(0, 1fr) minmax(0, 1fr) auto;
	gap: 6px;
	padding: 6px;
	overflow: hidden;
	background: ${pageBackground};
	color: ${theme.textPrimary};

	@media (min-width: ${breakpoints.xl}) {
		grid-template-columns: minmax(0, 1fr) 220px;
	}

	@media (orientation: portrait) and (max-width: ${breakpoints.sm}) {
		display: none;
	}
`;

export const TopArea = styled.div`
	min-width: 0;

	@media (min-width: ${breakpoints.xl}) {
		grid-column: 1 / -1;
	}
`;

export const OpponentField = styled.div`
	display: grid;
	min-height: 0;
`;

export const PlayerField = styled.div`
	display: grid;
	min-height: 0;
`;

export const Side = styled.div`
	display: none;

	@media (min-width: ${breakpoints.xl}) {
		display: block;
		grid-column: 2;
		grid-row: 2 / 4;
		min-height: 0;
		overflow-y: auto;
	}
`;

export const Bottom = styled.div`
	min-width: 0;

	@media (min-width: ${breakpoints.xl}) {
		grid-column: 1 / -1;
	}
`;

export const MenuButton = styled.button`
	padding: 4px 10px;
	border-radius: 4px;
	border: 1px solid ${theme.gold500};
	background: transparent;
	color: ${theme.gold400};
	font-size: 0.75rem;
	font-weight: 700;
	cursor: pointer;

	&:hover {
		background: ${theme.cardBgHover};
	}

	&:focus-visible {
		outline: 2px solid ${theme.gold400};
		outline-offset: 2px;
	}
`;

export const TurnInfo = styled.span`
	font-size: 0.75rem;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;

export const PassButton = styled.button`
	align-self: flex-end;
	min-width: 84px;
	min-height: 44px;
	padding: 8px 12px;
	border-radius: 8px;
	border: none;
	background: ${theme.gold500};
	color: ${theme.backgroundPrimary};
	font-size: 0.85rem;
	font-weight: 700;
	cursor: pointer;

	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	&:focus-visible {
		outline: 2px solid ${theme.gold400};
		outline-offset: 2px;
	}
`;

export const Messages = styled.div`
	position: absolute;
	top: 48px;
	left: 50%;
	z-index: 5;
	transform: translateX(-50%);
	display: flex;
	flex-direction: column;
	gap: 6px;
	max-width: 90%;
`;

export const Message = styled.p<{ $kind: "error" | "winner" }>`
	margin: 0;
	padding: 8px 12px;
	border-radius: 8px;
	border: 1px solid
		${({ $kind }) => ($kind === "error" ? theme.gold500 : theme.gold400)};
	background: ${theme.backgroundSecondary};
	color: ${theme.gold400};
	font-size: 0.85rem;
	font-weight: ${({ $kind }) => ($kind === "winner" ? 700 : 400)};
`;

export const RotateNotice = styled.div`
	display: none;

	@media (orientation: portrait) and (max-width: ${breakpoints.sm}) {
		position: fixed;
		inset: 0;
		z-index: 30;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 8px;
		padding: 24px;
		text-align: center;
		background: ${theme.backgroundPrimary};
		color: ${theme.textPrimary};
	}
`;

export const RotateTitle = styled.strong`
	font-size: 1.5rem;
	color: ${theme.gold400};
`;

export const Ghost = styled.div`
	position: fixed;
	z-index: 60;
	pointer-events: none;
	transform: translate(-50%, -50%) rotate(4deg);
	filter: drop-shadow(0 8px 12px ${theme.shadowColor});
`;

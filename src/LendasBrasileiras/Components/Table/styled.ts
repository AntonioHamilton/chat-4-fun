import styled from "styled-components";
import { breakpoints } from "@/styles/breakpoints";
import { pageBackground } from "@/styles/guess-country.styled";
import { theme } from "@/styles/theme";

export const Wrapper = styled.div`
	--card-w: clamp(32px, 9vh, 88px);
	--hand-w: clamp(33px, 9vh, 79px);
	position: fixed;
	inset: 0;
	z-index: 30;
	box-sizing: border-box;
	display: grid;
	grid-template-columns: minmax(0, 1fr);
	grid-template-rows: auto minmax(0, 1fr) minmax(0, 1fr) auto;
	gap: 6px;
	padding: 6px 6px 6px 30px;
	overflow: hidden;
	background: ${pageBackground};
	color: ${theme.textPrimary};

	&:focus {
		outline: none;
	}

	@media (orientation: portrait) and (max-width: ${breakpoints.sm}) {
		display: none;
	}
`;

export const SpellFlash = styled.div`
	position: absolute;
	top: 22%;
	left: 50%;
	z-index: 15;
	--card-w: calc(var(--hand-w) * 1.7);
	transform: translateX(-50%);
	pointer-events: none;
	filter: drop-shadow(0 8px 12px ${theme.shadowColor});
`;

export const TopArea = styled.div`
	min-width: 0;
`;

export const OpponentField = styled.div`
	display: grid;
	min-height: 0;
`;

export const PlayerField = styled.div`
	display: grid;
	min-height: 0;
`;

export const Bottom = styled.div`
	min-width: 0;
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
	min-width: 72px;
	min-height: 44px;
	padding: 6px 10px;
	border-radius: 8px;
	border: none;
	background: ${theme.gold500};
	color: ${theme.backgroundPrimary};
	font-size: 0.75rem;
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

export const RotateExit = styled.button`
	min-height: 44px;
	margin-top: 12px;
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

export const Ghost = styled.div`
	position: fixed;
	z-index: 60;
	pointer-events: none;
	transform: translate(-50%, -50%) rotate(4deg);
	filter: drop-shadow(0 8px 12px ${theme.shadowColor});
`;

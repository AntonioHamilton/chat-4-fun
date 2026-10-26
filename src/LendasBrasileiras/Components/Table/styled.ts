import styled from "styled-components";
import { breakpoints } from "@/styles/breakpoints";
import { theme } from "@/styles/theme";

export const Wrapper = styled.div`
	--card-w: 64px;
	display: grid;
	grid-template-columns: minmax(0, 1fr);
	gap: 12px;
	width: 100%;
	max-width: 1400px;
	margin: 0 auto;

	@media (min-width: ${breakpoints.md}) {
		--card-w: 76px;
	}

	@media (min-width: ${breakpoints.lg}) {
		--card-w: 88px;
		grid-template-columns: minmax(0, 1fr) 260px;
	}
`;

export const Main = styled.div`
	display: flex;
	flex-direction: column;
	gap: 12px;
	min-width: 0;
`;

export const TurnBar = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: space-between;
	gap: 8px 16px;
	padding: 8px 12px;
	border-radius: 8px;
	border: 1px solid ${theme.borderSubtle};
	background: ${theme.panelBg};
	font-size: 0.85rem;
`;

export const PhaseButton = styled.button`
	padding: 8px 16px;
	border-radius: 4px;
	border: none;
	background: ${theme.gold500};
	color: ${theme.backgroundPrimary};
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

export const Ghost = styled.div`
	position: fixed;
	z-index: 60;
	pointer-events: none;
	transform: translate(-50%, -50%) rotate(4deg);
	filter: drop-shadow(0 8px 12px ${theme.shadowColor});
`;

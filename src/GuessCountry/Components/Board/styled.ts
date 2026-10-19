import styled, { css, keyframes } from "styled-components";
import { breakpoints } from "@/styles/breakpoints";
import * as Shared from "@/styles/guess-country.styled";
import { theme } from "@/styles/theme";

export const TopBar = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 8px;
	padding: 12px 20px;
	text-align: center;
	background: ${theme.panelBg};
	border: 1px solid ${theme.borderSubtle};
	border-radius: 16px;
`;

export const TopInfo = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 2px;
	font-size: 13px;
	color: ${theme.textTertiary};

	strong {
		color: ${theme.textPrimary};
		font-size: 15px;
	}
`;

export const Score = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 12px;
	font-size: 24px;
	font-weight: 800;
	color: ${theme.gold400};
`;

export const Timer = styled.div<{ $urgent: boolean }>`
	text-align: center;
	font-size: 20px;
	font-weight: 800;
	font-variant-numeric: tabular-nums;
	color: ${({ $urgent }) => ($urgent ? "#ff6b6b" : theme.textPrimary)};
`;

export const Lists = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-areas:
		"mine opponent"
		"actions actions";
	gap: 20px;

	@media (max-width: ${breakpoints.md}) {
		gap: 12px;
		grid-template-columns: 1fr;
		grid-template-areas:
			"mine"
			"actions"
			"opponent";
	}
`;

export const MyPanel = styled(Shared.Panel)`
	grid-area: mine;
`;

export const OpponentPanel = styled(Shared.Panel)`
	grid-area: opponent;
`;

export const ActionPanel = styled(Shared.Panel)`
	grid-area: actions;
`;

export const AccordionToggle = styled.button<{ $open: boolean }>`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	margin: 0 0 ${({ $open }) => ($open ? "14px" : "0")};
	padding: 0;
	font: inherit;
	font-size: 13px;
	font-weight: 700;
	letter-spacing: 0.12em;
	text-transform: uppercase;
	color: ${theme.gold400};
	background: transparent;
	border: 0;
	cursor: pointer;

	&:focus-visible {
		outline: 3px solid rgba(242, 201, 76, 0.5);
		outline-offset: 4px;
	}
`;

export const AccordionChevron = styled.svg<{ $open: boolean }>`
	width: 22px;
	height: 22px;
	fill: none;
	stroke: currentColor;
	stroke-width: 2.5;
	stroke-linecap: round;
	stroke-linejoin: round;
	transition: transform 0.2s ease;
	transform: rotate(${({ $open }) => ($open ? "180deg" : "0deg")});
`;

export const Words = styled.ol`
	list-style: none;
	margin: 0;
	padding: 0;
	display: flex;
	flex-direction: column;
	gap: 8px;
`;

const blink = keyframes`
	50% { opacity: 0; }
`;

export const Word = styled.li<{
	$state: "found" | "active" | "idle" | "hidden";
}>`
	display: flex;
	align-items: center;
	gap: 12px;
	min-height: 52px;
	padding: 10px 14px;
	border-radius: 10px;
	font-size: 20px;
	font-weight: 700;
	letter-spacing: 0.06em;
	text-transform: uppercase;
	border: 1px solid ${theme.borderSubtle};
	background: ${theme.cardBg};
	color: ${theme.textPrimary};
	overflow-wrap: anywhere;

	${({ $state }) =>
		$state === "found" &&
		css`
			background: rgba(46, 204, 113, 0.12);
			border-color: rgba(46, 204, 113, 0.5);
		`}

	${({ $state }) =>
		$state === "active" &&
		css`
			border-color: ${theme.gold400};
			background: rgba(242, 201, 76, 0.1);
		`}

	${({ $state }) =>
		$state === "hidden" &&
		css`
			color: ${theme.textTertiary};
			letter-spacing: 0.3em;
		`}

	@media (max-width: ${breakpoints.md}) {
		min-height: 44px;
		padding: 8px 12px;
		gap: 10px;
		font-size: 16px;
	}
`;

export const WordIndex = styled.span`
	flex: none;
	width: 22px;
	font-size: 14px;
	color: ${theme.gold400};

	@media (max-width: ${breakpoints.md}) {
		width: 18px;
		font-size: 13px;
	}
`;

export const Revealed = styled.span`
	color: ${theme.gold400};
`;

export const Hidden = styled.span`
	color: ${theme.textTertiary};
`;

export const Caret = styled.span`
	margin-left: 2px;
	color: ${theme.gold400};
	animation: ${blink} 1s steps(1) infinite;
`;

export const Actions = styled.div`
	display: flex;
	flex-direction: column;
	gap: 14px;

	@media (max-width: ${breakpoints.md}) {
		gap: 10px;
	}
`;

export const ActionText = styled.p`
	margin: 0;
	color: ${theme.textSecondary};

	@media (max-width: ${breakpoints.md}) {
		font-size: 14px;
	}
`;

export const GuessRow = styled.div`
	display: flex;
	gap: 12px;

	@media (max-width: ${breakpoints.md}) {
		gap: 8px;
	}

	> :first-child {
		flex: 1;
	}

	@media (max-width: ${breakpoints.sm}) {
		flex-direction: column;
	}
`;

export const WrongList = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: 8px;
	font-size: 13px;
	color: ${theme.textTertiary};
`;

export const WrongChip = styled.span`
	padding: 4px 10px;
	border-radius: 999px;
	color: #ff9b9b;
	background: rgba(255, 107, 107, 0.12);
	border: 1px solid rgba(255, 107, 107, 0.4);
`;

export const Banner = styled.div<{ $correct: boolean }>`
	padding: 12px 16px;
	border-radius: 10px;
	font-weight: 700;
	text-align: center;

	@media (max-width: ${breakpoints.md}) {
		padding: 8px 12px;
		font-size: 14px;
	}

	color: ${({ $correct }) => ($correct ? "#7ee2a8" : "#ff9b9b")};
	background: ${({ $correct }) =>
		$correct ? "rgba(46, 204, 113, 0.12)" : "rgba(255, 107, 107, 0.12)"};
	border: 1px solid
		${({ $correct }) =>
			$correct ? "rgba(46, 204, 113, 0.5)" : "rgba(255, 107, 107, 0.4)"};
`;

export const Overlay = styled.div`
	position: fixed;
	inset: 0;
	z-index: 50;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 20px;
	background: ${theme.overlayBg};
	backdrop-filter: blur(4px);
`;

export const Modal = styled.div`
	width: 100%;
	max-width: 460px;
	display: flex;
	flex-direction: column;
	gap: 16px;
	padding: 28px;
	text-align: center;
	background: ${theme.backgroundSecondary};
	border: 1px solid ${theme.gold400};
	border-radius: 16px;
	box-shadow: 0 20px 50px ${theme.shadowColor};
`;

export const ModalTitle = styled.h2<{ $won: boolean }>`
	margin: 0;
	font-size: 26px;
	color: ${({ $won }) => ($won ? theme.gold400 : theme.textPrimary)};
`;

export const ModalScore = styled.p`
	margin: 0;
	font-size: 32px;
	font-weight: 800;
	color: ${theme.gold400};
`;

export const ModalList = styled.ul`
	list-style: none;
	margin: 0;
	padding: 0;
	display: flex;
	flex-direction: column;
	gap: 6px;
	color: ${theme.textSecondary};
`;

export const GuessInput = styled.input`
	width: 100%;
	padding: 14px 16px;
	font-size: 16px;
	color: ${theme.textPrimary};
	background: ${theme.cardBg};
	border: 1px solid ${theme.borderSubtle};
	border-radius: 10px;
	outline: none;

	&::placeholder {
		color: ${theme.textTertiary};
	}

	&:focus {
		border-color: ${theme.gold400};
		box-shadow: 0 0 0 3px rgba(242, 201, 76, 0.2);
	}

	&:disabled {
		opacity: 0.5;
	}
`;

export const ModalItem = styled.li`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 10px;
`;

import styled, { keyframes } from "styled-components";
import { FEEDBACK_MS, WRONG_FEEDBACK_MS } from "../../Hooks/useFlagQuiz";
import { Feedback } from "../../Hooks/useFlagQuiz";
import { theme } from "@/styles/theme";

const rise = keyframes`
	0% {
		transform: translate(-50%, 110%);
	}
	30%,
	70% {
		transform: translate(-50%, 0);
	}
	100% {
		transform: translate(-50%, 110%);
	}
`;

const durationOf = (kind: Feedback) =>
	kind === "wrong" ? WRONG_FEEDBACK_MS : FEEDBACK_MS;

export const Wrapper = styled.div<{ $kind: Feedback }>`
	position: absolute;
	bottom: 0;
	left: 50%;
	z-index: 5;
	width: 170px;
	max-width: 60%;
	pointer-events: none;
	transform: translate(-50%, 110%);
	animation: ${rise} ${({ $kind }) => durationOf($kind)}ms ease-in-out forwards;
`;

export const Image = styled.img`
	display: block;
	width: 100%;
	height: auto;
`;

export const Badge = styled.span<{ $kind: Feedback }>`
	position: absolute;
	top: 0;
	right: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 42px;
	height: 42px;
	color: #ffffff;
	background: ${({ $kind }) => ($kind === "correct" ? "#3ecf78" : "#ff5d5d")};
	border: 3px solid ${theme.panelBg};
	border-radius: 50%;
`;

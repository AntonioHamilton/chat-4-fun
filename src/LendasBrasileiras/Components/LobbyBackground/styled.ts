import styled, { css, keyframes } from "styled-components";
import {
	LOBBY_FADE_MS,
	LOBBY_SLIDE_MS
} from "@/LendasBrasileiras/Constants/lobby";
import { theme } from "@/styles/theme";

const appear = keyframes`
	from {
		opacity: 0;
	}

	to {
		opacity: 1;
	}
`;

const grow = keyframes`
	from {
		transform: scale(1);
	}

	to {
		transform: scale(1.1);
	}
`;

const vanish = keyframes`
	from {
		opacity: 1;
		transform: scale(1.1);
	}

	to {
		opacity: 0;
		transform: scale(1.16);
	}
`;

export const Stage = styled.div`
	position: absolute;
	inset: 0;
	overflow: hidden;
	pointer-events: none;
	background-color: ${theme.backgroundPrimary};
`;

export const Slide = styled.div<{ $image: string; $leaving?: boolean }>`
	position: absolute;
	inset: 0;
	background: ${({ $image }) => $image};
	background-size: cover;
	background-position: center;
	opacity: 1;
	animation: ${({ $leaving }) =>
		$leaving
			? css`
					${vanish} ${LOBBY_FADE_MS}ms ease-in forwards
				`
			: css`
					${appear} ${LOBBY_FADE_MS}ms ease-out both,
					${grow} ${LOBBY_SLIDE_MS}ms linear both
				`};

	@media (prefers-reduced-motion: reduce) {
		animation: none;
	}
`;

export const Shade = styled.div`
	position: absolute;
	inset: 0;
	background: linear-gradient(
		180deg,
		rgba(6, 14, 38, 0.35) 0%,
		rgba(6, 14, 38, 0.75) 100%
	);
`;

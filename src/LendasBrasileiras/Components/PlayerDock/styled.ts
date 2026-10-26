import styled from "styled-components";
import { theme } from "@/styles/theme";

export const Dock = styled.section`
	--card-w: var(--hand-w);
	display: grid;
	grid-template-columns: auto auto minmax(0, 1fr) auto;
	align-items: end;
	gap: 8px 10px;
	min-width: 0;
	padding: 12px 8px 6px;
	border-radius: 12px;
	border: 1px solid ${theme.borderSubtle};
	background: ${theme.panelBg};
	user-select: none;
	-webkit-user-select: none;
`;

export const Hero = styled.div`
	padding: 0 48px;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 4px;
`;

export const Portrait = styled.div`
	position: relative;
	box-sizing: border-box;
	width: calc(var(--hand-w) * 1.3);
	aspect-ratio: 1;
	border-radius: 50%;
	border: 3px solid ${theme.gold500};
	background: radial-gradient(
		circle at 50% 35%,
		${theme.blue500},
		${theme.purple500}
	);
	box-shadow: 0 4px 10px ${theme.shadowColor};
`;

export const Initials = styled.span`
	position: absolute;
	inset: 0;
	display: flex;
	align-items: flex-start;
	justify-content: center;
	padding-top: 8%;
	font-size: clamp(0.6rem, 2vh, 0.9rem);
	font-weight: 700;
	color: ${theme.textTertiary};
`;

export const Piles = styled.div`
	display: flex;
	gap: 8px;

	& > * {
		flex: 0 0 auto;
		width: calc(var(--card-w) + 12px);
	}
`;

export const Hand = styled.div`
	position: relative;
	z-index: 9;
	container-type: inline-size;
	min-width: 0;
	align-self: stretch;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	padding-bottom: calc(var(--hand-w) * 0.15);

	& > * {
		flex: 0 0 auto;
	}
`;

type FanItemProps = {
	$angle: string;
	$drop: string;
	$count: number;
};

export const FanItem = styled.span<FanItemProps>`
	position: relative;
	display: block;
	flex: 0 0 auto;
	margin-left: min(
		calc(var(--card-w) * -0.42),
		calc(
			(100cqw - var(--card-w) * 2) /
				${({ $count }) => Math.max($count - 1, 1)} - var(--card-w)
		)
	);
	transform: translateY(${({ $drop }) => $drop})
		rotate(${({ $angle }) => $angle});
	transform-origin: 50% 130%;
	transition: transform 0.15s ease-out;

	&:first-child {
		margin-left: 0;
	}

	&:hover,
	&:focus-within {
		z-index: 6;
		transform: translateY(-30%) scale(1.4);
	}
`;

export const End = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	gap: 6px;
`;

export const EndRow = styled.div`
	display: flex;
	align-items: flex-end;
	gap: 8px;
`;

export const Back = styled.div`
	width: var(--card-w);
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
	box-shadow:
		2px 2px 0 ${theme.purple500},
		4px 4px 0 ${theme.backgroundSecondary};
`;

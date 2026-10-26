import styled from "styled-components";
import { theme } from "@/styles/theme";

export const Dock = styled.section`
	--card-w: var(--hand-w);
	display: grid;
	grid-template-columns: auto auto minmax(0, 1fr) auto auto;
	align-items: stretch;
	gap: 4px 10px;
	min-width: 0;
	padding: 12px 8px 6px;
	border-radius: 12px;
	border: 1px solid ${theme.borderSubtle};
	background: ${theme.panelBg};
	user-select: none;
	-webkit-user-select: none;
`;

export const Hero = styled.div`
	padding: 0 4px;
	display: flex;
	flex-direction: column;
	align-items: stretch;
	gap: 14px;
`;

export const Portrait = styled.div`
	position: relative;
	box-sizing: border-box;
	flex: 1;
	min-height: 40px;
	width: calc(var(--hand-w) * 1.3);
	border-radius: 10px;
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

	@media (max-height: 599px) {
		display: none;
	}
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
	$lift: string;
	$count: number;
};

export const FanItem = styled.span<FanItemProps>`
	position: relative;
	display: block;
	flex: 0 0 auto;
	margin-left: min(
		calc(var(--card-w) * -0.25),
		calc(
			(100cqw - var(--card-w) * 2) /
				${({ $count }) => Math.max($count - 1, 1)} - var(--card-w)
		)
	);
	transform: translateY(${({ $lift }) => $lift})
		rotate(${({ $angle }) => $angle});
	transform-origin: 50% 130%;
	transition: transform 0.15s ease-out;

	&:first-child {
		margin-left: 0;
	}

	&:has(:focus-visible) {
		z-index: 6;
		transform: translateY(-30%) scale(1.4);
	}

	@media (hover: hover) and (pointer: fine) {
		&:hover {
			z-index: 6;
			transform: translateY(-30%) scale(1.4);
		}
	}
`;

export const CommandSlot = styled.div`
	align-self: end;
	padding: 18px 0 calc(var(--hand-w) * 0.15);

	[data-zone="command"] > span {
		top: -16px;
	}

	button {
		border: 3px solid ${theme.gold400};
		box-shadow: 0 0 8px ${theme.gold500};
	}
`;

export const End = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	align-self: start;
	gap: 6px;
`;

export const Back = styled.div`
	width: var(--card-w);
	height: 100%;
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

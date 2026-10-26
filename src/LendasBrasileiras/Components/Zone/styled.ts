import styled, { css } from "styled-components";
import { theme } from "@/styles/theme";

type Touch = "none" | "pan-x" | "auto";

type ContainerProps = {
	$area?: string;
	$highlighted: boolean;
	$touch: Touch;
	$fan: boolean;
};

export const Container = styled.div<ContainerProps>`
	position: relative;
	grid-area: ${({ $area }) => $area ?? "auto"};
	min-width: 0;
	min-height: 0;
	display: flex;
	flex-direction: column;
	gap: 2px;
	box-sizing: border-box;
	padding: 4px;
	border-radius: 8px;
	background: ${theme.cardBg};
	border: 1px dashed
		${({ $highlighted }) => ($highlighted ? theme.gold400 : theme.borderSubtle)};
	box-shadow: ${({ $highlighted }) =>
		$highlighted ? `0 0 0 2px ${theme.gold400}` : "none"};
	touch-action: ${({ $touch }) => $touch};

	${({ $fan, $highlighted }) =>
		$fan &&
		css`
			padding: 0;
			background: none;
			border-color: ${$highlighted ? theme.gold400 : "transparent"};
		`}
`;

export const Header = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 6px;
	font-size: 0.55rem;
	font-weight: 700;
	letter-spacing: 0.5px;
	text-transform: uppercase;
	color: ${theme.textTertiary};

	@media (max-height: 599px) {
		justify-content: center;
	}
`;

export const Label = styled.span<{ $always: boolean }>`
	@media (max-height: 599px) {
		display: ${({ $always }) => ($always ? "inline" : "none")};
	}
`;

export const Count = styled.span`
	position: absolute;
	top: -7px;
	right: -4px;
	z-index: 8;
	padding: 0 6px;
	border-radius: 8px;
	background: ${theme.backgroundSecondary};
	border: 1px solid ${theme.borderSubtle};
	color: ${theme.gold400};
	font-size: 0.65rem;
	font-weight: 700;
`;

export const Cards = styled.div<{
	$scroll: boolean;
	$touch: Touch;
	$pile: boolean;
	$fan: boolean;
}>`
	touch-action: ${({ $touch }) => $touch};
	display: flex;
	flex: 1;
	flex-wrap: ${({ $scroll, $fan }) => ($scroll || $fan ? "nowrap" : "wrap")};
	align-items: ${({ $fan }) => ($fan ? "flex-end" : "flex-start")};
	align-content: flex-start;
	justify-content: ${({ $pile, $fan }) =>
		$pile || $fan ? "center" : "flex-start"};
	gap: ${({ $fan }) => ($fan ? "0" : "4px")};
	min-height: ${({ $pile }) =>
		$pile ? "calc(var(--card-w, 64px) * 1.4)" : "0"};
	overflow-x: ${({ $scroll, $fan }) =>
		$fan ? "visible" : $scroll ? "auto" : "hidden"};
	overflow-y: ${({ $scroll, $fan }) =>
		$fan ? "visible" : $scroll ? "hidden" : "auto"};
	overscroll-behavior: contain;
`;

import styled from "styled-components";
import { theme } from "@/styles/theme";

type ContainerProps = {
	$area: string;
	$highlighted: boolean;
	$touch: "none" | "pan-x" | "auto";
};

export const Container = styled.div<ContainerProps>`
	grid-area: ${({ $area }) => $area};
	min-width: 0;
	display: flex;
	flex-direction: column;
	gap: 4px;
	box-sizing: border-box;
	padding: 6px;
	border-radius: 8px;
	background: ${theme.cardBg};
	border: 1px dashed
		${({ $highlighted }) => ($highlighted ? theme.gold400 : theme.borderSubtle)};
	box-shadow: ${({ $highlighted }) =>
		$highlighted ? `0 0 0 2px ${theme.gold400}` : "none"};
	touch-action: ${({ $touch }) => $touch};
`;

export const Header = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 6px;
	font-size: 0.65rem;
	font-weight: 700;
	letter-spacing: 0.5px;
	text-transform: uppercase;
	color: ${theme.textTertiary};
`;

export const Count = styled.span`
	padding: 0 6px;
	border-radius: 8px;
	background: ${theme.backgroundSecondary};
	color: ${theme.gold400};
`;

export const Cards = styled.div<{
	$scroll: boolean;
	$touch: "none" | "pan-x" | "auto";
}>`
	touch-action: ${({ $touch }) => $touch};
	display: flex;
	flex-wrap: ${({ $scroll }) => ($scroll ? "nowrap" : "wrap")};
	align-items: flex-start;
	align-content: flex-start;
	gap: 6px;
	min-height: calc(var(--card-w, 64px) * 1.4 + 4px);
	padding: 2px 0;
	overflow-x: ${({ $scroll }) => ($scroll ? "auto" : "visible")};
	overscroll-behavior-x: contain;
`;

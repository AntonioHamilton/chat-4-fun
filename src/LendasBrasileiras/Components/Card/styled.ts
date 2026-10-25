import styled from "styled-components";
import { theme } from "@/styles/theme";

type RootProps = {
	$color: string;
	$tapped: boolean;
	$dragging: boolean;
	$large: boolean;
};

export const Root = styled.button<RootProps>`
	position: relative;
	flex: 0 0 auto;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	box-sizing: border-box;
	width: ${({ $large }) => ($large ? "180px" : "var(--card-w, 64px)")};
	aspect-ratio: 5 / 7;
	padding: 0;
	overflow: hidden;
	border-radius: 6px;
	border: 2px solid ${theme.gold500};
	background: ${({ $color }) => $color};
	color: ${theme.textPrimary};
	font: inherit;
	text-align: left;
	cursor: ${({ $large }) => ($large ? "default" : "grab")};
	user-select: none;
	-webkit-user-select: none;
	-webkit-touch-callout: none;
	opacity: ${({ $dragging }) => ($dragging ? 0.35 : 1)};
	transform: ${({ $tapped }) => ($tapped ? "rotate(90deg)" : "none")};
	margin: ${({ $tapped }) =>
		$tapped ? "0 calc(var(--card-w, 64px) * 0.2)" : "0"};
	transition: transform 0.15s ease-out;

	&:focus-visible {
		outline: 2px solid ${theme.gold400};
		outline-offset: 2px;
	}
`;

export const Name = styled.span`
	display: block;
	padding: 3px 4px;
	background: ${theme.overlayBg};
	font-size: 0.6rem;
	font-weight: 700;
	line-height: 1.1;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
`;

export const Body = styled.span<{ $large: boolean; $darkText: boolean }>`
	display: block;
	flex: 1;
	padding: 4px;
	font-size: ${({ $large }) => ($large ? "0.8rem" : "0.55rem")};
	line-height: 1.2;
	color: ${({ $darkText }) =>
		$darkText ? theme.backgroundPrimary : "inherit"};
	opacity: 0.9;
`;

export const Footer = styled.span`
	display: flex;
	justify-content: space-between;
	gap: 4px;
	padding: 3px 4px;
	background: ${theme.overlayBg};
	font-size: 0.6rem;
	font-weight: 700;
`;

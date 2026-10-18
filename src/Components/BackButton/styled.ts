import Link from "next/link";
import styled, { css } from "styled-components";
import { theme } from "@/styles/theme";

type Tone = "dark" | "light";

const backStyles = css<{ $tone: Tone }>`
	display: inline-flex;
	align-items: center;
	gap: 6px;
	padding: 8px 16px 8px 10px;
	font: inherit;
	font-size: 14px;
	font-weight: 600;
	text-decoration: none;
	cursor: pointer;
	border-radius: 10px;
	color: ${({ $tone }) => ($tone === "light" ? "#2a2a33" : theme.textPrimary)};
	background: ${({ $tone }) =>
		$tone === "light" ? "rgba(0, 0, 0, 0.05)" : theme.cardBg};
	border: 1px solid
		${({ $tone }) =>
			$tone === "light" ? "rgba(0, 0, 0, 0.15)" : theme.borderSubtle};
	transition:
		background 0.15s ease,
		color 0.15s ease;

	svg {
		width: 18px;
		height: 18px;
	}

	&:hover {
		background: ${({ $tone }) =>
			$tone === "light" ? "rgba(0, 0, 0, 0.1)" : theme.cardBgHover};
		color: ${({ $tone }) => ($tone === "light" ? "#8a5d00" : theme.gold400)};
	}

	&:focus-visible {
		outline: 3px solid rgba(242, 201, 76, 0.5);
		outline-offset: 2px;
	}
`;

export const BackAnchor = styled(Link)<{ $tone: Tone }>`
	${backStyles}
`;

export const BackAction = styled.button<{ $tone: Tone }>`
	${backStyles}
`;

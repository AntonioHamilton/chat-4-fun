import styled from "styled-components";
import { theme } from "@/styles/theme";

export const Container = styled.div`
	display: inline-flex;
	align-items: center;
	gap: 6px;
`;

export const Value = styled.span`
	min-width: 2.2ch;
	text-align: center;
	font-size: 1.3rem;
	font-weight: 700;
	color: ${theme.gold400};
`;

export const Button = styled.button`
	width: 32px;
	height: 32px;
	border-radius: 50%;
	border: 1px solid ${theme.borderSubtle};
	background: ${theme.cardBg};
	color: ${theme.textPrimary};
	font-size: 1.1rem;
	cursor: pointer;

	&:hover {
		background: ${theme.cardBgHover};
	}

	&:focus-visible {
		outline: 2px solid ${theme.gold400};
	}
`;

import styled from "styled-components";
import { breakpoints } from "@/styles/breakpoints";
import { theme } from "@/styles/theme";

export const Container = styled.aside`
	position: fixed;
	z-index: 40;
	right: 12px;
	bottom: 12px;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 8px;
	padding: 12px;
	border-radius: 12px;
	border: 1px solid ${theme.borderSubtle};
	background: ${theme.backgroundSecondary};
	box-shadow: 0 12px 30px ${theme.shadowColor};
	pointer-events: none;

	@media (min-width: ${breakpoints.md}) {
		bottom: auto;
		top: 90px;
	}
`;

export const CloseButton = styled.button`
	padding: 6px 14px;
	border-radius: 4px;
	border: 1px solid ${theme.gold500};
	background: transparent;
	color: ${theme.gold400};
	font-size: 0.75rem;
	font-weight: 700;
	cursor: pointer;
	pointer-events: auto;

	&:focus-visible {
		outline: 2px solid ${theme.gold400};
	}
`;

import styled from "styled-components";
import { breakpoints } from "@/styles/breakpoints";
import { theme } from "@/styles/theme";

export const Container = styled.aside`
	display: none;

	@media (min-width: ${breakpoints.lg}) {
		display: block;
		align-self: start;
		position: sticky;
		top: 12px;
		padding: 12px;
		border-radius: 12px;
		border: 1px solid ${theme.borderSubtle};
		background: ${theme.panelBg};
	}
`;

export const Title = styled.h2`
	margin: 0 0 8px;
	font-size: 0.8rem;
	letter-spacing: 1px;
	text-transform: uppercase;
	color: ${theme.gold400};
`;

export const List = styled.ol`
	margin: 0;
	padding: 0;
	list-style: none;
	display: flex;
	flex-direction: column;
	gap: 4px;
	font-size: 0.75rem;
	color: ${theme.textSecondary};
`;

import styled from "styled-components";
import { theme } from "@/styles/theme";

export const Container = styled.aside`
	box-sizing: border-box;
	height: 100%;
	overflow-y: auto;
	padding: 12px;
	border-radius: 12px;
	border: 1px solid ${theme.borderSubtle};
	background: ${theme.panelBgSoft};
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

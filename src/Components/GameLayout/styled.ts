import styled from "styled-components";
import { theme } from "@/styles/theme";

export const Page = styled.div<{ $background: string; $light: boolean }>`
	position: relative;
	width: 100%;
	min-height: 100vh;
	@supports (height: 100dvh) {
		min-height: 100dvh;
	}
	padding: 24px 20px 48px;
	display: flex;
	flex-direction: column;
	gap: 20px;
	overflow-x: hidden;
	color: ${({ $light }) => ($light ? "#000" : theme.textPrimary)};
	background: ${({ $background }) => $background};
`;

export const TopBar = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: 12px;
`;

export const Main = styled.main`
	flex: 1;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 20px;
`;

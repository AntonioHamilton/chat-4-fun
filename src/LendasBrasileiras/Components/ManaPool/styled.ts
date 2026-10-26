import styled from "styled-components";
import { theme } from "@/styles/theme";

export const Container = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-end;
	align-items: center;
	gap: 4px;
	min-height: 26px;
`;

export const Circle = styled.span<{ $color: string }>`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	box-sizing: border-box;
	width: 26px;
	height: 26px;
	border-radius: 50%;
	border: 2px solid ${theme.gold500};
	background: ${({ $color }) => $color};
	color: ${theme.textPrimary};
	font-size: 0.8rem;
	font-weight: 700;
	text-shadow: 0 1px 2px ${theme.shadowColor};
`;

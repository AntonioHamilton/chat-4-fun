import styled from "styled-components";
import { theme } from "@/styles/theme";

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	justify-content: flex-start;
	align-content: flex-end;
	max-height: 100%;
	gap: 4px;
	min-height: 26px;

	@media (max-height: 599px) {
		gap: 2px;
	}
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

	@media (max-height: 599px) {
		width: 20px;
		height: 20px;
		font-size: 0.65rem;
	}
`;

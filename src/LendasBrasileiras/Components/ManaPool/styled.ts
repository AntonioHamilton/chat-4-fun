import styled from "styled-components";
import { theme } from "@/styles/theme";

export const Container = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: 6px;
	font-size: 0.75rem;
	color: ${theme.textSecondary};
`;

export const Chip = styled.span<{ $color: string }>`
	padding: 2px 8px;
	border-radius: 10px;
	background: ${({ $color }) => $color};
	color: ${theme.textPrimary};
	font-weight: 700;
`;

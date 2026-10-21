import styled from "styled-components";
import { breakpoints } from "@/styles/breakpoints";
import { theme } from "@/styles/theme";

export const TopBar = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 12px;
	width: 100%;
	max-width: 520px;
	margin: 0 auto;
	padding: 12px 20px;
	background: ${theme.panelBg};
	border: 1px solid ${theme.borderSubtle};
	border-radius: 16px;
`;

export const Timer = styled.span<{ $urgent: boolean }>`
	font-size: 20px;
	font-weight: 800;
	font-variant-numeric: tabular-nums;
	color: ${({ $urgent }) => ($urgent ? "#ff6b6b" : theme.textPrimary)};
`;

export const Flag = styled.span`
	display: block;
	margin: 0 auto 20px;
	font-size: min(200px, 55vw);
	border-radius: 8px;
	box-shadow: 0 12px 30px ${theme.shadowColor};

	@media (max-width: ${breakpoints.md}) {
		margin-bottom: 14px;
	}
`;

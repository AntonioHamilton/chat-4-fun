import styled from "styled-components";
import { breakpoints } from "@/styles/breakpoints";
import { theme } from "@/styles/theme";
import { Panel } from "@/styles/guess-country.styled";

export const TopBar = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 6px;
	width: 100%;
	max-width: 520px;
	margin: 0 auto;
	padding: 12px 20px;
	background: ${theme.panelBg};
	border: 1px solid ${theme.borderSubtle};
	border-radius: 16px;
`;

export const ScoreBlock = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 2px;
	text-align: center;
`;

export const ScoreLabel = styled.span`
	font-size: 12px;
	font-weight: 700;
	letter-spacing: 0.18em;
	text-transform: uppercase;
	color: ${theme.textTertiary};
`;

export const ScoreValue = styled.span`
	font-family: "Archivo Black", sans-serif;
	font-size: 44px;
	line-height: 1;
	color: ${theme.gold400};
	font-variant-numeric: tabular-nums;

	@media (max-width: ${breakpoints.md}) {
		font-size: 36px;
	}
`;

export const Timer = styled.span<{ $urgent: boolean }>`
	font-family: "Archivo Black", sans-serif;
	font-size: 28px;
	font-variant-numeric: tabular-nums;
	color: ${({ $urgent }) => ($urgent ? "#ff6b6b" : theme.textPrimary)};
`;

export const Stage = styled.div`
	position: relative;
	overflow: hidden;
	max-width: 420px;
	margin: 0 auto 20px;
	border-radius: 8px;

	@media (max-width: ${breakpoints.md}) {
		margin-bottom: 14px;
	}
`;

export const Flag = styled.span`
	display: block;
	margin: 0 auto;
	font-size: min(200px, 55vw);
	border-radius: 8px;
	box-shadow: 0 12px 30px ${theme.shadowColor};
`;

export const Card = styled(Panel)`
	width: 100%;
	max-width: 520px;
	margin: 0 auto;
`;

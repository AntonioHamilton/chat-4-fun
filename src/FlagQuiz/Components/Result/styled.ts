import styled from "styled-components";
import { Panel } from "@/styles/guess-country.styled";
import * as FlagSC from "@/styles/flag-quiz.styled";
import { theme } from "@/styles/theme";

export const Points = styled(FlagSC.Score)`
	margin: 20px 0 16px;
`;

export const Card = styled(Panel)`
	width: 100%;
	max-width: 520px;
	margin: 0 auto;
`;

export const Flag = styled.span`
	display: block;
	margin: 0 auto 12px;
	font-size: min(160px, 50vw);
	border-radius: 8px;
	box-shadow: 0 12px 30px ${theme.shadowColor};
`;

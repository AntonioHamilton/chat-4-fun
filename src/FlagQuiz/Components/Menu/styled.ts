import styled from "styled-components";
import { theme } from "@/styles/theme";

export const Hero = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 10px;
	text-align: center;
`;

export const Hint = styled.p`
	margin: -6px 0 6px;
	font-size: 13px;
	text-align: center;
	color: ${theme.textTertiary};
`;

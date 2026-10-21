import styled from "styled-components";
import { theme } from "@/styles/theme";

export const Toast = styled.div`
	position: fixed;
	left: 50%;
	bottom: 24px;
	transform: translateX(-50%);
	z-index: 100;
	max-width: calc(100% - 32px);
	padding: 12px 18px;
	font-size: 14px;
	text-align: center;
	color: #ffb3b3;
	background: ${theme.panelBg};
	border: 1px solid #ff9b9b;
	border-radius: 10px;
	box-shadow: 0 10px 24px ${theme.shadowColor};
`;

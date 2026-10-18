import styled, { keyframes } from "styled-components";
import { theme } from "@/styles/theme";

const step = keyframes`
	0%, 100% { transform: translateY(0) rotate(-3deg); }
	50% { transform: translateY(-5px) rotate(3deg); }
`;

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 14px;
	padding: 24px 0;
`;

export const Lane = styled.div`
	position: relative;
	width: min(280px, 80vw);
	height: 40px;
`;

export const Flag = styled.img`
	position: absolute;
	bottom: 0;
	width: 40px;
	height: 28px;
	object-fit: cover;
	border-radius: 4px;
	box-shadow: 0 2px 6px ${theme.shadowColor};
	animation: ${step} 0.35s ease-in-out infinite;

	@media (prefers-reduced-motion: reduce) {
		animation: none;
	}
`;

export const Track = styled.div`
	width: min(280px, 80vw);
	height: 8px;
	overflow: hidden;
	border-radius: 999px;
	background: ${theme.cardBg};
	border: 1px solid ${theme.borderSubtle};
`;

export const Fill = styled.div`
	height: 100%;
	border-radius: 999px;
	background: linear-gradient(90deg, ${theme.gold500}, ${theme.gold400});
`;

export const Label = styled.p`
	color: ${theme.textSecondary};
	text-align: center;
`;

export const Hint = styled.p`
	max-width: 320px;
	font-size: 13px;
	text-align: center;
	color: ${theme.textTertiary};
`;

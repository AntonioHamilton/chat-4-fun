import styled from "styled-components";
import { breakpoints } from "@/styles/breakpoints";
import { PrimaryButton } from "@/styles/guess-country.styled";
import { theme } from "@/styles/theme";

export const Hero = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 10px;
	text-align: center;
`;

export const Mascot = styled.img`
	width: min(220px, 60vw);
	height: auto;
`;

export const Title = styled.h1`
	margin: 0;
	font-size: 44px;
	color: ${theme.gold400};
	text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);

	@media (max-width: ${breakpoints.md}) {
		font-size: 30px;
	}
`;

export const Subtitle = styled.p`
	margin: 0;
	max-width: 520px;
	color: ${theme.textTertiary};
`;

export const BackRow = styled.div`
	display: flex;
	justify-content: center;
`;

export const Options = styled.div`
	display: flex;
	flex-direction: column;
	gap: 12px;
	width: 100%;
	max-width: 420px;
	margin: 0 auto;
`;

export const ModeButton = styled(PrimaryButton)`
	position: relative;
	padding-left: 44px;
	padding-right: 44px;

	&:hover,
	&:focus-visible {
		z-index: 5;
	}
`;

export const InfoIcon = styled.span`
	position: absolute;
	top: 50%;
	right: 14px;
	transform: translateY(-50%);
	width: 18px;
	height: 18px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-family: serif;
	font-size: 12px;
	font-style: italic;
	font-weight: 800;
	line-height: 1;
	border: 1.5px solid currentColor;
	border-radius: 50%;
	opacity: 0.75;

	&:hover {
		opacity: 1;
	}
`;

export const Tooltip = styled.span`
	position: absolute;
	top: calc(100% + 10px);
	right: -6px;
	z-index: 10;
	width: 240px;
	padding: 10px 12px;
	font-family: sans-serif;
	font-size: 13px;
	font-style: normal;
	font-weight: 500;
	line-height: 1.4;
	text-align: left;
	color: ${theme.textPrimary};
	background: #0b0b12;
	border-radius: 10px;
	box-shadow: 0 10px 24px ${theme.shadowColor};
	pointer-events: none;

	&::before {
		content: "";
		position: absolute;
		bottom: 100%;
		right: 12px;
		border: 7px solid transparent;
		border-bottom-color: #0b0b12;
	}
`;

export const SectionTitle = styled.h2`
	margin: 0;
	font-size: 14px;
	letter-spacing: 0.1em;
	text-transform: uppercase;
	color: ${theme.gold400};
	text-align: center;
`;

export const CodeBox = styled.div`
	padding: 16px;
	text-align: center;
	font-size: 40px;
	font-weight: 800;
	letter-spacing: 0.3em;
	color: ${theme.gold400};
	background: ${theme.cardBg};
	border: 1px dashed ${theme.gold400};
	border-radius: 12px;
`;

export const CodeInput = styled.input`
	width: 100%;
	padding: 14px 16px;
	font-size: 22px;
	font-weight: 700;
	letter-spacing: 0.3em;
	text-align: center;
	text-transform: uppercase;
	color: ${theme.textPrimary};
	background: ${theme.cardBg};
	border: 1px solid ${theme.borderSubtle};
	border-radius: 10px;
	outline: none;

	&:focus {
		border-color: ${theme.gold400};
	}
`;

export const Message = styled.p<{ $error?: boolean }>`
	margin: 0;
	text-align: center;
	color: ${({ $error }) => ($error ? "#ff9b9b" : theme.textSecondary)};
`;

import styled from "styled-components";
import { breakpoints } from "./breakpoints";
import { GhostButton, PrimaryButton } from "./guess-country.styled";
import { theme } from "./theme";

export const Column = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 12px;
	width: 100%;
	max-width: 520px;
	margin: 0 auto;
`;

export const Title = styled.h1`
	margin: 0;
	font-size: 44px;
	text-align: center;
	color: ${theme.gold400};
	text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);

	@media (max-width: ${breakpoints.md}) {
		font-size: 30px;
	}
`;

export const Subtitle = styled.p`
	margin: 0;
	text-align: center;
	color: ${theme.textTertiary};
`;

export const SectionTitle = styled.h2`
	margin: 0;
	font-size: 14px;
	letter-spacing: 0.1em;
	text-transform: uppercase;
	color: ${theme.gold400};
	text-align: center;
`;

export const Score = styled.p`
	margin: 0;
	font-size: 24px;
	font-weight: 800;
	color: ${theme.gold400};
	text-align: center;
`;

export const Message = styled.p`
	margin: 0;
	text-align: center;
	color: ${theme.textSecondary};

	strong {
		color: ${theme.textPrimary};
	}
`;

export const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: 12px;
	width: 100%;
`;

export const Label = styled.label`
	font-size: 13px;
	color: ${theme.textTertiary};
`;

export const Input = styled.input`
	width: 100%;
	padding: 14px 16px;
	font-size: 18px;
	color: ${theme.textPrimary};
	background: ${theme.cardBg};
	border: 1px solid ${theme.borderSubtle};
	border-radius: 10px;
	outline: none;

	&:focus {
		border-color: ${theme.gold400};
	}
`;

export const SubmitButton = styled(PrimaryButton)`
	width: 100%;
`;

export const WideGhostButton = styled(GhostButton)`
	width: 100%;
	margin-top: 12px;
`;

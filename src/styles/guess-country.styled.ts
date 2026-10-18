import styled, { css } from "styled-components";
import { breakpoints } from "./breakpoints";
import { theme } from "./theme";

export const pageBackground = `
	radial-gradient(circle at 20% 0%, rgba(242, 201, 76, 0.12), transparent 45%),
	radial-gradient(circle at 85% 40%, rgba(58, 55, 166, 0.35), transparent 50%),
	linear-gradient(
		180deg,
		${theme.backgroundPrimary},
		${theme.backgroundSecondary} 50%,
		${theme.backgroundPrimary}
	)
`;

export const Panel = styled.section`
	background: ${theme.panelBg};
	border: 1px solid ${theme.borderSubtle};
	border-radius: 16px;
	padding: 20px;
	box-shadow: 0 12px 30px ${theme.shadowColor};

	@media (max-width: ${breakpoints.md}) {
		padding: 14px;
	}
`;

export const PanelTitle = styled.h2`
	margin: 0 0 14px;
	font-size: 13px;
	font-weight: 700;
	letter-spacing: 0.12em;
	text-transform: uppercase;
	color: ${theme.gold400};
`;

const buttonBase = css`
	padding: 12px 22px;
	font-size: 15px;
	font-weight: 700;
	border-radius: 10px;
	cursor: pointer;
	transition:
		transform 0.15s ease,
		opacity 0.15s ease,
		background 0.15s ease;

	&:hover:not(:disabled) {
		transform: translateY(-1px);
	}

	&:disabled {
		opacity: 0.45;
		cursor: not-allowed;
	}

	&:focus-visible {
		outline: 3px solid rgba(242, 201, 76, 0.5);
		outline-offset: 2px;
	}
`;

export const PrimaryButton = styled.button`
	${buttonBase}
	color: ${theme.backgroundPrimary};
	background: linear-gradient(135deg, ${theme.gold400}, ${theme.gold500});
	border: none;
`;

export const GhostButton = styled.button`
	${buttonBase}
	color: ${theme.textPrimary};
	background: ${theme.cardBg};
	border: 1px solid ${theme.borderSubtle};

	&:hover:not(:disabled) {
		background: ${theme.cardBgHover};
	}
`;

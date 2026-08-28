import { css } from "styled-components";
import { theme } from "./theme";

export const storePanel = css`
	background-color: ${theme.cardBg};
	border: 1px solid ${theme.borderSubtle};
	border-radius: 4px;
	box-shadow: 0 2px 8px ${theme.shadowColor};
`;

export const storePanelHoverable = css`
	${storePanel};
	transition:
		background-color 0.2s ease-out,
		border-color 0.2s ease-out,
		transform 0.2s ease-out;

	&:hover {
		background-color: ${theme.cardBgHover};
		border-color: ${theme.gold500};
		transform: translateY(-3px);
	}
`;

export const storeTag = css`
	display: inline-flex;
	align-items: center;
	padding: 5px 12px;
	border-radius: 3px;
	background-color: ${theme.backgroundSecondary};
	border: 1px solid rgba(242, 201, 76, 0.4);
	color: ${theme.gold400};
	font-size: 0.8rem;
	font-weight: 500;
`;

export const storeButton = css`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	gap: 8px;
	padding: 12px 28px;
	border-radius: 3px;
	border: none;
	background-color: ${theme.gold500};
	color: ${theme.backgroundPrimary};
	font-weight: 700;
	line-height: 1;
	cursor: pointer;
	transition:
		filter 0.15s ease-out,
		transform 0.15s ease-out;

	&:hover {
		filter: brightness(1.1);
		transform: translateY(-1px);
	}
`;

export const sectionHeading = css`
	font-size: 0.85rem;
	font-weight: 700;
	letter-spacing: 1.5px;
	text-transform: uppercase;
	color: ${theme.gold400};
	margin-bottom: 24px;
`;

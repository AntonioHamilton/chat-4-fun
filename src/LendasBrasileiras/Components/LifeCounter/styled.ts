import styled, { css } from "styled-components";
import { theme } from "@/styles/theme";

type Variant = "inline" | "portrait";

export const Container = styled.div<{ $variant: Variant }>`
	display: inline-flex;
	align-items: center;
	gap: 6px;

	${({ $variant }) =>
		$variant === "portrait" &&
		css`
			position: absolute;
			inset: 0;
			display: grid;
			grid-template-columns: auto 1fr auto;
			grid-template-rows: 1fr auto;
			grid-template-areas: "value value value" "minus . plus";
			align-items: end;
			--life-btn: 24px;
			padding: 2px;
			gap: 0;
		`}
`;

export const Value = styled.span<{ $variant: Variant }>`
	min-width: 2.2ch;
	text-align: center;
	font-size: 1.3rem;
	font-weight: 700;
	color: ${theme.gold400};

	${({ $variant }) =>
		$variant === "portrait" &&
		css`
			grid-area: value;
			align-self: center;
			margin-top: 20%;
			font-size: clamp(1.6rem, 6vh, 2.6rem);
			line-height: 1;
			color: ${theme.textPrimary};
			text-shadow:
				0 0 6px ${theme.backgroundPrimary},
				0 2px 4px ${theme.backgroundPrimary};
		`}
`;

export const Button = styled.button`
	width: var(--life-btn, 32px);
	height: var(--life-btn, 32px);
	border-radius: 50%;
	border: 1px solid ${theme.borderSubtle};
	background: ${theme.cardBg};
	color: ${theme.textPrimary};
	font-size: 1.1rem;
	cursor: pointer;

	&:hover {
		background: ${theme.cardBgHover};
	}

	&:focus-visible {
		outline: 2px solid ${theme.gold400};
	}

	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	[aria-label="Vida"] > &:first-child {
		grid-area: minus;
	}

	[aria-label="Vida"] > &:last-child {
		grid-area: plus;
	}
`;

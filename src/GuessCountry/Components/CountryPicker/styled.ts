import styled from "styled-components";
import { breakpoints } from "@/styles/breakpoints";
import { theme } from "@/styles/theme";

export const Hint = styled.p`
	margin: 0 0 14px;
	color: ${theme.textTertiary};
	font-size: 14px;
`;

export const Slots = styled.ol`
	list-style: none;
	margin: 18px 0;
	padding: 0;
	display: flex;
	flex-direction: column;
	gap: 8px;
`;

export const Slot = styled.li<{
	$state: "empty" | "draft" | "confirmed";
	$over: boolean;
}>`
	display: flex;
	align-items: center;
	gap: 12px;
	min-height: 52px;
	padding: 8px 14px;
	border-radius: 10px;
	border: 1px ${({ $state }) => ($state === "empty" ? "dashed" : "solid")}
		${({ $state }) =>
			$state === "confirmed" ? theme.gold400 : theme.borderSubtle};
	background: ${({ $state }) =>
		$state === "confirmed" ? "rgba(242, 201, 76, 0.1)" : theme.cardBg};
	color: ${({ $state }) =>
		$state === "empty" ? theme.textTertiary : theme.textPrimary};
	cursor: ${({ $state }) => ($state === "empty" ? "default" : "grab")};
	outline: ${({ $over }) => ($over ? `2px solid ${theme.gold400}` : "none")};

	@media (max-width: ${breakpoints.sm}) {
		flex-wrap: wrap;
	}
`;

export const SlotIndex = styled.span`
	flex: none;
	width: 24px;
	font-weight: 700;
	color: ${theme.gold400};
`;

export const Grip = styled.span`
	flex: none;
	color: ${theme.textTertiary};
	font-size: 18px;
	line-height: 1;
	user-select: none;
`;

export const SlotName = styled.span`
	flex: 1;
	font-weight: 600;
`;

export const SlotActions = styled.div`
	display: flex;
	gap: 8px;
`;

export const SmallButton = styled.button<{ $variant?: "confirm" | "remove" }>`
	padding: 6px 12px;
	font-size: 13px;
	font-weight: 700;
	border-radius: 8px;
	cursor: pointer;
	color: ${({ $variant }) =>
		$variant === "confirm" ? theme.backgroundPrimary : theme.textPrimary};
	background: ${({ $variant }) =>
		$variant === "confirm" ? theme.gold400 : "transparent"};
	border: 1px solid
		${({ $variant }) =>
			$variant === "confirm" ? theme.gold400 : theme.borderSubtle};

	&:disabled {
		opacity: 0.35;
		cursor: not-allowed;
	}

	&:focus-visible {
		outline: 3px solid rgba(242, 201, 76, 0.5);
		outline-offset: 2px;
	}
`;

export const Footer = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 12px;
	justify-content: space-between;
`;

export const Status = styled.p`
	margin: 0;
	text-align: center;
	color: ${theme.textSecondary};
`;

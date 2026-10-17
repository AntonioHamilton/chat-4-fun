import styled from "styled-components";
import { theme } from "@/styles/theme";

export const Wrapper = styled.div`
	position: relative;
	width: 100%;
`;

export const Input = styled.input`
	width: 100%;
	padding: 14px 16px;
	font-size: 16px;
	color: ${theme.textPrimary};
	background: ${theme.cardBg};
	border: 1px solid ${theme.borderSubtle};
	border-radius: 10px;
	outline: none;

	&::placeholder {
		color: ${theme.textTertiary};
	}

	&:focus {
		border-color: ${theme.gold400};
		box-shadow: 0 0 0 3px rgba(242, 201, 76, 0.2);
	}

	&:disabled {
		opacity: 0.5;
	}
`;

export const List = styled.ul`
	position: absolute;
	top: calc(100% + 6px);
	left: 0;
	right: 0;
	z-index: 20;
	max-height: 200px;
	overflow-y: auto;
	margin: 0;
	padding: 6px;
	list-style: none;
	background: ${theme.backgroundSecondary};
	border: 1px solid ${theme.borderSubtle};
	border-radius: 10px;
	box-shadow: 0 12px 30px ${theme.shadowColor};
`;

export const Option = styled.li<{ $active: boolean }>`
	padding: 10px 12px;
	cursor: pointer;
	color: ${theme.textPrimary};
	border-radius: 6px;
	background: ${({ $active }) => ($active ? theme.cardBgHover : "transparent")};

	&:hover {
		background: ${theme.cardBgHover};
	}
`;

export const Empty = styled.li`
	padding: 10px 12px;
	color: ${theme.textTertiary};
`;

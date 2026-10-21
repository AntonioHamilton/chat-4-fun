import styled from "styled-components";
import { theme } from "@/styles/theme";

export const TableWrapper = styled.div`
	width: 100%;
	overflow-x: auto;
`;

export const Tabs = styled.div`
	display: flex;
	gap: 8px;
	width: 100%;
	padding: 4px;
	background: ${theme.cardBg};
	border: 1px solid ${theme.borderSubtle};
	border-radius: 12px;
`;

export const Tab = styled.button<{ $active: boolean }>`
	flex: 1;
	padding: 10px 12px;
	font-size: 14px;
	font-weight: 700;
	color: ${({ $active }) =>
		$active ? theme.backgroundPrimary : theme.textSecondary};
	background: ${({ $active }) =>
		$active
			? `linear-gradient(135deg, ${theme.gold400}, ${theme.gold500})`
			: "none"};
	border: none;
	border-radius: 9px;
	cursor: pointer;

	&:focus-visible {
		outline: 3px solid rgba(242, 201, 76, 0.5);
		outline-offset: 2px;
	}
`;

export const Table = styled.table`
	width: 100%;
	border-collapse: collapse;
	font-size: 14px;
	color: ${theme.textPrimary};

	th,
	td {
		padding: 8px 10px;
		text-align: left;
		border-bottom: 1px solid ${theme.borderSubtle};
	}

	th {
		color: ${theme.gold400};
		font-weight: 700;
	}
`;

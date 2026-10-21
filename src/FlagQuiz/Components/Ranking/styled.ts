import styled from "styled-components";
import { theme } from "@/styles/theme";

export const TableWrapper = styled.div`
	width: 100%;
	overflow-x: auto;
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

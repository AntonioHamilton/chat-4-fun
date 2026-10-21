import styled from "styled-components";
import { breakpoints } from "@/styles/breakpoints";
import { theme } from "@/styles/theme";

export const Tabs = styled.div`
	display: flex;
	align-self: center;
	gap: 4px;
	padding: 4px;
	background: ${theme.cardBg};
	border: 1px solid ${theme.borderSubtle};
	border-radius: 999px;
`;

export const Tab = styled.button<{ $active: boolean }>`
	padding: 9px 20px;
	font-size: 14px;
	font-weight: 700;
	color: ${({ $active }) => ($active ? theme.textPrimary : theme.textTertiary)};
	background: ${({ $active }) => ($active ? theme.cardBgHover : "none")};
	border: 1px solid
		${({ $active }) => ($active ? theme.borderSubtle : "transparent")};
	border-radius: 999px;
	cursor: pointer;

	&:focus-visible {
		outline: 3px solid rgba(242, 201, 76, 0.5);
		outline-offset: 2px;
	}
`;

export const Podium = styled.ol`
	display: flex;
	align-items: flex-end;
	justify-content: center;
	gap: 12px;
	width: 100%;
	margin: 8px 0 32px;
	padding: 0;
	list-style: none;

	@media (max-width: ${breakpoints.md}) {
		gap: 6px;
	}
`;

export const PodiumSlot = styled.li<{ $place: number }>`
	display: flex;
	flex: 1;
	flex-direction: column;
	align-items: center;
	gap: 6px;
	max-width: 150px;
	margin-bottom: ${({ $place }) => ($place === 1 ? "24px" : "0")};
	text-align: center;
`;

export const Avatar = styled.span<{ $color: string; $size: number }>`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	width: ${({ $size }) => $size}px;
	height: ${({ $size }) => $size}px;
	font-size: ${({ $size }) => Math.round($size * 0.38)}px;
	font-weight: 800;
	color: #ffffff;
	background: ${({ $color }) => $color};
	border-radius: 50%;
`;

export const Medal = styled.span<{ $color: string }>`
	position: absolute;
	right: -4px;
	bottom: -4px;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 22px;
	height: 22px;
	font-size: 12px;
	font-weight: 800;
	color: #1a1a2e;
	background: ${({ $color }) => $color};
	border: 2px solid ${theme.backgroundSecondary};
	border-radius: 50%;
`;

export const PodiumName = styled.span`
	max-width: 100%;
	overflow: hidden;
	font-size: 14px;
	font-weight: 700;
	color: ${theme.textPrimary};
	text-overflow: ellipsis;
	white-space: nowrap;
`;

export const PodiumScore = styled.span`
	font-family: "Archivo Black", sans-serif;
	font-size: 22px;
	color: ${theme.gold400};
`;

export const RowList = styled.ol`
	display: flex;
	flex-direction: column;
	gap: 8px;
	width: 100%;
	margin: 0;
	padding: 0;
	list-style: none;
`;

export const Row = styled.li`
	display: flex;
	align-items: center;
	gap: 12px;
	padding: 10px 16px;
	background: ${theme.panelBg};
	border: 1px solid ${theme.borderSubtle};
	border-radius: 14px;
`;

export const RowPosition = styled.span`
	width: 28px;
	font-size: 14px;
	font-weight: 700;
	text-align: center;
	color: ${theme.textTertiary};
`;

export const RowInfo = styled.div`
	display: flex;
	flex: 1;
	flex-direction: column;
	min-width: 0;
`;

export const RowName = styled.span`
	overflow: hidden;
	font-size: 15px;
	font-weight: 700;
	color: ${theme.textPrimary};
	text-overflow: ellipsis;
	white-space: nowrap;
`;

export const RowDate = styled.span`
	font-size: 12px;
	color: ${theme.textTertiary};
`;

export const RowScore = styled.span`
	font-family: "Archivo Black", sans-serif;
	font-size: 20px;
	color: ${theme.gold400};
`;

import styled from "styled-components";
import { storeButton } from "@/styles/mixins";
import { theme } from "@/styles/theme";

export const Container = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 20px;
	width: 100%;
	max-width: 520px;
	margin: 0 auto;
	text-align: center;
`;

export const Title = styled.h1`
	margin: 0;
	font-size: clamp(1.6rem, 6vw, 2.4rem);
	color: ${theme.gold400};
`;

export const DeckList = styled.div`
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	gap: 12px;
	width: 100%;
`;

export const DeckButton = styled.button<{ $selected: boolean }>`
	padding: 16px;
	border-radius: 8px;
	border: 2px solid
		${({ $selected }) => ($selected ? theme.gold400 : theme.borderSubtle)};
	background: ${({ $selected }) =>
		$selected ? theme.cardBgHover : theme.cardBg};
	color: ${theme.textPrimary};
	font-size: 1.1rem;
	font-weight: 700;
	cursor: pointer;

	&:focus-visible {
		outline: 2px solid ${theme.gold400};
		outline-offset: 2px;
	}
`;

export const DeckTheme = styled.span`
	display: block;
	margin-top: 4px;
	font-size: 0.75rem;
	font-weight: 400;
	color: ${theme.textTertiary};
`;

export const PlayButton = styled.button`
	${storeButton};
	width: 100%;
`;

export const DisabledButton = styled.button`
	${storeButton};
	width: 100%;
	background-color: ${theme.cardBg};
	color: ${theme.textTertiary};
	border: 1px solid ${theme.borderSubtle};
	cursor: not-allowed;

	&:hover {
		filter: none;
		transform: none;
	}
`;

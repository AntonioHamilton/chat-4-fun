import styled from "styled-components";
import { storeButton } from "@/styles/mixins";
import { breakpoints } from "@/styles/breakpoints";
import { theme } from "@/styles/theme";

export const Scene = styled.section`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	min-height: 600px;
	padding: 40px 20px;
	overflow: hidden;
	border: 1px solid ${theme.gold500};
	border-radius: 8px;
	box-shadow: 0 0 40px ${theme.shadowColor};

	@media (max-width: ${breakpoints.md}) {
		min-height: 520px;
		padding: 32px 16px;
	}
`;

export const Content = styled.div`
	position: relative;
	z-index: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 20px;
	width: 100%;
	max-width: 520px;
	text-align: center;
`;

export const Title = styled.h1`
	margin: 0;
	font-family: "MedievalSharp", cursive;
	font-size: clamp(1.8rem, 7vw, 2.8rem);
	letter-spacing: 0.04em;
	background: linear-gradient(
		180deg,
		#fff3c4 0%,
		${theme.gold400} 45%,
		${theme.gold500} 100%
	);
	-webkit-background-clip: text;
	background-clip: text;
	color: transparent;
	filter: drop-shadow(0 2px 4px ${theme.shadowColor});
`;

export const Rule = styled.div`
	width: 100%;
	height: 6px;
	border-top: 1px solid ${theme.gold500};
	border-bottom: 1px solid ${theme.gold500};
`;

export const Step = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 16px;
	width: 100%;
`;

export const Question = styled.h2`
	margin: 0;
	font-size: 1rem;
	font-weight: 700;
	letter-spacing: 0.12em;
	text-transform: uppercase;
	color: ${theme.gold400};
`;

export const NameInput = styled.input`
	width: 100%;
	padding: 14px 16px;
	border: 2px solid ${theme.gold500};
	border-radius: 4px;
	background: rgba(6, 14, 38, 0.72);
	color: ${theme.textPrimary};
	font-size: 1.2rem;
	text-align: center;

	&:focus-visible {
		outline: 2px solid ${theme.gold400};
		outline-offset: 2px;
	}
`;

export const ChoiceList = styled.div`
	display: grid;
	grid-template-columns: minmax(0, 1fr);
	gap: 12px;
	width: 100%;
`;

export const ChoiceButton = styled.button<{ $selected?: boolean }>`
	padding: 18px 16px;
	border-radius: 8px;
	border: 2px solid
		${({ $selected }) => ($selected ? theme.gold400 : theme.borderSubtle)};
	background: ${({ $selected }) =>
		$selected ? theme.cardBgHover : theme.cardBg};
	color: ${theme.textPrimary};
	font-size: 1.1rem;
	font-weight: 700;
	cursor: pointer;

	&:hover:not(:disabled) {
		border-color: ${theme.gold500};
	}

	&:focus-visible {
		outline: 2px solid ${theme.gold400};
		outline-offset: 2px;
	}

	&:disabled {
		color: ${theme.textTertiary};
		cursor: not-allowed;
	}
`;

export const ChoiceTheme = styled.span`
	display: block;
	margin-top: 4px;
	font-size: 0.75rem;
	font-weight: 400;
	color: ${theme.textTertiary};
`;

export const DeckList = styled.div`
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	gap: 12px;
	width: 100%;
`;

export const DeckButton = styled(ChoiceButton)`
	padding: 16px;
	font-size: 1.1rem;
`;

export const PlayButton = styled.button`
	${storeButton};
	width: 100%;

	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
`;

export const SecondaryButton = styled.button`
	${storeButton};
	width: 100%;
	background-color: transparent;
	color: ${theme.gold400};
	border: 1px solid ${theme.gold500};
`;

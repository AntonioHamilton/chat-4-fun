import styled from "styled-components";
import Link from "next/link";
import { theme } from "@styles/theme";
import { breakpoints } from "@styles/breakpoints";

export const HeaderContainer = styled.header`
	position: relative;
	z-index: 2;
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 16px;
	padding: 20px 0;
	border-bottom: 1px solid ${theme.borderSubtle};

	@media (max-width: ${breakpoints.md}) {
		flex-direction: column;
		align-items: flex-start;
		gap: 12px;
		padding: 16px 0;
	}
`;

export const LogoLink = styled(Link)`
	display: flex;
	align-items: center;
	gap: 14px;
	max-width: 100%;

	img {
		max-width: 100%;
		height: auto;
	}

	@media (max-width: ${breakpoints.md}) {
		img {
			max-width: 200px;
		}
	}
`;

export const Mascot = styled.span`
	font-size: 2.6rem;
	line-height: 1;

	@media (max-width: ${breakpoints.md}) {
		font-size: 2rem;
	}
`;

export const Wordmark = styled.div`
	display: flex;
	flex-direction: column;
	font-weight: 800;
	font-size: 1.5rem;
	line-height: 1;
	letter-spacing: 1px;
	background: linear-gradient(180deg, ${theme.gold400}, ${theme.gold500});
	background-clip: text;
	-webkit-background-clip: text;
	color: transparent;

	@media (max-width: ${breakpoints.md}) {
		font-size: 1.15rem;
	}
`;

export const LanguageSelector = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
`;

export const LanguageButton = styled.button<{ $active: boolean }>`
	display: flex;
	padding: 4px;
	background: none;
	border: 1px solid
		${(props) => (props.$active ? theme.gold500 : "transparent")};
	border-radius: 3px;
	cursor: pointer;
	opacity: ${(props) => (props.$active ? 1 : 0.55)};
	transition:
		opacity 0.2s ease-out,
		border-color 0.2s ease-out;

	&:hover {
		opacity: 1;
	}
`;

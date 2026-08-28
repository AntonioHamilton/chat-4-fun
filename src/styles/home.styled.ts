import styled from "styled-components";
import { breakpoints } from "./breakpoints";
import { theme } from "./theme";
import { sectionHeading } from "./mixins";

export const HomeContainer = styled.main`
	position: relative;
	z-index: 1;
	display: flex;
	flex-direction: column;
	min-height: 100vh;
	padding: 0px 64px;

	@media (max-width: ${breakpoints.md}) {
		padding: 0px 24px;
	}
`;

export const Tagline = styled.p`
	padding: 24px 0 8px;
	font-size: 1rem;
	font-weight: 500;
	color: ${theme.textSecondary};
`;

export const Section = styled.section`
	margin-top: 32px;

	&:last-of-type {
		margin-bottom: 40px;
	}
`;

export const SectionHeading = styled.h2`
	${sectionHeading};
`;

export const CardsWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 24px;

	@media (max-width: ${breakpoints.lg}) {
		grid-template-columns: repeat(2, 1fr);
	}

	@media (max-width: ${breakpoints.md}) {
		grid-template-columns: repeat(1, 1fr);
	}
`;

export const FooterSpacer = styled.div`
	margin-top: auto;
`;

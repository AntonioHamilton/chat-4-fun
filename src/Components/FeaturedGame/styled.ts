import styled from "styled-components";
import Link from "next/link";
import { theme } from "@styles/theme";
import { breakpoints } from "@styles/breakpoints";
import { storeButton, storePanelHoverable } from "@styles/mixins";

export const FeaturedContainer = styled(Link)`
	${storePanelHoverable};
	position: relative;
	display: block;
	width: 100%;
	aspect-ratio: 16 / 9;
	max-height: 460px;
	overflow: hidden;

	@media (max-width: ${breakpoints.md}) {
		aspect-ratio: 4 / 3;
	}
`;

export const FeaturedImage = styled.img`
	position: absolute;
	inset: 0;
	width: 100%;
	height: 100%;
	object-fit: cover;
	object-position: center;
`;

export const FeaturedOverlay = styled.div`
	position: absolute;
	inset: 0;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-end;
	gap: 12px;
	padding: 32px;
	background: linear-gradient(
		180deg,
		transparent 35%,
		rgba(6, 14, 38, 0.75) 70%,
		rgba(6, 14, 38, 0.95) 100%
	);

	@media (max-width: ${breakpoints.md}) {
		padding: 20px;
		gap: 8px;
		background: linear-gradient(
			180deg,
			transparent 8%,
			rgba(6, 14, 38, 0.82) 48%,
			rgba(6, 14, 38, 0.97) 100%
		);
	}
`;

export const FeaturedTitle = styled.h2`
	font-size: 2rem;
	font-weight: 800;
	color: ${theme.textPrimary};
	text-shadow: 0 2px 6px rgba(0, 0, 0, 0.8);

	@media (max-width: ${breakpoints.md}) {
		font-size: 1.4rem;
	}
`;

export const FeaturedDescription = styled.p`
	max-width: 520px;
	font-size: 0.9rem;
	line-height: 1.5;
	color: ${theme.textSecondary};
	text-shadow: 0 1px 4px rgba(0, 0, 0, 0.9);

	@media (max-width: ${breakpoints.md}) {
		font-size: 0.8rem;
	}
`;

export const PlayButton = styled.span`
	${storeButton};
	margin-top: 4px;
	font-size: 0.9rem;
	text-transform: uppercase;
	letter-spacing: 0.5px;
`;

import styled from "styled-components";
import Link from "next/link";
import { theme } from "@styles/theme";
import { storePanelHoverable } from "@styles/mixins";

export const CardMedia = styled.div`
	position: relative;
	width: 100%;
	height: 200px;
	overflow: hidden;
`;

export const CardImage = styled.img`
	position: absolute;
	inset: 0;
	width: 100%;
	height: 100%;
	object-fit: cover;
	object-position: center;
`;

export const CardOverlay = styled.div`
	position: absolute;
	inset: 0;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	padding: 14px;
	background-color: ${theme.overlayBg};
	opacity: 0;
	transition: opacity 0.2s ease-out;

	p {
		font-size: 0.82rem;
		line-height: 1.45;
		color: ${theme.textPrimary};
		text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8);
	}
`;

export const CardContainer = styled(Link)`
	${storePanelHoverable};
	display: flex;
	flex-direction: column;
	overflow: hidden;

	&:hover ${CardOverlay} {
		opacity: 1;
	}
`;

export const Ribbon = styled.span`
	position: absolute;
	top: 12px;
	left: 0;
	z-index: 1;
	padding: 5px 14px 5px 12px;
	background-color: ${theme.gold500};
	color: ${theme.backgroundPrimary};
	font-size: 0.7rem;
	font-weight: 800;
	letter-spacing: 1px;
	text-transform: uppercase;
	box-shadow: 0 2px 6px rgba(0, 0, 0, 0.45);
`;

export const CardTitle = styled.h3`
	padding: 14px 16px 8px;
	font-size: 1rem;
	font-weight: 700;
	color: ${theme.textPrimary};
`;

export const CardBadges = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
	padding: 0 16px 16px;
`;

export const Badge = styled.span`
	background-color: rgba(58, 55, 166, 0.55);
	border: 1px solid rgba(58, 55, 166, 0.8);
	border-radius: 4px;
	color: ${theme.textPrimary};
	padding: 6px 12px;
	font-size: 0.78rem;
	font-weight: 500;
`;

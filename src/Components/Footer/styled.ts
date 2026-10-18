import styled from "styled-components";
import { theme } from "@styles/theme";

const mutedColor = (light: boolean) =>
	light ? "#4a4a55" : theme.textSecondary;
const hoverColor = (light: boolean) => (light ? "#8a5d00" : theme.gold400);

export const FooterContainer = styled.footer<{ $light: boolean }>`
	position: relative;
	width: 100%;
	background-color: transparent;
	border-top: 1px solid
		${({ $light }) => ($light ? "rgba(0, 0, 0, 0.15)" : theme.borderSubtle)};
	padding: 20px 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
	color: ${({ $light }) => mutedColor($light)};
`;

export const Copyright = styled.div`
	font-size: 0.85rem;
`;

export const PortfolioLink = styled.a<{ $light: boolean }>`
	font-size: 0.85rem;
	color: ${({ $light }) => mutedColor($light)};
	text-decoration: none;
	transition: color 0.2s ease-in-out;

	&:hover {
		color: ${({ $light }) => hoverColor($light)};
	}
`;

export const Socials = styled.div<{ $light: boolean }>`
	display: flex;
	align-items: center;
	gap: 1.5rem;

	a {
		color: ${({ $light }) => mutedColor($light)};
		transition: color 0.2s ease-in-out;

		&:hover {
			color: ${({ $light }) => hoverColor($light)};
		}
	}
`;

export const Icon = styled.div`
	width: 24px;
	height: 24px;
`;

import styled from "styled-components";
import { theme } from "@styles/theme";

export const FooterContainer = styled.footer`
	position: relative;
	width: 100%;
	background-color: transparent;
	border-top: 1px solid ${theme.borderSubtle};
	padding: 20px 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
	color: ${theme.textSecondary};
`;

export const Copyright = styled.div`
	font-size: 0.85rem;
`;

export const PortfolioLink = styled.a`
	font-size: 0.85rem;
	color: ${theme.textSecondary};
	text-decoration: none;
	transition: color 0.2s ease-in-out;

	&:hover {
		color: ${theme.gold400};
	}
`;

export const Socials = styled.div`
	display: flex;
	align-items: center;
	gap: 1.5rem;

	a {
		color: ${theme.textSecondary};
		transition: color 0.2s ease-in-out;

		&:hover {
			color: ${theme.gold400};
		}
	}
`;

export const Icon = styled.div`
	width: 24px;
	height: 24px;
`;

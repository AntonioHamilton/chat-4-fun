import styled from "styled-components";

// Define as variáveis de cores que seriam usadas no SCSS
const TextSecondary = "#a0a0a0"; // Substitua pelo valor real de variables.$text-secondary
const Gold400 = "#daa520"; // Substitua pelo valor real de variables.$gold-400

// Componentes estilizados
export const FooterContainer = styled.footer`
	position: relative;
	width: 100%;
	background-color: transparent;
	display: flex;
	justify-content: space-between;
	align-items: center;
	color: ${TextSecondary};
`;

export const Copyright = styled.div`
	font-size: 0.9rem;
`;

export const Socials = styled.div`
	display: flex;
	align-items: center;
	gap: 1.5rem;

	a {
		color: ${TextSecondary};
		transition: color 0.2s ease-in-out;

		&:hover {
			color: ${Gold400};
		}
	}
`;

export const Icon = styled.div`
	width: 24px;
	height: 24px;
`;

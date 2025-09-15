import styled from "styled-components";

export const Logo = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	h1 {
		font-family: "Caveat Brush";
		font-weight: 400;
		font-size: 40px;
	}

	h3 {
		font-weight: 500;
		font-family: "Roboto";
		font-size: 16px;
		color: #a0a0a0;
	}
`;

export const HomeContainer = styled.main`
	position: relative;
	z-index: 1;
	padding: 0px 64px;
`;

export const CardsWrapper = styled.section`
	margin-top: 32px;
	margin-bottom: 32px;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 32px;
	min-height: 72vh;

	@media (max-width: 768px) {
		grid-template-columns: repeat(1, 1fr);
	}
`;

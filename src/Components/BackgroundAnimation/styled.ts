import styled, { keyframes } from "styled-components";

// Configurações
const twinkleBaseDuration = 16;

// Função auxiliar para gerar números aleatórios
const randomRange = (min: number, max: number) =>
	Math.floor(Math.random() * (max - min + 1)) + min;

// Função que gera múltiplas sombras de caixa
const multipleBoxShadow = (
	n: number,
	color: string,
	width: number,
	height: number
) => {
	const value = Array.from({ length: n }, () => {
		return `${randomRange(0, width)}px ${randomRange(0, height)}px ${color}`;
	}).join(", ");
	return value;
};

// Animação
const twinkle = keyframes`
  0%, 100% {
    opacity: 0.4;
  }
  50% {
    opacity: 1;
  }
`;

export const AnimationWrapper = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	@supports (height: 100dvh) {
		height: 100dvh; /* browsers modernos */
	}
	background-color: #060e26;
	overflow: hidden;

	img {
		opacity: 0.1;
		position: absolute;
	}
`;

export const StarsSmall = styled.div<{ $shouldRender: string }>`
	position: absolute;
	top: -50%;
	left: -50%;
	width: 200%;
	height: 200%;
	animation: ${twinkle} ${twinkleBaseDuration}s linear infinite;

	width: 1px;
	height: 1px;
	background: transparent;
	${(props) =>
		props.$shouldRender === "true" &&
		`box-shadow: ${multipleBoxShadow(2000, "#d2d2d4", window.innerWidth * 2, window.innerHeight * 2)};`}
`;

export const StarsMedium = styled.div<{ $shouldRender: string }>`
	position: absolute;
	top: -50%;
	left: -50%;
	width: 200%;
	height: 200%;
	animation: ${twinkle} ${twinkleBaseDuration * 0.75}s linear infinite;
	animation-delay: -2s;

	width: 2px;
	height: 2px;
	background: transparent;
	${(props) =>
		props.$shouldRender === "true" &&
		`box-shadow: ${multipleBoxShadow(500, "#e8e8ec", window.innerWidth * 2, window.innerHeight * 2)};`}
`;

export const StarsLarge = styled.div<{ $shouldRender: string }>`
	position: absolute;
	top: -50%;
	left: -50%;
	width: 200%;
	height: 200%;
	animation: ${twinkle} ${twinkleBaseDuration * 0.5}s linear infinite;
	animation-delay: -4s;

	width: 3px;
	height: 3px;
	background: transparent;
	${(props) =>
		props.$shouldRender === "true" &&
		`box-shadow: ${multipleBoxShadow(300, "#e8e8ec", window.innerWidth * 2, window.innerHeight * 2)};`}
`;

import styled, { keyframes, css } from "styled-components";

const bossAttack = keyframes`
  0% {
    transform: scale(1);
    filter: brightness(1);
  }
  50% {
    transform: scale(1.1) translateY(-10px);
    filter: brightness(1.2);
  }
  100% {
    transform: scale(1);
    filter: brightness(1);
  }
`;

export const BossesContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	position: absolute;
	z-index: 10;
	background: rgba(0, 0, 0, 0.9);
	width: 100dvw;
	height: 100dvh;
	top: 0;
	left: 0;
`;

export const ImageContainer = styled.div<{ $isAttacking: boolean }>`
	img {
		width: auto;
		height: 400px;
		object-fit: contain;
		transition:
			transform 0.1s ease-out,
			filter 0.1s ease-out;

		${(props) =>
			props.$isAttacking &&
			css`
				animation: ${bossAttack} 0.6s ease-in-out forwards;
			`}
	}
`;

export const LifeContainer = styled.div<{ $lifePercentage: string }>`
	background: linear-gradient(to right, #e74c3c, #c0392b);
	border: 3px solid #f9fafb;
	border-radius: 8px;
	width: 250px;
	height: 30px;
	margin-top: 20px;
	margin-bottom: 20px;
	position: relative;
	overflow: hidden;

	&::before {
		content: "";
		display: block;
		height: 100%;
		width: ${(props) => props.$lifePercentage}%;
		background: #27ae60;
		transition: width 0.3s ease-out;
		position: absolute;
		top: 0;
		left: 0;
	}

	span {
		position: absolute;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #f9fafb;
		font-weight: bold;
		font-size: 1.2em;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
		z-index: 1;
	}
`;

export const TimeContainer = styled.div`
	position: absolute;
	top: 60px;
	left: auto;
	font-size: 2em;
	font-weight: bold;
	color: #e74c3c;
	text-shadow: 4px 4px 8px rgba(0, 0, 0, 0.7);
	z-index: 0;
`;

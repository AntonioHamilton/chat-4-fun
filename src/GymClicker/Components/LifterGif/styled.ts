import { breakpoints } from "@styles/breakpoints";
import styled, { keyframes } from "styled-components";

const floatUp = keyframes`
  0% {
    opacity: 1;
    transform: translate(0, 0);
  }
  100% {
    opacity: 0;
    transform: translate(var(--x, 0px), var(--y, -60px));
  }
`;

export const ImageContainer = styled.div`
	border-radius: 50%;
	position: relative;
	display: inline-block;

	img {
		object-fit: cover;

		@media (max-width: ${breakpoints.md}) {
			gap: 12px;
			width: 160px;
			height: 160px;
		}

		@media (max-width: ${breakpoints.sm}) {
			height: 100px;
			width: 100px;
		}
	}

	p {
		position: absolute;
		bottom: 20px;
		left: 50%;
		transform: translateX(-50%);
		font-size: 18px;
		font-weight: bold;
		color: green;
		pointer-events: none;

		animation: ${floatUp} 1.5s ease-out infinite;
	}
`;

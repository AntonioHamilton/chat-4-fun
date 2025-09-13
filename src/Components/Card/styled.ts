import styled from "styled-components";
import Link from "next/link";

interface CardContainerProps {
	bgimage: string;
}

export const CardContainer = styled(Link)<CardContainerProps>`
	width: 1fr;
	height: 200px;
	background-image: url(${(props) => props.bgimage});
	background-size: contain;
	background-position: center;
	background-repeat: no-repeat;
	border-radius: 10px;
	background-color: #fff;
	border: 4px solid rgba(13, 116, 81, 1);
`;

import * as SC from "./styled";

type CardProps = { name: string; link: string; image: string };

export const Card = ({ name, link, image }: CardProps) => {
	return <SC.CardContainer href={link} bgimage={image} />;
};

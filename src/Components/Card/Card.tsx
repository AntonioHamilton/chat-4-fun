import { Game } from "@/types/Game";
import * as SC from "./styled";

type CardProps = { game: Game };

export const Card = ({ game }: CardProps) => {
	return (
		<SC.CardContainer href={game.path} aria-label={game.title}>
			<SC.CardMedia>
				<SC.CardImage src={game.image} alt="" />
				{game.ribbon && <SC.Ribbon>{game.ribbon}</SC.Ribbon>}
				<SC.CardOverlay>
					<p>{game.description}</p>
				</SC.CardOverlay>
			</SC.CardMedia>
			<SC.CardTitle>{game.title}</SC.CardTitle>
			<SC.CardBadges>
				{game.badges.map((badge) => (
					<SC.Badge key={badge}>{badge}</SC.Badge>
				))}
			</SC.CardBadges>
		</SC.CardContainer>
	);
};

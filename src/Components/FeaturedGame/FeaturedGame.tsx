import { Game } from "@/types/Game";
import * as SC from "./styled";

type FeaturedGameProps = { game: Game; playLabel: string };

export const FeaturedGame = ({ game, playLabel }: FeaturedGameProps) => {
	return (
		<SC.FeaturedContainer href={game.path} aria-label={game.title}>
			<SC.FeaturedImage src={game.image} alt="" />
			<SC.FeaturedOverlay>
				<SC.FeaturedTitle>{game.title}</SC.FeaturedTitle>
				<SC.FeaturedDescription>{game.description}</SC.FeaturedDescription>
				<SC.PlayButton>▶ {playLabel}</SC.PlayButton>
			</SC.FeaturedOverlay>
		</SC.FeaturedContainer>
	);
};

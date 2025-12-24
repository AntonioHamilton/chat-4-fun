import * as SC from "@styles/home.styled";
import { Card } from "@/Components/Card/Card";
import BackgroundAnimation from "@/Components/BackgroundAnimation/BackgroundAnimation";
import { Footer } from "@/Components/Footer/Footer";

const games = [
	{
		name: "Gym Clicker",
		path: "/gym-clicker",
		image: "/images/gymclicker.png"
	},
	{
		name: "Brasil Unmatched",
		path: "/brasil-unmatched",
		image: "/images/unmatched.jpg"
	}
];

export default function Home() {
	return (
		<>
			<BackgroundAnimation />
			<SC.HomeContainer>
				<SC.Logo>
					<h1>Chat 4 Fun</h1>
					<h3>🎮 Games by Chat 🎮</h3>
				</SC.Logo>
				<SC.CardsWrapper>
					{games.map((game) => (
						<Card
							key={game.name}
							name={game.name}
							link={game.path}
							image={game.image}
						/>
					))}
				</SC.CardsWrapper>
				<Footer />
			</SC.HomeContainer>
		</>
	);
}

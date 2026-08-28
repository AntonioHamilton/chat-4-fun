import * as SC from "@styles/home.styled";
import { Card } from "@/Components/Card/Card";
import { FeaturedGame } from "@/Components/FeaturedGame/FeaturedGame";
import { Header } from "@/Components/Header/Header";
import BackgroundAnimation from "@/Components/BackgroundAnimation/BackgroundAnimation";
import { Footer } from "@/Components/Footer/Footer";
import { useTranslation } from "@/hooks/useTranslation";
import { translations } from "@/Translations";
import { featuredGameId, games } from "@/Translations/games";

export default function Home() {
	const { language } = useTranslation();
	const t = translations[language];
	const library = games[language];
	const featured = library.find((game) => game.id === featuredGameId);

	return (
		<>
			<BackgroundAnimation />
			<SC.HomeContainer>
				<Header />
				<SC.Tagline>{t.tagline}</SC.Tagline>

				{featured && (
					<SC.Section>
						<SC.SectionHeading>{t.featured_heading}</SC.SectionHeading>
						<FeaturedGame game={featured} playLabel={t.play_now} />
					</SC.Section>
				)}

				<SC.Section>
					<SC.SectionHeading>{t.library_heading}</SC.SectionHeading>
					<SC.CardsWrapper>
						{library.map((game) => (
							<Card key={game.id} game={game} />
						))}
					</SC.CardsWrapper>
				</SC.Section>

				<SC.FooterSpacer />
				<Footer />
			</SC.HomeContainer>
		</>
	);
}

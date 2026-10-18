import { ReactNode } from "react";
import { BackButton } from "@/Components/BackButton/BackButton";
import { Footer } from "@/Components/Footer/Footer";
import { useTranslation } from "@/hooks/useTranslation";
import { translations } from "@/Translations";
import * as SC from "./styled";

type GameLayoutProps = {
	background: string;
	tone?: "dark" | "light";
	topActions?: ReactNode;
	children: ReactNode;
};

export const GameLayout = ({
	background,
	tone = "dark",
	topActions,
	children
}: GameLayoutProps) => {
	const { language } = useTranslation();
	const t = translations[language];

	return (
		<SC.Page $background={background} $light={tone === "light"}>
			<SC.TopBar>
				<BackButton href="/" tone={tone}>
					{t.back_to_games}
				</BackButton>
				{topActions}
			</SC.TopBar>
			<SC.Main>{children}</SC.Main>
			<Footer tone={tone} />
		</SC.Page>
	);
};

import Image from "next/image";
import { ReactNode } from "react";
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
				<SC.LogoLink href="/" aria-label={t.back_to_games}>
					<Image src="/images/logo.png" alt="" width={107} height={60} />
				</SC.LogoLink>
				{topActions}
			</SC.TopBar>
			<SC.Main>{children}</SC.Main>
			<Footer tone={tone} />
		</SC.Page>
	);
};

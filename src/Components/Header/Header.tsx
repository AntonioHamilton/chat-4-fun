import Image from "next/image";
import { changeLanguage, useTranslation } from "@/hooks/useTranslation";
import { translations } from "@/Translations";
import * as SC from "./styled";

export const Header = () => {
	const { language } = useTranslation();
	const t = translations[language];

	return (
		<SC.HeaderContainer>
			<SC.LogoLink href="/" aria-label="Chat 4 Fun">
				<Image
					src="/images/logo.png"
					alt="Chat 4 Fun"
					width={260}
					height={146}
					priority
				/>
			</SC.LogoLink>

			<SC.LanguageSelector>
				<SC.LanguageButton
					type="button"
					onClick={() => changeLanguage("PT_BR")}
					$active={language === "PT_BR"}
					aria-label={t.language_pt}
				>
					<Image src="/icons/br-flag.svg" alt="" width={24} height={17} />
				</SC.LanguageButton>
				<SC.LanguageButton
					type="button"
					onClick={() => changeLanguage("EN_US")}
					$active={language === "EN_US"}
					aria-label={t.language_en}
				>
					<Image src="/icons/us-flag.svg" alt="" width={24} height={17} />
				</SC.LanguageButton>
			</SC.LanguageSelector>
		</SC.HeaderContainer>
	);
};

import Image from "next/image";
import { changeLanguage, useTranslation } from "@/hooks/useTranslation";
import { setSoundEnabled, useSoundEnabled } from "@/hooks/useSound";
import { translations } from "@/Translations";
import { SoundOffIcon, SoundOnIcon } from "@/Components/Icons/UiIcons";
import * as SC from "./styled";

export const Header = () => {
	const { language } = useTranslation();
	const t = translations[language];
	const soundEnabled = useSoundEnabled();

	return (
		<SC.HeaderContainer>
			<SC.LogoLink href="/" aria-label="Chat 4 Fun">
				<Image
					src="/images/logo.webp"
					alt="Chat 4 Fun"
					width={107}
					height={60}
					priority
				/>
			</SC.LogoLink>

			<SC.Controls>
				<SC.SoundButton
					type="button"
					aria-pressed={soundEnabled}
					aria-label={soundEnabled ? t.sound_disable : t.sound_enable}
					title={soundEnabled ? t.sound_disable : t.sound_enable}
					onClick={() => setSoundEnabled(!soundEnabled)}
				>
					{soundEnabled ? <SoundOnIcon /> : <SoundOffIcon />}
				</SC.SoundButton>

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
			</SC.Controls>
		</SC.HeaderContainer>
	);
};

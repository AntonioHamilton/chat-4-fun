import { useState } from "react";
import { flagQuizTranslations } from "@/Translations/flagQuiz";
import { ClockIcon, ClockOffIcon } from "@/GuessCountry/Components/Icons/Icons";
import { PlayIcon, TrophyIcon } from "@/Components/Icons/UiIcons";
import * as Shared from "@/styles/guess-country.styled";
import * as FlagSC from "@/styles/flag-quiz.styled";
import { Mode } from "../../Types/game.types";
import { OptionButton } from "../OptionButton/OptionButton";
import * as SC from "./styled";

type Translations = (typeof flagQuizTranslations)["PT_BR"];

type MenuProps = {
	t: Translations;
	onPlay: (mode: Mode) => void;
	onRanking: () => void;
};

type Step = "main" | "modes";

export const Menu = ({ t, onPlay, onRanking }: MenuProps) => {
	const [step, setStep] = useState<Step>("main");

	return (
		<>
			<SC.Hero>
				<SC.Mascot src="/FlagQuiz/logo-without-background.webp" alt="" />
				<FlagSC.Title>{t.title}</FlagSC.Title>
				<FlagSC.Subtitle>{t.subtitle}</FlagSC.Subtitle>
			</SC.Hero>

			<FlagSC.Column>
				{step === "main" && (
					<>
						<OptionButton
							icon={<PlayIcon />}
							label={t.play}
							info={t.playInfo}
							infoLabel={t.infoLabel}
							onClick={() => setStep("modes")}
						/>
						<OptionButton
							icon={<TrophyIcon />}
							label={t.ranking}
							info={t.rankingInfo}
							infoLabel={t.infoLabel}
							onClick={onRanking}
						/>
					</>
				)}

				{step === "modes" && (
					<>
						<FlagSC.SectionTitle>{t.play}</FlagSC.SectionTitle>
						<OptionButton
							icon={<ClockIcon />}
							label={t.timed}
							info={t.timedInfo}
							infoLabel={t.infoLabel}
							onClick={() => onPlay("timed")}
						/>
						<OptionButton
							icon={<ClockOffIcon />}
							label={t.untimed}
							info={t.untimedInfo}
							infoLabel={t.infoLabel}
							onClick={() => onPlay("untimed")}
						/>
						<SC.BackRow>
							<Shared.GhostButton type="button" onClick={() => setStep("main")}>
								{t.back}
							</Shared.GhostButton>
						</SC.BackRow>
					</>
				)}
			</FlagSC.Column>
		</>
	);
};

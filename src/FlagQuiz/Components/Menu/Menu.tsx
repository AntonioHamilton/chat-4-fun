import { flagQuizTranslations } from "@/Translations/flagQuiz";
import * as Shared from "@/styles/guess-country.styled";
import * as FlagSC from "@/styles/flag-quiz.styled";
import { Mode } from "../../Types/game.types";
import * as SC from "./styled";

type Translations = (typeof flagQuizTranslations)["PT_BR"];

type MenuProps = {
	t: Translations;
	onPlay: (mode: Mode) => void;
	onRanking: () => void;
};

export const Menu = ({ t, onPlay, onRanking }: MenuProps) => (
	<>
		<SC.Hero>
			<FlagSC.Title>{t.title}</FlagSC.Title>
			<FlagSC.Subtitle>{t.subtitle}</FlagSC.Subtitle>
		</SC.Hero>

		<FlagSC.Column>
			<Shared.PrimaryButton type="button" onClick={() => onPlay("timed")}>
				{t.timed}
			</Shared.PrimaryButton>
			<SC.Hint>{t.timedHint}</SC.Hint>
			<Shared.PrimaryButton type="button" onClick={() => onPlay("untimed")}>
				{t.untimed}
			</Shared.PrimaryButton>
			<SC.Hint>{t.untimedHint}</SC.Hint>
			<Shared.GhostButton type="button" onClick={onRanking}>
				{t.ranking}
			</Shared.GhostButton>
		</FlagSC.Column>
	</>
);

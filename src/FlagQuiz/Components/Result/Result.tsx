import { FormEvent, useCallback, useState } from "react";
import { countryName } from "@/GuessCountry/Utils/countries";
import { flagQuizTranslations } from "@/Translations/flagQuiz";
import { NameLanguage } from "@/GuessCountry/Types/game.types";
import * as Shared from "@/styles/guess-country.styled";
import * as FlagSC from "@/styles/flag-quiz.styled";
import { EndReason } from "../../Types/game.types";
import { Toast } from "../Toast/Toast";

type Translations = (typeof flagQuizTranslations)["PT_BR"];

type ResultProps = {
	t: Translations;
	language: NameLanguage;
	score: number;
	missed: string | null;
	endedBy: EndReason;
	onSave: (name: string) => Promise<void>;
	onPlayAgain: () => void;
};

export const Result = ({
	t,
	language,
	score,
	missed,
	endedBy,
	onSave,
	onPlayAgain
}: ResultProps) => {
	const [name, setName] = useState("");
	const [saving, setSaving] = useState(false);
	const [failed, setFailed] = useState(false);
	const trimmed = name.trim();
	const closeToast = useCallback(() => setFailed(false), []);

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!trimmed || saving) return;
		setSaving(true);
		setFailed(false);
		try {
			await onSave(trimmed);
		} catch {
			setFailed(true);
			setSaving(false);
		}
	};

	return (
		<Shared.Panel>
			<FlagSC.SectionTitle>
				{endedBy === "timeout" ? t.timeUp : t.resultTitle}
			</FlagSC.SectionTitle>
			<FlagSC.Score>
				{t.score}: {score}
			</FlagSC.Score>
			{missed && (
				<FlagSC.Message>
					{t.missedFlag}: <strong>{countryName(missed, language)}</strong>
				</FlagSC.Message>
			)}
			<FlagSC.Form onSubmit={handleSubmit}>
				<FlagSC.Label htmlFor="flag-quiz-name">{t.nameLabel}</FlagSC.Label>
				<FlagSC.Input
					id="flag-quiz-name"
					maxLength={20}
					autoComplete="nickname"
					value={name}
					disabled={saving}
					onChange={(event) => setName(event.target.value)}
				/>
				<FlagSC.SubmitButton type="submit" disabled={!trimmed || saving}>
					{saving ? t.saving : t.saveScore}
				</FlagSC.SubmitButton>
			</FlagSC.Form>
			<FlagSC.WideGhostButton type="button" onClick={onPlayAgain}>
				{t.playAgain}
			</FlagSC.WideGhostButton>
			{failed && <Toast message={t.saveError} onClose={closeToast} />}
		</Shared.Panel>
	);
};

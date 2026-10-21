import { FormEvent, useCallback, useState } from "react";
import { COUNTRY_CODES } from "@/GuessCountry/Constants/countryCodes";
import { countryName } from "@/GuessCountry/Utils/countries";
import { flagQuizTranslations } from "@/Translations/flagQuiz";
import { NameLanguage } from "@/GuessCountry/Types/game.types";
import * as FlagSC from "@/styles/flag-quiz.styled";
import { EndReason } from "../../Types/game.types";
import { Toast } from "../Toast/Toast";
import * as SC from "./styled";

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
	const canSave = score > 0;

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!trimmed || saving || !canSave) return;
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
		<>
			<FlagSC.Title>
				{endedBy === "timeout" ? t.timeUp : t.resultTitle}
			</FlagSC.Title>
			<SC.Card>
				{missed && (
					<>
						<SC.Flag
							className={`fi fi-${COUNTRY_CODES[missed]}`}
							role="img"
							aria-label={countryName(missed, language)}
						/>
						<FlagSC.Message>
							{t.missedFlag}: <strong>{countryName(missed, language)}</strong>
						</FlagSC.Message>
					</>
				)}
				<SC.Points>
					{t.score}: {score}
				</SC.Points>
				{canSave && (
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
				)}
				<FlagSC.WideGhostButton type="button" onClick={onPlayAgain}>
					{t.playAgain}
				</FlagSC.WideGhostButton>
				{failed && <Toast message={t.saveError} onClose={closeToast} />}
			</SC.Card>
		</>
	);
};

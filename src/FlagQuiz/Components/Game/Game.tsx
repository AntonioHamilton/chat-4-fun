import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { useCountdown } from "@/Hooks/useCountdown";
import { COUNTRY_CODES } from "@/Constants/countryCodes";
import { Language } from "@/Types/Language";
import { countryName, suggestCountries } from "@/Utils/countries";
import { flagQuizTranslations } from "@/Translations/flagQuiz";
import { playSound } from "@/Hooks/useSound";
import * as FlagSC from "@/styles/flag-quiz.styled";
import { FLAG_MS, useFlagQuiz } from "../../Hooks/useFlagQuiz";
import { EndReason, Mode } from "../../Types/game.types";
import { Capybara } from "../Capybara/Capybara";
import * as SC from "./styled";

type Translations = (typeof flagQuizTranslations)["PT_BR"];

type GameProps = {
	mode: Mode;
	t: Translations;
	language: Language;
	onFinish: (score: number, missed: string | null, endedBy: EndReason) => void;
};

type AnswerProps = {
	t: Translations;
	language: Language;
	disabled: boolean;
	onSubmit: (value: string) => void;
};

const CORRECT_SOUND = "/sounds/correct.mp3";
const WRONG_SOUND = "/sounds/wrong.mp3";

const Answer = ({ t, language, disabled, onSubmit }: AnswerProps) => {
	const [value, setValue] = useState("");
	const [suggestionsOpen, setSuggestionsOpen] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const suggestions = useMemo(
		() => suggestCountries(value, language),
		[value, language]
	);

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const input = value.trim();
		if (!input || disabled) return;
		onSubmit(input);
		setValue("");
		setSuggestionsOpen(false);
	};

	const pickSuggestion = (country: string) => {
		setValue(countryName(country, language));
		setSuggestionsOpen(false);
		inputRef.current?.focus();
	};

	return (
		<FlagSC.Form onSubmit={handleSubmit}>
			<FlagSC.Field>
				<FlagSC.Input
					ref={inputRef}
					aria-label={t.inputLabel}
					aria-autocomplete="list"
					placeholder={t.inputPlaceholder}
					autoComplete="off"
					autoFocus
					disabled={disabled}
					value={value}
					onChange={(event) => {
						setValue(event.target.value);
						setSuggestionsOpen(true);
					}}
					onBlur={(event) => {
						if (
							!event.currentTarget.parentElement?.contains(
								event.relatedTarget as Node
							)
						) {
							setSuggestionsOpen(false);
						}
					}}
					onKeyDown={(event) => {
						if (event.key === "Escape") setSuggestionsOpen(false);
					}}
				/>
				{suggestionsOpen && !disabled && suggestions.length > 0 && (
					<FlagSC.Suggestions role="listbox">
						{suggestions.map((country) => (
							<li key={country} role="presentation">
								<FlagSC.SuggestionButton
									type="button"
									role="option"
									aria-selected={false}
									onMouseDown={(event) => event.preventDefault()}
									onClick={() => pickSuggestion(country)}
								>
									{countryName(country, language)}
								</FlagSC.SuggestionButton>
							</li>
						))}
					</FlagSC.Suggestions>
				)}
			</FlagSC.Field>
			<FlagSC.SubmitButton type="submit" disabled={disabled || !value.trim()}>
				{t.submit}
			</FlagSC.SubmitButton>
		</FlagSC.Form>
	);
};

export const Game = ({ mode, t, language, onFinish }: GameProps) => {
	const {
		current,
		index,
		score,
		status,
		missed,
		endedBy,
		answer,
		feedback,
		feedbackId
	} = useFlagQuiz(mode);
	const seconds = useCountdown(
		mode === "timed" && status === "playing" && feedback === null
			? FLAG_MS
			: null,
		index
	);

	useEffect(() => {
		if (status === "over" && endedBy) onFinish(score, missed, endedBy);
	}, [status, score, missed, endedBy, onFinish]);

	const [frozenSeconds, setFrozenSeconds] = useState<number | null>(null);
	const timer = feedback !== null ? (frozenSeconds ?? seconds) : seconds;

	useEffect(() => {
		if (feedback !== null) setFrozenSeconds((value) => value ?? seconds);
		else setFrozenSeconds(null);
	}, [feedback, seconds]);

	useEffect(() => {
		if (feedback === "correct") playSound(CORRECT_SOUND);
		if (feedback === "wrong") playSound(WRONG_SOUND);
	}, [feedback, feedbackId]);

	if (status === "over") return null;

	return (
		<>
			<SC.TopBar>
				<SC.ScoreBlock>
					<SC.ScoreLabel>{t.score}</SC.ScoreLabel>
					<SC.ScoreValue aria-live="polite">{score}</SC.ScoreValue>
				</SC.ScoreBlock>
				{timer !== null && (
					<SC.Timer $urgent={timer <= 3} aria-label={t.timeLeft}>
						{timer}s
					</SC.Timer>
				)}
			</SC.TopBar>
			<SC.Card>
				<SC.Stage>
					<SC.Flag
						className={`fi fi-${COUNTRY_CODES[current]}`}
						role="img"
						aria-label={t.flagLabel}
					/>
					{feedback !== null && <Capybara key={feedbackId} kind={feedback} />}
				</SC.Stage>
				<Answer
					key={index}
					t={t}
					language={language}
					disabled={feedback !== null}
					onSubmit={(value) => {
						answer(value);
					}}
				/>
			</SC.Card>
		</>
	);
};

import { FormEvent, useEffect, useState } from "react";
import { useCountdown } from "@/GuessCountry/Hooks/useCountdown";
import { COUNTRY_CODES } from "@/GuessCountry/Constants/countryCodes";
import { flagQuizTranslations } from "@/Translations/flagQuiz";
import { playSound } from "@/hooks/useSound";
import * as FlagSC from "@/styles/flag-quiz.styled";
import { FLAG_MS, useFlagQuiz } from "../../Hooks/useFlagQuiz";
import { EndReason, Mode } from "../../Types/game.types";
import { Capybara } from "../Capybara/Capybara";
import * as SC from "./styled";

type Translations = (typeof flagQuizTranslations)["PT_BR"];

type GameProps = {
	mode: Mode;
	t: Translations;
	onFinish: (score: number, missed: string | null, endedBy: EndReason) => void;
};

type AnswerProps = {
	t: Translations;
	disabled: boolean;
	onSubmit: (value: string) => void;
};

const CORRECT_SOUND = "/sounds/correct.mp3";
const WRONG_SOUND = "/sounds/wrong.mp3";

const Answer = ({ t, disabled, onSubmit }: AnswerProps) => {
	const [value, setValue] = useState("");

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const input = value.trim();
		if (!input || disabled) return;
		onSubmit(input);
		setValue("");
	};

	return (
		<FlagSC.Form onSubmit={handleSubmit}>
			<FlagSC.Input
				aria-label={t.inputLabel}
				placeholder={t.inputPlaceholder}
				autoComplete="off"
				autoFocus
				disabled={disabled}
				value={value}
				onChange={(event) => setValue(event.target.value)}
			/>
			<FlagSC.SubmitButton type="submit" disabled={disabled || !value.trim()}>
				{t.submit}
			</FlagSC.SubmitButton>
		</FlagSC.Form>
	);
};

export const Game = ({ mode, t, onFinish }: GameProps) => {
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
					disabled={feedback !== null}
					onSubmit={(value) => {
						answer(value);
					}}
				/>
			</SC.Card>
		</>
	);
};

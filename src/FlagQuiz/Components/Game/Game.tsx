import { FormEvent, useEffect, useState } from "react";
import { useCountdown } from "@/GuessCountry/Hooks/useCountdown";
import { COUNTRY_CODES } from "@/GuessCountry/Constants/countryCodes";
import { flagQuizTranslations } from "@/Translations/flagQuiz";
import { playSound } from "@/hooks/useSound";
import * as Shared from "@/styles/guess-country.styled";
import * as FlagSC from "@/styles/flag-quiz.styled";
import { FLAG_MS, useFlagQuiz } from "../../Hooks/useFlagQuiz";
import { EndReason, Mode } from "../../Types/game.types";
import * as SC from "./styled";

type Translations = (typeof flagQuizTranslations)["PT_BR"];

type GameProps = {
	mode: Mode;
	t: Translations;
	onFinish: (score: number, missed: string | null, endedBy: EndReason) => void;
};

type AnswerProps = {
	t: Translations;
	onSubmit: (value: string) => void;
};

const CORRECT_SOUND = "/sounds/correct.mp3";

const Answer = ({ t, onSubmit }: AnswerProps) => {
	const [value, setValue] = useState("");

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const input = value.trim();
		if (!input) return;
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
				value={value}
				onChange={(event) => setValue(event.target.value)}
			/>
			<FlagSC.SubmitButton type="submit" disabled={!value.trim()}>
				{t.submit}
			</FlagSC.SubmitButton>
		</FlagSC.Form>
	);
};

export const Game = ({ mode, t, onFinish }: GameProps) => {
	const { current, index, score, status, missed, endedBy, answer } =
		useFlagQuiz(mode);
	const seconds = useCountdown(
		mode === "timed" && status === "playing" ? FLAG_MS : null,
		index
	);

	useEffect(() => {
		if (status === "over" && endedBy) onFinish(score, missed, endedBy);
	}, [status, score, missed, endedBy, onFinish]);

	if (status === "over") return null;

	return (
		<>
			<SC.TopBar>
				<FlagSC.Score>
					{t.score}: {score}
				</FlagSC.Score>
				{seconds !== null && (
					<SC.Timer $urgent={seconds <= 3} aria-label={t.timeLeft}>
						{seconds}s
					</SC.Timer>
				)}
			</SC.TopBar>
			<Shared.Panel>
				<SC.Stage>
					{score > 0 && (
						<SC.Feedback key={score} role="status">
							{t.correct} +1
						</SC.Feedback>
					)}
					<SC.Flag
						className={`fi fi-${COUNTRY_CODES[current]}`}
						role="img"
						aria-label={t.flagLabel}
					/>
				</SC.Stage>
				<Answer
					key={index}
					t={t}
					onSubmit={(value) => {
						if (answer(value)) playSound(CORRECT_SOUND);
					}}
				/>
			</Shared.Panel>
		</>
	);
};

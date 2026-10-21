import { useCallback, useEffect, useState } from "react";
import { COUNTRY_CODES } from "@/GuessCountry/Constants/countryCodes";
import { COUNTRIES } from "@/GuessCountry/Constants/countries";
import { findCountry, shuffle } from "@/GuessCountry/Utils/countries";
import { EndReason, Mode } from "../Types/game.types";

export const FLAG_MS = 10_000;
export const FEEDBACK_MS = 1000;
export const WRONG_FEEDBACK_MS = 2400;

export type Feedback = "correct" | "wrong";

const FLAGS = COUNTRIES.filter(
	(country, index, all) =>
		COUNTRY_CODES[country] &&
		all.findIndex(
			(other) => COUNTRY_CODES[other] === COUNTRY_CODES[country]
		) === index
);

const isSameFlag = (guessed: string | null, current: string) =>
	guessed !== null && COUNTRY_CODES[guessed] === COUNTRY_CODES[current];

export const useFlagQuiz = (mode: Mode) => {
	const [deck] = useState(() => shuffle(FLAGS));
	const [index, setIndex] = useState(0);
	const [score, setScore] = useState(0);
	const [status, setStatus] = useState<"playing" | "over">("playing");
	const [missed, setMissed] = useState<string | null>(null);
	const [endedBy, setEndedBy] = useState<EndReason | null>(null);
	const [feedback, setFeedback] = useState<Feedback | null>(null);
	const [feedbackId, setFeedbackId] = useState(0);
	const current = deck[index];
	const busy = feedback !== null;

	const showFeedback = useCallback((kind: Feedback) => {
		setFeedback(kind);
		setFeedbackId((value) => value + 1);
	}, []);

	useEffect(() => {
		if (mode !== "timed" || status !== "playing" || busy) return undefined;
		const timer = setTimeout(() => {
			setMissed(current);
			setEndedBy("timeout");
			showFeedback("wrong");
		}, FLAG_MS);
		return () => clearTimeout(timer);
	}, [mode, status, busy, current, showFeedback]);

	useEffect(() => {
		if (feedback === null) return undefined;
		const timer = setTimeout(
			() => {
				if (feedback === "wrong") {
					setStatus("over");
				} else if (index + 1 < deck.length) {
					setIndex(index + 1);
				} else {
					setEndedBy("finished");
					setStatus("over");
				}
				setFeedback(null);
			},
			feedback === "wrong" ? WRONG_FEEDBACK_MS : FEEDBACK_MS
		);
		return () => clearTimeout(timer);
	}, [feedback, feedbackId, index, deck.length]);

	const answer = useCallback(
		(input: string) => {
			if (status !== "playing" || busy) return false;
			if (!isSameFlag(findCountry(input), current)) {
				setMissed(current);
				setEndedBy("miss");
				showFeedback("wrong");
				return false;
			}
			setScore((value) => value + 1);
			showFeedback("correct");
			return true;
		},
		[busy, current, showFeedback, status]
	);

	return {
		current,
		index,
		score,
		status,
		missed,
		endedBy,
		answer,
		feedback,
		feedbackId
	};
};

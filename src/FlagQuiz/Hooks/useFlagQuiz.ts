import { useCallback, useEffect, useState } from "react";
import { COUNTRY_CODES } from "@/GuessCountry/Constants/countryCodes";
import { COUNTRIES } from "@/GuessCountry/Constants/countries";
import { findCountry, shuffle } from "@/GuessCountry/Utils/countries";
import { EndReason, Mode } from "../Types/game.types";

export const FLAG_MS = 10_000;
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
	const current = deck[index];

	useEffect(() => {
		if (mode !== "timed" || status !== "playing") return undefined;
		const timer = setTimeout(() => {
			setMissed(current);
			setEndedBy("timeout");
			setStatus("over");
		}, FLAG_MS);
		return () => clearTimeout(timer);
	}, [mode, status, current]);

	const answer = useCallback(
		(input: string) => {
			if (status !== "playing") return false;
			if (!isSameFlag(findCountry(input), current)) {
				setMissed(current);
				setEndedBy("miss");
				setStatus("over");
				return false;
			}
			setScore((value) => value + 1);
			if (index + 1 >= deck.length) {
				setEndedBy("finished");
				setStatus("over");
			} else {
				setIndex(index + 1);
			}
			return true;
		},
		[current, deck.length, index, status]
	);

	return { current, index, score, status, missed, endedBy, answer };
};

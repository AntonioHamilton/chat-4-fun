import { useCallback, useEffect, useMemo, useState } from "react";
import { COUNTRIES_PER_PLAYER } from "@/GuessCountry/Constants/game";
import { GameAction, GameState, Mode } from "../Types/game.types";
import { Language } from "@/Types/Language";
import { computerGuess } from "../Utils/computer";
import { randomCountries } from "@/Utils/countries";
import {
	continueRound,
	createState,
	guess,
	handleTimeout,
	pass,
	setCountries,
	viewFor
} from "../Utils/engine";
import { revealPrefix } from "@/Utils/text";

const COMPUTER = 1;
const PLAYER = 0;

export const useLocalGame = (mode: Mode, language: Language) => {
	const [state, setState] = useState<GameState>(() =>
		createState(mode, Date.now())
	);

	useEffect(() => {
		if (state.phase === "picking" && !state.countries[COMPUTER]) {
			setState((current) =>
				setCountries(current, COMPUTER, randomCountries(COUNTRIES_PER_PLAYER))
			);
		}
		if (state.phase === "roundOver" && !state.acks[COMPUTER]) {
			setState((current) => continueRound(current, COMPUTER, Date.now()));
		}
	}, [state]);

	useEffect(() => {
		if (state.phase !== "playing") return;

		if (state.giver === PLAYER && state.awaitingGuess) {
			const timer = setTimeout(
				() =>
					setState((s) => {
						const word = s.countries[PLAYER]?.[s.solved[PLAYER]] ?? "";
						const prefix = revealPrefix(word, s.revealed[PLAYER]);
						const attempt = computerGuess(prefix, s.wrong[PLAYER]);
						return guess(s, COMPUTER, attempt, Date.now());
					}),
				1500
			);
			return () => clearTimeout(timer);
		}
	}, [state]);

	useEffect(() => {
		if (state.deadline === null) return;
		const timer = setTimeout(
			() => setState((s) => handleTimeout(s, Date.now())),
			Math.max(0, state.deadline - Date.now()) + 50
		);
		return () => clearTimeout(timer);
	}, [state.deadline]);

	const send = useCallback((action: GameAction) => {
		const now = Date.now();
		setState((s) => {
			if (action.type === "setCountries") {
				return setCountries(s, PLAYER, action.countries, now);
			}
			if (action.type === "pass") return pass(s, PLAYER, now);
			if (action.type === "guess") return guess(s, PLAYER, action.country, now);
			return continueRound(s, PLAYER, now);
		});
	}, []);

	const view = useMemo(
		() => viewFor(state, PLAYER, Date.now(), language),
		[state, language]
	);

	return { view, send };
};

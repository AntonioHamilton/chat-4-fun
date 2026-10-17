import { useCallback, useEffect, useMemo, useState } from "react";
import { COUNTRIES_PER_PLAYER } from "../Constants/countries";
import { GameAction, GameState, Mode } from "../Types/game.types";
import { computerGuess } from "../Utils/computer";
import { randomCountries } from "../Utils/countries";
import {
	continueRound,
	createState,
	guess,
	handleTimeout,
	nextLetter,
	setCountries,
	viewFor
} from "../Utils/engine";
import { revealPrefix } from "../Utils/text";

const COMPUTER = 1;
const PLAYER = 0;

export const useLocalGame = (mode: Mode) => {
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

		if (state.giver === COMPUTER && !state.awaitingGuess) {
			const timer = setTimeout(
				() => setState((s) => nextLetter(s, COMPUTER, Date.now())),
				900
			);
			return () => clearTimeout(timer);
		}

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
				return setCountries(s, PLAYER, action.countries);
			}
			if (action.type === "nextLetter") return nextLetter(s, PLAYER, now);
			if (action.type === "guess") return guess(s, PLAYER, action.country, now);
			return continueRound(s, PLAYER, now);
		});
	}, []);

	const view = useMemo(() => viewFor(state, PLAYER, Date.now()), [state]);

	return { view, send };
};

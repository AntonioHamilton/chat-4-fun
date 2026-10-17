import { COUNTRIES } from "../Constants/countries";
import { normalize } from "./text";

export const computerGuess = (
	revealedPrefix: string,
	wrongGuesses: string[],
	random: () => number = Math.random
): string => {
	const prefix = normalize(revealedPrefix);
	const tried = new Set(wrongGuesses);
	const untried = COUNTRIES.filter((name) => !tried.has(name));
	const matching = untried.filter((name) => normalize(name).startsWith(prefix));
	const pool = matching.length > 0 ? matching : untried;
	return pool[Math.floor(random() * pool.length)];
};

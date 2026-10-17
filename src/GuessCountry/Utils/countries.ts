import { COUNTRIES } from "../Constants/countries";
import { normalize } from "./text";

const byKey = new Map(COUNTRIES.map((name) => [normalize(name), name]));

export const findCountry = (input: string): string | null =>
	byKey.get(normalize(input)) ?? null;

export const searchCountries = (query: string, exclude: string[] = []) => {
	const key = normalize(query);
	const excluded = new Set(exclude);
	const available = COUNTRIES.filter((name) => !excluded.has(name));
	if (!key) return available;

	const starts: string[] = [];
	const includes: string[] = [];
	for (const name of available) {
		const normalized = normalize(name);
		if (normalized.startsWith(key)) starts.push(name);
		else if (normalized.includes(key)) includes.push(name);
	}
	return [...starts, ...includes];
};

export const shuffle = <T>(items: T[], random: () => number = Math.random) => {
	const copy = [...items];
	for (let i = copy.length - 1; i > 0; i--) {
		const j = Math.floor(random() * (i + 1));
		[copy[i], copy[j]] = [copy[j], copy[i]];
	}
	return copy;
};

export const randomCountries = (
	amount: number,
	exclude: string[] = [],
	random: () => number = Math.random
): string[] => {
	const excluded = new Set(exclude);
	return shuffle(
		COUNTRIES.filter((name) => !excluded.has(name)),
		random
	).slice(0, amount);
};

import { COUNTRIES } from "@/Constants/countries";
import { COUNTRY_NAMES_EN } from "@/Constants/countryNames";
import { Language } from "@/Types/Language";
import { levenshtein, normalize } from "./text";

export const countryName = (
	canonical: string,
	language: Language = "PT_BR"
): string =>
	language === "EN_US" ? (COUNTRY_NAMES_EN[canonical] ?? canonical) : canonical;

const byKey = new Map(
	COUNTRIES.flatMap((name) => [
		[normalize(name), name] as const,
		[normalize(countryName(name, "EN_US")), name] as const
	])
);

const sortedByLanguage = (language: Language) =>
	language === "EN_US"
		? [...COUNTRIES].sort((a, b) =>
				countryName(a, language).localeCompare(countryName(b, language))
			)
		: COUNTRIES;

export const findCountry = (input: string): string | null =>
	byKey.get(normalize(input)) ?? null;

export const searchCountries = (
	query: string,
	exclude: string[] = [],
	language: Language = "PT_BR"
) => {
	const key = normalize(query);
	const excluded = new Set(exclude);
	const available = sortedByLanguage(language).filter(
		(name) => !excluded.has(name)
	);
	if (!key) return available;

	const starts: string[] = [];
	const includes: string[] = [];
	for (const name of available) {
		const normalized = normalize(countryName(name, language));
		if (normalized.startsWith(key)) starts.push(name);
		else if (normalized.includes(key)) includes.push(name);
	}
	return [...starts, ...includes];
};

const matchScore = (key: string, name: string): number => {
	if (name.startsWith(key)) return 0;
	if (name.includes(key)) return 1;

	const tolerance = key.length <= 4 ? 1 : 2;
	let best = Infinity;
	for (
		let length = Math.max(1, key.length - tolerance);
		length <= Math.min(name.length, key.length + tolerance);
		length++
	) {
		best = Math.min(best, levenshtein(key, name.slice(0, length)));
	}

	return best <= tolerance ? 2 + best : Infinity;
};

const SUGGESTION_LIMIT = 6;

export const suggestCountries = (
	query: string,
	language: Language = "PT_BR"
): string[] => {
	const key = normalize(query);
	if (!key) return [];

	const scored: [string, number][] = [];
	for (const name of sortedByLanguage(language)) {
		const score = Math.min(
			matchScore(key, normalize(countryName(name, language))),
			matchScore(key, normalize(countryName(name, "EN_US")))
		);
		if (score !== Infinity) scored.push([name, score]);
	}

	return scored
		.sort((a, b) => a[1] - b[1])
		.slice(0, SUGGESTION_LIMIT)
		.map(([name]) => name);
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

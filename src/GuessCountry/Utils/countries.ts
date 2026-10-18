import { COUNTRIES } from "../Constants/countries";
import { COUNTRY_NAMES_EN } from "../Constants/countryNames";
import { NameLanguage } from "../Types/game.types";
import { normalize } from "./text";

export const countryName = (
	canonical: string,
	language: NameLanguage = "PT_BR"
): string =>
	language === "EN_US" ? (COUNTRY_NAMES_EN[canonical] ?? canonical) : canonical;

const byKey = new Map(
	COUNTRIES.flatMap((name) => [
		[normalize(name), name] as const,
		[normalize(countryName(name, "EN_US")), name] as const
	])
);

const sortedByLanguage = (language: NameLanguage) =>
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
	language: NameLanguage = "PT_BR"
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

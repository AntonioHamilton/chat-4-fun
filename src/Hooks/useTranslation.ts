import { useEffect, useState } from "react";
import { Language } from "@/Types/Language";

const PARAM_LANGUAGES: Record<string, Language> = {
	pt: "PT_BR",
	en: "EN_US"
};

let languageParamConsumed = false;

const consumeLanguageParam = (): Language | null => {
	if (languageParamConsumed) return null;
	languageParamConsumed = true;
	const value = new URLSearchParams(window.location.search)
		.get("language")
		?.toLowerCase();
	const language = value ? PARAM_LANGUAGES[value] : undefined;
	if (!language) return null;

	try {
		localStorage.setItem("language", language);
	} catch {
		// ignore
	}
	return language;
};

export const useTranslation = () => {
	const [language, setLanguage] = useState<Language>("EN_US");

	useEffect(() => {
		const fromParam = consumeLanguageParam();
		if (fromParam) {
			setLanguage(fromParam);
		} else {
			try {
				const stored = localStorage.getItem("language");
				if (stored === "PT_BR" || stored === "EN_US") setLanguage(stored);
			} catch {
				setLanguage("EN_US");
			}
		}

		const handleChange = (event: Event) => {
			setLanguage((event as CustomEvent<Language>).detail);
		};

		window.addEventListener("languageChange", handleChange);
		return () => window.removeEventListener("languageChange", handleChange);
	}, []);

	return { language };
};

export const changeLanguage = (language: Language) => {
	try {
		localStorage.setItem("language", language);
	} catch {
		// ignore
	}

	window.dispatchEvent(
		new CustomEvent<Language>("languageChange", { detail: language })
	);
};

import { useEffect, useState } from "react";
import { Language } from "@/types/Language";

export const useTranslation = () => {
	const [language, setLanguage] = useState<Language>("EN_US");

	useEffect(() => {
		try {
			const stored = localStorage.getItem("language");
			if (stored === "PT_BR" || stored === "EN_US") setLanguage(stored);
		} catch {
			setLanguage("EN_US");
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

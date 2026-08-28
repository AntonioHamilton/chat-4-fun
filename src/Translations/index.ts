import { Language } from "@/types/Language";

const PT_BR = {
	tagline: "Uma biblioteca de jogos e experimentos feitos só por diversão",
	featured_heading: "Em Destaque",
	library_heading: "Biblioteca",
	play_now: "Jogar agora",
	portfolio_link: "Portfolio",
	language_pt: "Mudar para Português",
	language_en: "Switch to English"
};

const EN_US: typeof PT_BR = {
	tagline: "A library of games and experiments made just for fun",
	featured_heading: "Featured",
	library_heading: "Library",
	play_now: "Play now",
	portfolio_link: "Portfolio",
	language_pt: "Mudar para Português",
	language_en: "Switch to English"
};

export const translations: Record<Language, typeof PT_BR> = { PT_BR, EN_US };

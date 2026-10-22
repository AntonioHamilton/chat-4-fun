import { Language } from "@/Types/Language";

const PT_BR = {
	tagline: "Uma biblioteca de jogos e experimentos feitos só por diversão",
	featured_heading: "Em Destaque",
	library_heading: "Biblioteca",
	play_now: "Jogar agora",
	back_to_games: "Voltar aos jogos",
	portfolio_link: "Portfolio",
	language_pt: "Mudar para Português",
	language_en: "Switch to English",
	sound_enable: "Ativar som",
	sound_disable: "Desativar som"
};

const EN_US: typeof PT_BR = {
	tagline: "A library of games and experiments made just for fun",
	featured_heading: "Featured",
	library_heading: "Library",
	play_now: "Play now",
	back_to_games: "Back to games",
	portfolio_link: "Portfolio",
	language_pt: "Mudar para Português",
	language_en: "Switch to English",
	sound_enable: "Turn sound on",
	sound_disable: "Turn sound off"
};

export const translations: Record<Language, typeof PT_BR> = { PT_BR, EN_US };

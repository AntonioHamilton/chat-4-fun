import { Language } from "@/types/Language";
import { Game } from "@/types/Game";

const PT_BR: Game[] = [
	{
		id: "guess-the-country",
		title: "Adivinhe o País",
		path: "/guess-the-country",
		image: "/GuessCountry/logo.webp",
		description:
			"Escolha 5 países, revele letra por letra e descubra os do adversário primeiro. Contra o computador ou online com um amigo, em melhor de 3.",
		badges: ["Palavras", "Multiplayer", "MD3"],
		ribbon: "Novo"
	},
	{
		id: "flag-quiz",
		title: "Qual a bandeira?",
		path: "/flag-quiz",
		image: "/FlagQuiz/logo.webp",
		description:
			"Veja uma bandeira e diga o país. Cada acerto vale 1 ponto e um erro encerra a partida. Com tempo ou sem, e ranking separado por modo.",
		badges: ["Bandeiras", "Ranking", "Tempo"],
		ribbon: "Novo"
	}
];

const EN_US: Game[] = [
	{
		id: "guess-the-country",
		title: "Guess the Country",
		path: "/guess-the-country",
		image: "/GuessCountry/logo.webp",
		description:
			"Pick 5 countries, reveal them letter by letter and find your opponent's first. Versus the computer or online with a friend, best of 3.",
		badges: ["Words", "Multiplayer", "Bo3"],
		ribbon: "New"
	},
	{
		id: "flag-quiz",
		title: "Which flag?",
		path: "/flag-quiz",
		image: "/FlagQuiz/logo.webp",
		description:
			"Look at a flag and name the country. Each hit is 1 point and one miss ends the game. Timed or untimed, with a ranking for each mode.",
		badges: ["Flags", "Ranking", "Timed"],
		ribbon: "New"
	}
];

export const games: Record<Language, Game[]> = { PT_BR, EN_US };

export const featuredGameId = "guess-the-country";

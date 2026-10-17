import { Language } from "@/types/Language";
import { Game } from "@/types/Game";

const PT_BR: Game[] = [
	{
		id: "guess-the-country",
		title: "Adivinhe o País",
		path: "/guess-the-country",
		image: "/GuessCountry/logo.png",
		description:
			"Escolha 5 países, revele letra por letra e descubra os do adversário primeiro. Contra o computador ou online com um amigo, em melhor de 3.",
		badges: ["Palavras", "Multiplayer", "MD3"],
		ribbon: "Novo"
	},
	{
		id: "unmatched",
		title: "Unmatched",
		path: "/unmatched",
		image: "/Brasil%20Unmatched/logo.jpg",
		description:
			"Duelo tático de cartas entre Gon e Killua num tabuleiro em grid. Ataque, defenda, manobre e solte o Nen na hora certa.",
		badges: ["Duelo", "Tabuleiro", "Tático"],
		ribbon: "Novo"
	},
	{
		id: "gym-clicker",
		title: "Gym Clicker",
		path: "/gym-clicker",
		image: "/GymClicker/logo.jpg",
		description:
			"Clique, ganhe força e derrube chefões cada vez maiores. Um idle clicker de academia onde cada upgrade te deixa mais absurdo.",
		badges: ["Clicker", "Idle", "Chefão"]
	}
];

const EN_US: Game[] = [
	{
		id: "guess-the-country",
		title: "Guess the Country",
		path: "/guess-the-country",
		image: "/GuessCountry/logo.png",
		description:
			"Pick 5 countries, reveal them letter by letter and find your opponent's first. Versus the computer or online with a friend, best of 3.",
		badges: ["Words", "Multiplayer", "Bo3"],
		ribbon: "New"
	},
	{
		id: "unmatched",
		title: "Unmatched",
		path: "/unmatched",
		image: "/Brasil%20Unmatched/logo.jpg",
		description:
			"Tactical card duel between Gon and Killua on a grid board. Attack, defend, maneuver, and time your Nen right.",
		badges: ["Duel", "Board Game", "Tactical"],
		ribbon: "New"
	},
	{
		id: "gym-clicker",
		title: "Gym Clicker",
		path: "/gym-clicker",
		image: "/GymClicker/logo.jpg",
		description:
			"Click, get stronger, and take down bigger bosses. A gym idle clicker where every upgrade makes you more ridiculous.",
		badges: ["Clicker", "Idle", "Boss Fight"]
	}
];

export const games: Record<Language, Game[]> = { PT_BR, EN_US };

export const featuredGameId = "unmatched";

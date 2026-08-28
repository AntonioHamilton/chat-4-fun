import { Language } from "@/types/Language";
import { Game } from "@/types/Game";

const PT_BR: Game[] = [
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

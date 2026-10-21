import { Language } from "@/types/Language";

const PT_BR = {
	title: "Qual a bandeira?",
	subtitle:
		"Diga o país de cada bandeira. Cada acerto vale 1 ponto. Um erro e a partida termina.",
	timed: "Com Tempo",
	untimed: "Sem Tempo",
	timedHint: "10 segundos para cada bandeira",
	untimedHint: "Sem limite de tempo",
	ranking: "Ranking",
	menu: "Menu",
	score: "Pontos",
	timeLeft: "Tempo restante",
	flagLabel: "Bandeira a adivinhar",
	inputLabel: "Nome do país",
	inputPlaceholder: "Digite o nome do país",
	submit: "Responder",
	resultTitle: "Fim de jogo",
	missedFlag: "A bandeira era",
	nameLabel: "Seu nome",
	saveScore: "Salvar no ranking",
	playAgain: "Jogar de novo",
	rankingTimedTitle: "Com tempo",
	rankingUntimedTitle: "Sem tempo",
	rankingEmpty: "Ainda não há pontuações.",
	rankingLoading: "Carregando ranking...",
	rankingError:
		"Não foi possível carregar o ranking. Tente de novo em instantes.",
	timeUp: "Tempo esgotado",
	saving: "Salvando...",
	saveError: "Não foi possível salvar agora. Tente de novo.",
	position: "#",
	name: "Nome",
	points: "Pontos",
	date: "Data"
};

const EN_US: typeof PT_BR = {
	title: "Which flag?",
	subtitle:
		"Name the country of each flag. Each hit is 1 point. One miss and the game ends.",
	timed: "Timed",
	untimed: "Untimed",
	timedHint: "10 seconds for each flag",
	untimedHint: "No time limit",
	ranking: "Ranking",
	menu: "Menu",
	score: "Points",
	timeLeft: "Time left",
	flagLabel: "Flag to guess",
	inputLabel: "Country name",
	inputPlaceholder: "Type the country name",
	submit: "Answer",
	resultTitle: "Game over",
	missedFlag: "The flag was",
	nameLabel: "Your name",
	saveScore: "Save to ranking",
	playAgain: "Play again",
	rankingTimedTitle: "Timed",
	rankingUntimedTitle: "Untimed",
	rankingEmpty: "No scores yet.",
	rankingLoading: "Loading ranking...",
	rankingError: "Could not load the ranking. Try again in a moment.",
	timeUp: "Time's up",
	saving: "Saving...",
	saveError: "Could not save right now. Try again.",
	position: "#",
	name: "Name",
	points: "Points",
	date: "Date"
};

export const flagQuizTranslations: Record<Language, typeof PT_BR> = {
	PT_BR,
	EN_US
};

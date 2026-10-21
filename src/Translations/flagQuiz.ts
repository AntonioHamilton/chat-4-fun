import { Language } from "@/types/Language";

const PT_BR = {
	title: "Qual a bandeira?",
	subtitle:
		"Diga o país de cada bandeira. Cada acerto vale 1 ponto. Um erro e a partida termina.",
	play: "Jogar",
	playInfo:
		"Escolha um modo para começar. Cada acerto vale 1 ponto e um erro encerra a partida.",
	timed: "Com Tempo",
	timedInfo:
		"10 segundos para cada bandeira. Se o tempo acabar, a partida termina.",
	untimed: "Sem Tempo",
	untimedInfo: "Sem limite de tempo para responder. Um erro encerra a partida.",
	ranking: "Ranking",
	rankingInfo:
		"Veja as melhores pontuações de cada modo, da maior para a menor.",
	infoLabel: "Mais informações",
	back: "Voltar",
	menu: "Menu",
	score: "Pontos",
	timeLeft: "Tempo restante",
	correct: "Acertou!",
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
	play: "Play",
	playInfo:
		"Pick a mode to start. Each hit is 1 point and one miss ends the game.",
	timed: "Timed",
	timedInfo: "10 seconds for each flag. If time runs out, the game ends.",
	untimed: "Untimed",
	untimedInfo: "No time limit to answer. One miss ends the game.",
	ranking: "Ranking",
	rankingInfo: "See the best scores of each mode, from highest to lowest.",
	infoLabel: "More information",
	back: "Back",
	menu: "Menu",
	score: "Points",
	timeLeft: "Time left",
	correct: "Correct!",
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

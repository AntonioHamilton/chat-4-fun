import { useEffect, useState, type FormEvent } from "react";
import type { Deck } from "@/LendasBrasileiras/Types/deck";
import { decks } from "@/LendasBrasileiras/Constants/decks";
import { loadDeckId, saveDeckId } from "@/LendasBrasileiras/Utils/deckStorage";
import { LobbyBackground } from "@/LendasBrasileiras/Components/LobbyBackground/LobbyBackground";
import { LobbyEmblem } from "@/LendasBrasileiras/Components/LobbyEmblem/LobbyEmblem";
import * as SC from "./styled";

type LobbyProps = {
	onPlay: (deck: Deck, playerName: string) => void;
};

type Step = "name" | "mode" | "deck";

const deckThemes: Record<string, string> = {
	saci: "Mata e noite",
	capivara: "Rio e sol"
};

export const Lobby = ({ onPlay }: LobbyProps) => {
	const [step, setStep] = useState<Step>("name");
	const [nameInput, setNameInput] = useState("");
	const [playerName, setPlayerName] = useState("");
	const [deckId, setDeckId] = useState<string>(decks[0].id);

	useEffect(() => {
		const saved = loadDeckId();
		if (saved && decks.some((deck) => deck.id === saved)) setDeckId(saved);
	}, []);

	const selectDeck = (id: string) => {
		setDeckId(id);
		saveDeckId(id);
	};

	const selected = decks.find((deck) => deck.id === deckId) ?? decks[0];

	const submitName = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const name = nameInput.trim();
		if (!name) return;
		setPlayerName(name);
		setStep("mode");
	};

	return (
		<SC.Scene>
			<LobbyBackground />
			<SC.Content>
				<LobbyEmblem />
				<SC.Title>Lendas Brasileiras</SC.Title>
				<SC.Rule />

				{step === "name" && (
					<SC.Step as="form" onSubmit={submitName}>
						<SC.Question as="label" htmlFor="player-name">
							Qual é o seu nome?
						</SC.Question>
						<SC.NameInput
							id="player-name"
							autoFocus
							autoComplete="off"
							maxLength={20}
							value={nameInput}
							onChange={(event) => setNameInput(event.target.value)}
						/>
						<SC.PlayButton type="submit" disabled={!nameInput.trim()}>
							Seguir
						</SC.PlayButton>
					</SC.Step>
				)}

				{step === "mode" && (
					<SC.Step>
						<SC.Question>Como você quer jogar?</SC.Question>
						<SC.ChoiceList>
							<SC.ChoiceButton
								type="button"
								autoFocus
								onClick={() => setStep("deck")}
							>
								Contra o computador
							</SC.ChoiceButton>
							<SC.ChoiceButton type="button" disabled>
								Contra outro jogador
								<SC.ChoiceTheme>Em breve</SC.ChoiceTheme>
							</SC.ChoiceButton>
						</SC.ChoiceList>
						<SC.SecondaryButton type="button" onClick={() => setStep("name")}>
							Voltar
						</SC.SecondaryButton>
					</SC.Step>
				)}

				{step === "deck" && (
					<SC.Step>
						<SC.Question>Escolha seu deck</SC.Question>
						<SC.DeckList>
							{decks.map((deck) => (
								<SC.DeckButton
									key={deck.id}
									type="button"
									aria-pressed={deck.id === deckId}
									$selected={deck.id === deckId}
									onClick={() => selectDeck(deck.id)}
								>
									{deck.name}
									<SC.ChoiceTheme>{deckThemes[deck.id]}</SC.ChoiceTheme>
								</SC.DeckButton>
							))}
						</SC.DeckList>
						<SC.PlayButton
							type="button"
							onClick={() => onPlay(selected, playerName)}
						>
							Jogar
						</SC.PlayButton>
						<SC.SecondaryButton type="button" onClick={() => setStep("mode")}>
							Voltar
						</SC.SecondaryButton>
					</SC.Step>
				)}
			</SC.Content>
		</SC.Scene>
	);
};

import { useEffect, useState } from "react";
import type { Deck } from "@/LendasBrasileiras/Types/deck";
import { decks } from "@/LendasBrasileiras/Constants/decks";
import { loadDeckId, saveDeckId } from "@/LendasBrasileiras/Utils/deckStorage";
import * as SC from "./styled";

type LobbyProps = {
	onPlay: (deck: Deck) => void;
};

const deckThemes: Record<string, string> = {
	saci: "Mata e noite",
	capivara: "Rio e sol"
};

export const Lobby = ({ onPlay }: LobbyProps) => {
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

	return (
		<SC.Container>
			<SC.Title>Lendas Brasileiras</SC.Title>
			<div role="group" aria-label="Escolha seu deck" style={{ width: "100%" }}>
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
							<SC.DeckTheme>{deckThemes[deck.id]}</SC.DeckTheme>
						</SC.DeckButton>
					))}
				</SC.DeckList>
			</div>
			<SC.PlayButton type="button" onClick={() => onPlay(selected)}>
				Jogar contra o computador
			</SC.PlayButton>
			<SC.DisabledButton type="button" disabled>
				Multiplayer: Em breve
			</SC.DisabledButton>
		</SC.Container>
	);
};

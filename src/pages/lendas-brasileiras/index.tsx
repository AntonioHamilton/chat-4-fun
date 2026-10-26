import { useState } from "react";
import { GameLayout } from "@/Components/GameLayout/GameLayout";
import { pageBackground } from "@/styles/guess-country.styled";
import type { Deck } from "@/LendasBrasileiras/Types/deck";
import { decks } from "@/LendasBrasileiras/Constants/decks";
import { Lobby } from "@/LendasBrasileiras/Components/Lobby/Lobby";
import { Table } from "@/LendasBrasileiras/Components/Table/Table";

type Session =
	| { kind: "lobby" }
	| { kind: "playing"; deckA: Deck; deckB: Deck };

const LendasBrasileiras = () => {
	const [session, setSession] = useState<Session>({ kind: "lobby" });

	const play = (deck: Deck) => {
		const opponent = decks.find((item) => item.id !== deck.id) ?? deck;
		setSession({ kind: "playing", deckA: deck, deckB: opponent });
	};

	return (
		<GameLayout background={pageBackground}>
			{session.kind === "lobby" && <Lobby onPlay={play} />}
			{session.kind === "playing" && (
				<Table
					deckA={session.deckA}
					deckB={session.deckB}
					onExit={() => setSession({ kind: "lobby" })}
				/>
			)}
		</GameLayout>
	);
};

export default LendasBrasileiras;

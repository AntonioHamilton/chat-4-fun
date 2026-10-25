import { useCallback, useState } from "react";
import type { Card as CardData } from "@/LendasBrasileiras/Types/card";
import type { Deck } from "@/LendasBrasileiras/Types/deck";
import type { PlayerIndex } from "@/LendasBrasileiras/Types/match";
import type { CardSource, MenuOption } from "@/LendasBrasileiras/Types/ui";
import { phaseLabels, zoneLabels } from "@/LendasBrasileiras/Constants/labels";
import { Card } from "@/LendasBrasileiras/Components/Card/Card";
import { CardMenu } from "@/LendasBrasileiras/Components/CardMenu/CardMenu";
import { CardPreview } from "@/LendasBrasileiras/Components/CardPreview/CardPreview";
import { History } from "@/LendasBrasileiras/Components/History/History";
import { PlayerArea } from "@/LendasBrasileiras/Components/PlayerArea/PlayerArea";
import { useDragCard } from "@/LendasBrasileiras/Hooks/useDragCard";
import { useMatch } from "@/LendasBrasileiras/Hooks/useMatch";
import {
	getDestinations,
	isPlayMove
} from "@/LendasBrasileiras/Utils/destinations";
import * as SC from "./styled";

type TableProps = {
	deckA: Deck;
	deckB: Deck;
};

export const Table = ({ deckA, deckB }: TableProps) => {
	const {
		match,
		log,
		error,
		names,
		draw,
		tap,
		changeLife,
		nextPhase,
		clearUsage,
		moveTo
	} = useMatch(deckA, deckB);
	const [menu, setMenu] = useState<CardSource | null>(null);
	const [preview, setPreview] = useState<CardData | null>(null);

	const { drag, startDrag, consumeClick } = useDragCard({
		onDrop: moveTo,
		onLongPress: setPreview
	});

	const findCard = (source: CardSource): CardData | null =>
		match.players[source.playerIndex].zones[source.zone].find(
			(item) => item.instanceId === source.instanceId
		)?.card ?? null;

	const handleCardClick = useCallback(
		(source: CardSource) => {
			if (consumeClick()) return;
			setMenu(source);
		},
		[consumeClick]
	);

	const buildOptions = (source: CardSource, card: CardData): MenuOption[] => {
		const options: MenuOption[] = [];
		const player = match.players[source.playerIndex];
		if (
			source.zone === "lands" &&
			!player.tappedLands.includes(source.instanceId)
		)
			options.push({
				label: "Virar para gerar mana",
				onSelect: () => tap(source.playerIndex, source.instanceId)
			});
		for (const zone of getDestinations(card, source.zone)) {
			const label = isPlayMove(card, source.zone, zone)
				? card.type === "land"
					? "Jogar terreno"
					: `Lançar em ${zoneLabels[zone]}`
				: `Mover para ${zoneLabels[zone]}`;
			options.push({
				label,
				onSelect: () =>
					moveTo(source, { playerIndex: source.playerIndex, zone })
			});
		}
		options.push({ label: "Ampliar carta", onSelect: () => setPreview(card) });
		return options;
	};

	const menuCard = menu ? findCard(menu) : null;
	const activeName = names[match.activePlayer];

	const renderPlayer = (index: PlayerIndex, position: "top" | "bottom") => (
		<PlayerArea
			name={names[index]}
			player={match.players[index]}
			playerIndex={index}
			position={position}
			isActive={match.activePlayer === index}
			dragTarget={drag?.target ?? null}
			draggingId={drag?.source.instanceId ?? null}
			onDraw={() => draw(index)}
			onLifeChange={(delta) => changeLife(index, delta)}
			onClearUsage={() => clearUsage(index)}
			onCardPointerDown={startDrag}
			onCardClick={handleCardClick}
			onCardFocus={setPreview}
			onCardBlur={() => setPreview(null)}
		/>
	);

	return (
		<SC.Wrapper>
			<SC.Main>
				<SC.TurnBar>
					<span>
						Turno {match.turn} · Fase: {phaseLabels[match.phase]} · Vez de{" "}
						{activeName}
					</span>
					<SC.PhaseButton
						type="button"
						onClick={nextPhase}
						disabled={match.winner !== null}
					>
						Próxima fase
					</SC.PhaseButton>
				</SC.TurnBar>

				{match.winner !== null && (
					<SC.Message $kind="winner" role="status">
						Vitória de {names[match.winner]}
					</SC.Message>
				)}
				{error && (
					<SC.Message $kind="error" role="alert">
						{error}
					</SC.Message>
				)}

				{renderPlayer(1, "top")}
				{renderPlayer(0, "bottom")}
			</SC.Main>

			<History lines={log} />

			{menu && menuCard && (
				<CardMenu
					title={menuCard.name}
					options={buildOptions(menu, menuCard)}
					onClose={() => setMenu(null)}
				/>
			)}

			{preview && (
				<CardPreview card={preview} onClose={() => setPreview(null)} />
			)}

			{drag && (
				<SC.Ghost style={{ left: drag.x, top: drag.y }}>
					<Card card={drag.card} interactive={false} />
				</SC.Ghost>
			)}
		</SC.Wrapper>
	);
};

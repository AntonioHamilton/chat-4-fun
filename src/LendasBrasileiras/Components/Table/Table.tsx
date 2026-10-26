import { useCallback, useEffect, useState } from "react";
import type { Card as CardData } from "@/LendasBrasileiras/Types/card";
import type { Deck } from "@/LendasBrasileiras/Types/deck";
import type { PlayerIndex } from "@/LendasBrasileiras/Types/match";
import type {
	CardHandlers,
	CardSource,
	MenuOption
} from "@/LendasBrasileiras/Types/ui";
import type { ListZone } from "@/LendasBrasileiras/Types/zone";
import { phaseLabels, zoneLabels } from "@/LendasBrasileiras/Constants/labels";
import { Card } from "@/LendasBrasileiras/Components/Card/Card";
import { CardZoom } from "@/LendasBrasileiras/Components/CardZoom/CardZoom";
import { CardPreview } from "@/LendasBrasileiras/Components/CardPreview/CardPreview";
import { HistoryPanel } from "@/LendasBrasileiras/Components/HistoryPanel/HistoryPanel";
import { PlayerArea } from "@/LendasBrasileiras/Components/PlayerArea/PlayerArea";
import { OpponentBar } from "@/LendasBrasileiras/Components/OpponentBar/OpponentBar";
import { PlayerDock } from "@/LendasBrasileiras/Components/PlayerDock/PlayerDock";
import { ZoneList } from "@/LendasBrasileiras/Components/ZoneList/ZoneList";
import { useDragCard } from "@/LendasBrasileiras/Hooks/useDragCard";
import { useMatch } from "@/LendasBrasileiras/Hooks/useMatch";
import {
	getPlayLabel,
	getPlayZone
} from "@/LendasBrasileiras/Utils/destinations";
import { COMPUTER_PLAYER_INDEX } from "@/LendasBrasileiras/Constants/computer";
import * as SC from "./styled";

type TableProps = {
	deckA: Deck;
	deckB: Deck;
	onExit: () => void;
};

export const Table = ({ deckA, deckB, onExit }: TableProps) => {
	const {
		match,
		log,
		error,
		names,
		draw,
		tap,
		changeLife,
		passTurn,
		dismissError,
		clearUsage,
		moveTo,
		isComputerTurn
	} = useMatch(deckA, deckB, COMPUTER_PLAYER_INDEX);
	const [zoom, setZoom] = useState<CardSource | null>(null);
	const [list, setList] = useState<{
		playerIndex: PlayerIndex;
		zone: ListZone;
	} | null>(null);
	const [preview, setPreview] = useState<CardData | null>(null);

	useEffect(() => {
		const previous = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = previous;
		};
	}, []);

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
			dismissError();
			setPreview(null);
			setZoom(source);
		},
		[consumeClick, dismissError]
	);

	const zoomCard = zoom ? findCard(zoom) : null;

	useEffect(() => {
		if (zoom && !zoomCard) setZoom(null);
	}, [zoom, zoomCard]);

	const buildZoomActions = (
		source: CardSource,
		card: CardData
	): MenuOption[] => {
		const actions: MenuOption[] = [];
		const canAct =
			source.playerIndex !== COMPUTER_PLAYER_INDEX &&
			!isComputerTurn &&
			match.winner === null;
		if (!canAct) return actions;
		const player = match.players[source.playerIndex];
		if (source.zone === "hand" || source.zone === "command")
			actions.push({
				label: getPlayLabel(card),
				onSelect: () =>
					moveTo(source, {
						playerIndex: source.playerIndex,
						zone: getPlayZone(card)
					})
			});
		if (
			source.zone === "lands" &&
			!player.tappedLands.includes(source.instanceId)
		)
			actions.push({
				label: "Virar para gerar mana",
				onSelect: () => {
					tap(source.playerIndex, source.instanceId);
					setZoom(null);
				}
			});
		return actions;
	};

	const activeName = names[match.activePlayer];

	const getHandlers = (index: PlayerIndex): CardHandlers => ({
		dragTarget: drag?.target ?? null,
		draggingId: drag?.source.instanceId ?? null,
		locked: isComputerTurn || index === COMPUTER_PLAYER_INDEX,
		onCardPointerDown: startDrag,
		onCardClick: handleCardClick,
		onCardFocus: setPreview,
		onCardBlur: () => setPreview(null)
	});

	const opponentIndex = COMPUTER_PLAYER_INDEX;
	const playerIndex: PlayerIndex = opponentIndex === 0 ? 1 : 0;

	return (
		<>
			<SC.RotateNotice role="alert">
				<SC.RotateTitle>Gire o celular</SC.RotateTitle>
				<span>O jogo funciona na horizontal.</span>
			</SC.RotateNotice>

			<SC.Wrapper>
				<SC.TopArea>
					<OpponentBar
						name={names[opponentIndex]}
						player={match.players[opponentIndex]}
						isActive={match.activePlayer === opponentIndex}
						start={
							<SC.MenuButton type="button" onClick={onExit}>
								Menu
							</SC.MenuButton>
						}
						onOpenList={(zone) => setList({ playerIndex: opponentIndex, zone })}
						end={
							<SC.TurnInfo>
								Turno {match.turn} · {phaseLabels[match.phase]} · Vez de{" "}
								{activeName}
							</SC.TurnInfo>
						}
					/>
				</SC.TopArea>

				<SC.OpponentField>
					<PlayerArea
						name={names[opponentIndex]}
						player={match.players[opponentIndex]}
						playerIndex={opponentIndex}
						position="top"
						isActive={match.activePlayer === opponentIndex}
						handlers={getHandlers(opponentIndex)}
						onClearUsage={() => clearUsage(opponentIndex)}
					/>
				</SC.OpponentField>

				<SC.PlayerField>
					<PlayerArea
						name={names[playerIndex]}
						player={match.players[playerIndex]}
						playerIndex={playerIndex}
						position="bottom"
						isActive={match.activePlayer === playerIndex}
						handlers={getHandlers(playerIndex)}
						onClearUsage={() => clearUsage(playerIndex)}
					/>
				</SC.PlayerField>

				<HistoryPanel lines={log} />

				<SC.Bottom>
					<PlayerDock
						name={names[playerIndex]}
						player={match.players[playerIndex]}
						playerIndex={playerIndex}
						handlers={getHandlers(playerIndex)}
						onDraw={() => draw(playerIndex)}
						onLifeChange={(delta) => changeLife(playerIndex, delta)}
						onOpenList={(zone) => setList({ playerIndex, zone })}
					>
						<SC.PassButton
							type="button"
							onClick={passTurn}
							disabled={match.winner !== null || isComputerTurn}
						>
							Passar turno
						</SC.PassButton>
					</PlayerDock>
				</SC.Bottom>

				{(match.winner !== null || (error && !zoom)) && (
					<SC.Messages>
						{match.winner !== null && (
							<SC.Message $kind="winner" role="status">
								Vitória de {names[match.winner]}
							</SC.Message>
						)}
						{error && !zoom && (
							<SC.Message $kind="error" role="alert">
								{error}
							</SC.Message>
						)}
					</SC.Messages>
				)}
			</SC.Wrapper>

			{zoom && zoomCard && (
				<CardZoom
					card={zoomCard}
					actions={buildZoomActions(zoom, zoomCard)}
					error={error}
					onClose={() => setZoom(null)}
				/>
			)}

			{list && (
				<ZoneList
					title={`${zoneLabels[list.zone]} de ${names[list.playerIndex]}`}
					cards={match.players[list.playerIndex].zones[list.zone]}
					onClose={() => setList(null)}
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
		</>
	);
};

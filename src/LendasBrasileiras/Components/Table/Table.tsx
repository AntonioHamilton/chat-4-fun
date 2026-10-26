import { useCallback, useEffect, useState } from "react";
import type { Card as CardData } from "@/LendasBrasileiras/Types/card";
import type { Deck } from "@/LendasBrasileiras/Types/deck";
import type { PlayerIndex } from "@/LendasBrasileiras/Types/match";
import type {
	CardHandlers,
	CardSource,
	MenuOption
} from "@/LendasBrasileiras/Types/ui";
import { phaseLabels, zoneLabels } from "@/LendasBrasileiras/Constants/labels";
import { Card } from "@/LendasBrasileiras/Components/Card/Card";
import { CardMenu } from "@/LendasBrasileiras/Components/CardMenu/CardMenu";
import { CardPreview } from "@/LendasBrasileiras/Components/CardPreview/CardPreview";
import { History } from "@/LendasBrasileiras/Components/History/History";
import { PlayerArea } from "@/LendasBrasileiras/Components/PlayerArea/PlayerArea";
import { OpponentBar } from "@/LendasBrasileiras/Components/OpponentBar/OpponentBar";
import { PlayerDock } from "@/LendasBrasileiras/Components/PlayerDock/PlayerDock";
import { useDragCard } from "@/LendasBrasileiras/Hooks/useDragCard";
import { useMatch } from "@/LendasBrasileiras/Hooks/useMatch";
import {
	getDestinations,
	isPlayMove
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
		nextPhase,
		clearUsage,
		moveTo,
		isComputerTurn
	} = useMatch(deckA, deckB, COMPUTER_PLAYER_INDEX);
	const [menu, setMenu] = useState<CardSource | null>(null);
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

				<SC.Side>
					<History lines={log} />
				</SC.Side>

				<SC.Bottom>
					<PlayerDock
						name={names[playerIndex]}
						player={match.players[playerIndex]}
						playerIndex={playerIndex}
						handlers={getHandlers(playerIndex)}
						onDraw={() => draw(playerIndex)}
						onLifeChange={(delta) => changeLife(playerIndex, delta)}
					>
						<SC.PassButton
							type="button"
							onClick={nextPhase}
							disabled={match.winner !== null || isComputerTurn}
						>
							Passar turno
						</SC.PassButton>
					</PlayerDock>
				</SC.Bottom>

				{(match.winner !== null || error) && (
					<SC.Messages>
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
					</SC.Messages>
				)}
			</SC.Wrapper>

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
		</>
	);
};

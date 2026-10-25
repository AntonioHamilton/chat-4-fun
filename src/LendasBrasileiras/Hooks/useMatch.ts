import { useCallback, useMemo, useState } from "react";
import type { Deck } from "@/LendasBrasileiras/Types/deck";
import type {
	Match,
	MoveResult,
	PlayerIndex
} from "@/LendasBrasileiras/Types/match";
import type { CardSource, DropTarget } from "@/LendasBrasileiras/Types/ui";
import { phaseLabels, zoneLabels } from "@/LendasBrasileiras/Constants/labels";
import {
	getDestinations,
	isPlayMove
} from "@/LendasBrasileiras/Utils/destinations";
import {
	adjustLife,
	advancePhase,
	castCard,
	createMatch,
	drawCard,
	moveCard,
	playLand,
	resolveUsage,
	tapLand
} from "@/LendasBrasileiras/Utils/engine/match";

const MAX_LOG_LINES = 20;

type MatchState = {
	match: Match;
	log: string[];
	error: string | null;
};

type Outcome = { result: MoveResult; entry: string };

const failure = (message: string): Outcome => ({
	result: { ok: false, error: { code: "wrong_zone", message } },
	entry: ""
});

const success = (match: Match, entry: string): Outcome => ({
	result: { ok: true, match },
	entry
});

export const useMatch = (deckA: Deck, deckB: Deck) => {
	const names = useMemo<[string, string]>(
		() => [`Jogador 1 (${deckA.name})`, `Jogador 2 (${deckB.name})`],
		[deckA.name, deckB.name]
	);

	const [state, setState] = useState<MatchState>(() => ({
		match: createMatch(deckA, deckB),
		log: ["Partida iniciada"],
		error: null
	}));

	const apply = useCallback((compute: (match: Match) => Outcome) => {
		setState((prev) => {
			const { result, entry } = compute(prev.match);
			if (!result.ok) return { ...prev, error: result.error.message };
			return {
				match: result.match,
				log: [`T${prev.match.turn}: ${entry}`, ...prev.log].slice(
					0,
					MAX_LOG_LINES
				),
				error: null
			};
		});
	}, []);

	const draw = useCallback(
		(index: PlayerIndex) =>
			apply((match) => {
				const result = drawCard(match, index);
				if (result.ok && result.match.winner !== null)
					return {
						result,
						entry: `${names[index]} não tem cartas e perdeu`
					};
				return { result, entry: `${names[index]} comprou uma carta` };
			}),
		[apply, names]
	);

	const tap = useCallback(
		(index: PlayerIndex, instanceId: string) =>
			apply((match) => {
				const found = match.players[index].zones.lands.find(
					(item) => item.instanceId === instanceId
				);
				return {
					result: tapLand(match, index, instanceId),
					entry: `${names[index]} virou ${found?.card.name ?? "terreno"}`
				};
			}),
		[apply, names]
	);

	const changeLife = useCallback(
		(index: PlayerIndex, delta: number) =>
			apply((match) => {
				const next = adjustLife(match, index, delta);
				return success(
					next,
					`${names[index]} agora tem ${next.players[index].life} de vida`
				);
			}),
		[apply, names]
	);

	const nextPhase = useCallback(
		() =>
			apply((match) => {
				const result = advancePhase(match);
				if (!result.ok) return { result, entry: "" };
				const label = phaseLabels[result.match.phase];
				const turnChanged = result.match.turn !== match.turn;
				return {
					result,
					entry: turnChanged
						? `Turno de ${names[result.match.activePlayer]}: ${label}`
						: `Fase: ${label}`
				};
			}),
		[apply, names]
	);

	const clearUsage = useCallback(
		(index: PlayerIndex) =>
			apply((match) =>
				success(
					resolveUsage(match, index),
					`${names[index]} enviou a área de uso ao cemitério`
				)
			),
		[apply, names]
	);

	const moveTo = useCallback(
		(source: CardSource, target: DropTarget) => {
			if (
				source.playerIndex === target.playerIndex &&
				source.zone === target.zone
			)
				return;
			apply((match) => {
				if (source.playerIndex !== target.playerIndex)
					return failure("Só é possível mover para as suas próprias zonas");
				const index = source.playerIndex;
				const instance = match.players[index].zones[source.zone].find(
					(item) => item.instanceId === source.instanceId
				);
				if (!instance) return failure("Carta não encontrada");
				const card = instance.card;
				if (!getDestinations(card, source.zone).includes(target.zone))
					return failure(
						`${card.name} não pode ir para ${zoneLabels[target.zone]}`
					);
				if (isPlayMove(card, source.zone, target.zone)) {
					const result =
						card.type === "land"
							? playLand(match, index, source.instanceId)
							: castCard(match, index, source.instanceId);
					const verb = card.type === "land" ? "jogou o terreno" : "lançou";
					return { result, entry: `${names[index]} ${verb} ${card.name}` };
				}
				return {
					result: moveCard(match, index, source.instanceId, target.zone),
					entry: `${names[index]} moveu ${card.name} para ${zoneLabels[target.zone]}`
				};
			});
		},
		[apply, names]
	);

	return {
		match: state.match,
		log: state.log,
		error: state.error,
		names,
		draw,
		tap,
		changeLife,
		nextPhase,
		clearUsage,
		moveTo
	};
};

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Deck } from "@/LendasBrasileiras/Types/deck";
import type {
	Match,
	MoveResult,
	PlayerIndex
} from "@/LendasBrasileiras/Types/match";
import type { CardSource, DropTarget } from "@/LendasBrasileiras/Types/ui";
import { phaseLabels, zoneLabels } from "@/LendasBrasileiras/Constants/labels";
import { COMPUTER_STEP_DELAY_MS } from "@/LendasBrasileiras/Constants/computer";
import {
	playComputerStep,
	type AiStep
} from "@/LendasBrasileiras/Utils/ai/computerPlayer";
import {
	getDestinations,
	isPlayMove
} from "@/LendasBrasileiras/Utils/destinations";
import {
	advancePhase,
	castCard,
	createMatch,
	moveCard,
	passTurn,
	playLand,
	resolveUsage
} from "@/LendasBrasileiras/Utils/engine/match";

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

const describeStep = (step: AiStep, name: string): string => {
	const { action } = step;
	if (action.kind === "playLand")
		return `${name} jogou o terreno ${action.cardName}`;
	if (action.kind === "cast") return `${name} lançou ${action.cardName}`;
	return "";
};

export const useMatch = (
	deckA: Deck,
	deckB: Deck,
	computerIndex: PlayerIndex | null = null
) => {
	const names = useMemo<[string, string]>(
		() => [
			`Jogador 1 (${deckA.name})`,
			computerIndex === 1
				? `Computador (${deckB.name})`
				: `Jogador 2 (${deckB.name})`
		],
		[deckA.name, deckB.name, computerIndex]
	);

	const [state, setState] = useState<MatchState>(() => ({
		match: createMatch(deckA, deckB),
		log: ["Partida iniciada"],
		error: null
	}));

	const apply = useCallback(
		(compute: (match: Match) => Outcome, index?: PlayerIndex) => {
			setState((prev) => {
				if (
					computerIndex !== null &&
					(prev.match.activePlayer === computerIndex || index === computerIndex)
				)
					return { ...prev, error: "Aguarde: é a vez do computador" };
				const { result, entry } = compute(prev.match);
				if (!result.ok) return { ...prev, error: result.error.message };
				return {
					match: result.match,
					log: [`T${prev.match.turn}: ${entry}`, ...prev.log],
					error: null
				};
			});
		},
		[computerIndex]
	);

	const isComputerTurn =
		computerIndex !== null &&
		state.match.winner === null &&
		state.match.activePlayer === computerIndex;

	useEffect(() => {
		if (!isComputerTurn || computerIndex === null) return undefined;
		const timer = window.setTimeout(() => {
			setState((prev) => {
				if (
					prev.match.winner !== null ||
					prev.match.activePlayer !== computerIndex
				)
					return prev;
				const step = playComputerStep(prev.match, computerIndex);
				let nextMatch = step.match;
				if (
					step.action.kind === "pass" &&
					nextMatch.winner === null &&
					nextMatch.activePlayer !== computerIndex &&
					nextMatch.phase === "draw"
				) {
					const entered = advancePhase(nextMatch);
					if (entered.ok) nextMatch = entered.match;
				}
				let entry = describeStep(step, names[computerIndex]);
				if (step.action.kind === "pass") {
					entry =
						nextMatch.turn !== prev.match.turn
							? `Turno de ${names[nextMatch.activePlayer]}: ${phaseLabels[nextMatch.phase]}`
							: `Fase: ${phaseLabels[nextMatch.phase]}`;
					if (nextMatch.winner !== null)
						entry = `${names[nextMatch.activePlayer]} não tem cartas e perdeu`;
				}
				return {
					match: nextMatch,
					log: [`T${prev.match.turn}: ${entry}`, ...prev.log],
					error: null
				};
			});
		}, COMPUTER_STEP_DELAY_MS);
		return () => window.clearTimeout(timer);
	}, [isComputerTurn, computerIndex, state.match, names]);

	const pass = useCallback(
		() =>
			apply((match) => {
				const result = passTurn(match);
				if (!result.ok) return { result, entry: "" };
				const next = result.match;
				return {
					result,
					entry:
						next.winner !== null
							? `${names[next.activePlayer]} não tem cartas e perdeu`
							: `Turno de ${names[next.activePlayer]}: ${phaseLabels[next.phase]}`
				};
			}),
		[apply, names]
	);

	const dismissError = useCallback(
		() => setState((prev) => (prev.error ? { ...prev, error: null } : prev)),
		[]
	);

	const clearUsage = useCallback(
		(index: PlayerIndex) =>
			apply(
				(match) => ({
					result: resolveUsage(match, index),
					entry: `${names[index]} enviou a área de uso ao cemitério`
				}),
				index
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
			}, source.playerIndex);
		},
		[apply, names]
	);

	return {
		match: state.match,
		log: state.log,
		error: state.error,
		names,
		isComputerTurn,
		passTurn: pass,
		dismissError,
		clearUsage,
		moveTo
	};
};

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

const describeStep = (step: AiStep, name: string): string => {
	const { action } = step;
	if (action.kind === "playLand")
		return `${name} jogou o terreno ${action.cardName}`;
	if (action.kind === "tap") return `${name} virou ${action.cardName}`;
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
					log: [`T${prev.match.turn}: ${entry}`, ...prev.log].slice(
						0,
						MAX_LOG_LINES
					),
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
				let entry = describeStep(step, names[computerIndex]);
				if (step.action.kind === "pass") {
					entry =
						step.match.turn !== prev.match.turn
							? `Turno de ${names[step.match.activePlayer]}: ${phaseLabels[step.match.phase]}`
							: `Fase: ${phaseLabels[step.match.phase]}`;
					if (step.match.winner !== null)
						entry = `${names[step.match.activePlayer]} não tem cartas e perdeu`;
				}
				return {
					match: step.match,
					log: [`T${prev.match.turn}: ${entry}`, ...prev.log].slice(
						0,
						MAX_LOG_LINES
					),
					error: null
				};
			});
		}, COMPUTER_STEP_DELAY_MS);
		return () => window.clearTimeout(timer);
	}, [isComputerTurn, computerIndex, state.match, names]);

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
			}, index),
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
			}, index),
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
			}, index),
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
			apply(
				(match) =>
					success(
						resolveUsage(match, index),
						`${names[index]} enviou a área de uso ao cemitério`
					),
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
		draw,
		tap,
		changeLife,
		nextPhase,
		clearUsage,
		moveTo
	};
};

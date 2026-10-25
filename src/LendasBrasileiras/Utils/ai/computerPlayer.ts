import type { Card } from "@/LendasBrasileiras/Types/card";
import type {
	Match,
	MoveResult,
	PlayerIndex
} from "@/LendasBrasileiras/Types/match";
import type { CardInstance, Player } from "@/LendasBrasileiras/Types/player";
import {
	advancePhase,
	castCard,
	playLand,
	resolveUsage,
	tapLand
} from "../engine/match";
import { spendMana } from "../engine/mana";

export type AiAction =
	| { kind: "playLand"; instanceId: string; cardName: string }
	| { kind: "tap"; instanceId: string; cardName: string }
	| { kind: "cast"; instanceId: string; cardName: string }
	| { kind: "pass" };

export type AiStep = { match: Match; action: AiAction };

const totalCost = (card: Card): number =>
	Object.values(card.cost).reduce((sum, value) => sum + (value ?? 0), 0);

const mainPhases = ["main1", "main2"];

export const chooseAction = (match: Match, index: PlayerIndex): AiAction => {
	const pass: AiAction = { kind: "pass" };
	if (match.winner !== null || match.activePlayer !== index) return pass;
	if (!mainPhases.includes(match.phase)) return pass;
	const player: Player = match.players[index];

	if (!player.landPlayedThisTurn) {
		const land: CardInstance | undefined = player.zones.hand.find(
			(item) => item.card.type === "land"
		);
		if (land)
			return {
				kind: "playLand",
				instanceId: land.instanceId,
				cardName: land.card.name
			};
	}

	const untapped: CardInstance[] = player.zones.lands.filter(
		(item) => !player.tappedLands.includes(item.instanceId)
	);
	const potential = { ...player.manaPool };
	for (const land of untapped) {
		const color = land.card.produces;
		if (color) potential[color] += 1;
	}

	const candidates: CardInstance[] = [
		...player.zones.hand.filter((item) => item.card.type !== "land"),
		...player.zones.command
	]
		.filter((item) => spendMana(potential, item.card.cost) !== null)
		.sort((a, b) => totalCost(b.card) - totalCost(a.card));
	const target: CardInstance | undefined = candidates[0];
	if (!target) return pass;

	if (spendMana(player.manaPool, target.card.cost) !== null)
		return {
			kind: "cast",
			instanceId: target.instanceId,
			cardName: target.card.name
		};

	const land: CardInstance | undefined = untapped[0];
	if (!land) return pass;
	return { kind: "tap", instanceId: land.instanceId, cardName: land.card.name };
};

const execute = (
	match: Match,
	index: PlayerIndex,
	action: AiAction
): MoveResult => {
	if (action.kind === "playLand")
		return playLand(match, index, action.instanceId);
	if (action.kind === "tap") return tapLand(match, index, action.instanceId);
	if (action.kind === "cast") {
		const result: MoveResult = castCard(match, index, action.instanceId);
		return result.ok
			? { ok: true, match: resolveUsage(result.match, index) }
			: result;
	}
	return advancePhase(match);
};

export const playComputerStep = (match: Match, index: PlayerIndex): AiStep => {
	const action: AiAction = chooseAction(match, index);
	const result: MoveResult = execute(match, index, action);
	if (result.ok) return { match: result.match, action };
	const fallback: MoveResult = advancePhase(match);
	return {
		match: fallback.ok ? fallback.match : match,
		action: { kind: "pass" }
	};
};

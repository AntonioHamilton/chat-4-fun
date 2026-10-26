import assert from "node:assert/strict";
import { describe, it } from "node:test";
import type { Card } from "@/LendasBrasileiras/Types/card";
import type { Deck } from "@/LendasBrasileiras/Types/deck";
import type { Match, MoveResult } from "@/LendasBrasileiras/Types/match";
import { castCard, createMatch, drawCard, moveCard, playLand } from "./match";

const land = (id: string): Card => ({
	id,
	name: id,
	type: "land",
	cost: {},
	produces: "green",
	art: null
});

const commander: Card = {
	id: "commander",
	name: "commander",
	type: "commander",
	cost: { green: 3 },
	power: 4,
	toughness: 4,
	art: null
};

const cheapCreature: Card = {
	id: "cheap",
	name: "cheap",
	type: "creature",
	cost: { green: 1 },
	power: 1,
	toughness: 1,
	art: null
};

const deck = (size: number, extra: Card[] = []): Deck => ({
	id: "test",
	name: "test",
	cards: [...Array.from({ length: size }, (_, i) => land(`l${i}`)), ...extra],
	commander
});

const noShuffle = (): number => 0.999999;

const unwrap = (result: MoveResult): Match => {
	assert.equal(result.ok, true);
	if (!result.ok) throw new Error("unreachable");
	return result.match;
};

const finishedMatch = (): Match => {
	const match: Match = createMatch(deck(7), deck(12), noShuffle);
	const over: Match = unwrap(drawCard(match, 0));
	assert.equal(over.winner, 1);
	return over;
};

describe("regression: lendas brasileiras", () => {
	it("rejects moveCard after the match is over", () => {
		const match: Match = finishedMatch();
		const cardId: string = match.players[0].zones.hand[0].instanceId;
		const result: MoveResult = moveCard(match, 0, cardId, "graveyard");
		assert.equal(result.ok, false);
		if (!result.ok) assert.equal(result.error.code, "match_over");
	});

	it("drops a tapped land from tappedLands when it leaves the lands zone", () => {
		let match: Match = createMatch(
			deck(11, [cheapCreature]),
			deck(12),
			noShuffle
		);
		for (let i = 0; i < 5; i++) match = unwrap(drawCard(match, 0));
		const hand = match.players[0].zones.hand;
		const landId: string = hand.find(
			(item) => item.card.type === "land"
		)!.instanceId;
		const creatureId: string = hand.find(
			(item) => item.card.type === "creature"
		)!.instanceId;
		match = unwrap(playLand(match, 0, landId));
		match = unwrap(castCard(match, 0, creatureId));
		assert.equal(match.players[0].tappedLands.length, 1);
		match = unwrap(moveCard(match, 0, landId, "graveyard"));
		const player = match.players[0];
		assert.ok(
			player.tappedLands.length <= player.zones.lands.length,
			`tappedLands=${player.tappedLands.length} lands=${player.zones.lands.length}`
		);
	});
});

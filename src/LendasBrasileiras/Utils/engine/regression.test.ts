import assert from "node:assert/strict";
import { describe, it } from "node:test";
import type { Card } from "@/LendasBrasileiras/Types/card";
import type { Deck } from "@/LendasBrasileiras/Types/deck";
import type { Match, MoveResult } from "@/LendasBrasileiras/Types/match";
import {
	adjustLife,
	createMatch,
	drawCard,
	moveCard,
	playLand,
	tapLand
} from "./match";

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

const deck = (size: number): Deck => ({
	id: "test",
	name: "test",
	cards: Array.from({ length: size }, (_, i) => land(`l${i}`)),
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

	it("keeps life unchanged after the match is over", () => {
		const match: Match = finishedMatch();
		const result: MoveResult = adjustLife(match, 0, -1);
		assert.equal(result.ok, false);
		if (!result.ok) assert.equal(result.error.code, "match_over");
	});

	it("drops a tapped land from tappedLands when it leaves the lands zone", () => {
		let match: Match = createMatch(deck(12), deck(12), noShuffle);
		const landId: string = match.players[0].zones.hand[0].instanceId;
		match = unwrap(playLand(match, 0, landId));
		match = unwrap(tapLand(match, 0, landId));
		match = unwrap(moveCard(match, 0, landId, "graveyard"));
		const player = match.players[0];
		assert.ok(
			player.tappedLands.length <= player.zones.lands.length,
			`tappedLands=${player.tappedLands.length} lands=${player.zones.lands.length}`
		);
	});
});

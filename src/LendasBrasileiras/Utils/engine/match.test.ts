import assert from "node:assert/strict";
import { describe, it } from "node:test";
import type { Card } from "@/LendasBrasileiras/Types/card";
import type { Deck } from "@/LendasBrasileiras/Types/deck";
import type { Match, MoveResult } from "@/LendasBrasileiras/Types/match";
import {
	advancePhase,
	castCard,
	createMatch,
	drawCard,
	moveCard,
	passTurn,
	playLand,
	resolveUsage,
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

const creature: Card = {
	id: "creature",
	name: "creature",
	type: "creature",
	cost: { green: 1, colorless: 1 },
	power: 2,
	toughness: 2,
	art: null
};

const instant: Card = {
	id: "instant",
	name: "instant",
	type: "instant",
	cost: { green: 1 },
	art: null
};

const commander: Card = {
	id: "commander",
	name: "commander",
	type: "commander",
	cost: { green: 3 },
	power: 4,
	toughness: 4,
	art: null
};

const makeDeck = (cards: Card[]): Deck => ({
	id: "test",
	name: "test",
	cards,
	commander
});

const noShuffle = (): number => 0.999999;

const fullDeck = (): Deck =>
	makeDeck([
		land("l1"),
		land("l2"),
		land("l3"),
		land("l4"),
		land("l5"),
		land("l6"),
		land("l7"),
		creature,
		instant,
		land("l8")
	]);

const unwrap = (result: MoveResult): Match => {
	assert.equal(result.ok, true);
	if (!result.ok) throw new Error("unreachable");
	return result.match;
};

const handIdOf = (match: Match, cardId: string): string => {
	const found = match.players[0].zones.hand.find(
		(item) => item.card.id === cardId
	);
	if (!found) throw new Error(`card ${cardId} not in hand`);
	return found.instanceId;
};

const matchWithMana = (lands: number): Match => {
	let match: Match = createMatch(fullDeck(), fullDeck(), noShuffle);
	match = unwrap(drawCard(match, 0));
	match = unwrap(drawCard(match, 0));
	match = unwrap(drawCard(match, 0));
	const landIds: string[] = match.players[0].zones.hand
		.filter((item) => item.card.type === "land")
		.map((item) => item.instanceId)
		.slice(0, lands);
	for (const id of landIds) {
		match = unwrap(moveCard(match, 0, id, "lands"));
		match = unwrap(tapLand(match, 0, id));
	}
	return match;
};

describe("engine", () => {
	it("creates a match with 7 cards in hand and commander in command zone", () => {
		const match: Match = createMatch(fullDeck(), fullDeck(), noShuffle);
		for (const player of match.players) {
			assert.equal(player.zones.hand.length, 7);
			assert.equal(player.zones.library.length, 3);
			assert.equal(player.zones.command.length, 1);
			assert.equal(player.zones.command[0].card.id, "commander");
			assert.equal(player.life, 40);
		}
	});

	it("draws a card without mutating the previous state", () => {
		const match: Match = createMatch(fullDeck(), fullDeck(), noShuffle);
		const next: Match = unwrap(drawCard(match, 0));
		assert.equal(next.players[0].zones.hand.length, 8);
		assert.equal(match.players[0].zones.hand.length, 7);
	});

	it("fails to play two lands in the same turn", () => {
		let match: Match = createMatch(fullDeck(), fullDeck(), noShuffle);
		const lands = match.players[0].zones.hand.filter(
			(item) => item.card.type === "land"
		);
		match = unwrap(playLand(match, 0, lands[0].instanceId));
		const second: MoveResult = playLand(match, 0, lands[1].instanceId);
		assert.equal(second.ok, false);
		if (!second.ok) assert.equal(second.error.code, "land_already_played");
	});

	it("fails to cast with insufficient mana", () => {
		const match: Match = matchWithMana(1);
		const result: MoveResult = castCard(match, 0, handIdOf(match, "creature"));
		assert.equal(result.ok, false);
		if (!result.ok) assert.equal(result.error.code, "insufficient_mana");
	});

	it("casts a creature with enough mana", () => {
		const match: Match = matchWithMana(2);
		const next: Match = unwrap(castCard(match, 0, handIdOf(match, "creature")));
		assert.equal(next.players[0].zones.battlefield.length, 1);
		assert.equal(next.players[0].zones.battlefield[0].card.id, "creature");
		assert.equal(next.players[0].manaPool.green, 0);
	});

	it("moves an instant to the graveyard after use", () => {
		const match: Match = matchWithMana(1);
		const used: Match = unwrap(castCard(match, 0, handIdOf(match, "instant")));
		assert.equal(used.players[0].zones.usage.length, 1);
		const resolved: Match = unwrap(resolveUsage(used, 0));
		assert.equal(resolved.players[0].zones.usage.length, 0);
		assert.equal(resolved.players[0].zones.graveyard[0].card.id, "instant");
	});

	const opponentTurnWithMana = (): Match => {
		let match: Match = createMatch(fullDeck(), fullDeck(), noShuffle);
		for (let i = 0; i < 4; i++) match = unwrap(advancePhase(match));
		assert.equal(match.activePlayer, 1);
		for (let i = 0; i < 3; i++) match = unwrap(drawCard(match, 0));
		const landId: string = match.players[0].zones.hand.filter(
			(item) => item.card.type === "land"
		)[0].instanceId;
		match = unwrap(moveCard(match, 0, landId, "lands"));
		return unwrap(tapLand(match, 0, landId));
	};

	it("casts an instant during the opponent's turn", () => {
		const match: Match = opponentTurnWithMana();
		const next: Match = unwrap(castCard(match, 0, handIdOf(match, "instant")));
		assert.equal(next.players[0].zones.usage.length, 1);
		assert.equal(next.players[0].zones.usage[0].card.id, "instant");
	});

	it("fails to cast a non-instant during the opponent's turn", () => {
		const match: Match = opponentTurnWithMana();
		const result: MoveResult = castCard(match, 0, handIdOf(match, "creature"));
		assert.equal(result.ok, false);
		if (!result.ok) assert.equal(result.error.code, "not_active_player");
	});

	it("loses when drawing from an empty library", () => {
		let match: Match = createMatch(
			makeDeck(Array.from({ length: 7 }, (_, i) => land(`l${i}`))),
			fullDeck(),
			noShuffle
		);
		assert.equal(match.players[0].zones.library.length, 0);
		match = unwrap(drawCard(match, 0));
		assert.equal(match.winner, 1);
	});

	it("passes the turn through the phases and draws for the next player", () => {
		let match: Match = createMatch(fullDeck(), fullDeck(), noShuffle);
		const phases: string[] = [];
		for (let i = 0; i < 4; i++) {
			match = unwrap(advancePhase(match));
			phases.push(match.phase);
		}
		assert.deepEqual(phases, ["main2", "end", "draw", "main1"]);
		assert.equal(match.activePlayer, 1);
		assert.equal(match.players[1].zones.hand.length, 8);
	});

	it("passes the whole turn to the opponent in the main phase", () => {
		const match: Match = createMatch(fullDeck(), fullDeck(), noShuffle);
		const next: Match = unwrap(passTurn(match));
		assert.equal(next.activePlayer, 1);
		assert.equal(next.phase, "main1");
		assert.equal(next.turn, 2);
	});

	it("fails to pass the turn after the match is over", () => {
		const match: Match = {
			...createMatch(fullDeck(), fullDeck(), noShuffle),
			winner: 1
		};
		const result: MoveResult = passTurn(match);
		assert.equal(result.ok, false);
		if (!result.ok) assert.equal(result.error.code, "match_over");
	});

	it("draws a card for the new active player when passing the turn", () => {
		const match: Match = createMatch(fullDeck(), fullDeck(), noShuffle);
		const next: Match = unwrap(passTurn(match));
		assert.equal(next.players[1].zones.hand.length, 8);
		assert.equal(next.players[0].zones.hand.length, 7);
	});
});

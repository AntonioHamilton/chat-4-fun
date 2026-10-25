import assert from "node:assert/strict";
import { describe, it } from "node:test";
import type { Card } from "@/LendasBrasileiras/Types/card";
import type { Deck } from "@/LendasBrasileiras/Types/deck";
import type { Match } from "@/LendasBrasileiras/Types/match";
import { chooseAction, playComputerStep } from "../ai/computerPlayer";
import { createMatch } from "./match";

const land = (id: string): Card => ({
	id,
	name: id,
	type: "land",
	cost: {},
	produces: "green",
	art: null
});

const creature = (id: string): Card => ({
	id,
	name: id,
	type: "creature",
	cost: { green: 2 },
	power: 1,
	toughness: 1,
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
	cards: Array.from({ length: size }, (_, i) =>
		i % 2 === 0 ? land(`l${i}`) : creature(`c${i}`)
	),
	commander
});

const noShuffle = (): number => 0.999999;

describe("computer player smoke", () => {
	it("passes when it is not the computer's turn", () => {
		const match: Match = createMatch(deck(20), deck(20), noShuffle);
		assert.equal(match.activePlayer, 0);
		assert.equal(chooseAction(match, 1).kind, "pass");
	});

	it("plays a full match against itself until someone loses", () => {
		let match: Match = createMatch(deck(14), deck(14), noShuffle);
		let steps = 0;
		while (match.winner === null && steps < 5000) {
			match = playComputerStep(match, match.activePlayer).match;
			steps++;
		}
		assert.notEqual(match.winner, null, `sem vencedor após ${steps} passos`);
	});

	it("never changes the opponent's zones during its own step", () => {
		let match: Match = createMatch(deck(30), deck(30), noShuffle);
		for (let i = 0; i < 200 && match.winner === null; i++) {
			const active = match.activePlayer;
			const other = active === 0 ? 1 : 0;
			const before = match.players[other].zones;
			const next: Match = playComputerStep(match, active).match;
			if (next.activePlayer === active)
				assert.deepEqual(next.players[other].zones, before);
			match = next;
		}
	});
});

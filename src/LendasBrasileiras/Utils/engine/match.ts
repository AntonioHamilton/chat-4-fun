import type { Deck } from "@/LendasBrasileiras/Types/deck";
import type {
	Match,
	MatchErrorCode,
	MoveResult,
	Phase,
	PlayerIndex
} from "@/LendasBrasileiras/Types/match";
import type { CardInstance, Player } from "@/LendasBrasileiras/Types/player";
import type { Zone } from "@/LendasBrasileiras/Types/zone";
import { STARTING_HAND_SIZE, STARTING_LIFE, ZONES } from "./constants";
import { createEmptyManaPool, spendMana } from "./mana";
import { shuffle, type RandomFn } from "./random";

const fail = (code: MatchErrorCode, message: string): MoveResult => ({
	ok: false,
	error: { code, message }
});

const createEmptyZones = (): Player["zones"] => {
	const zones = {} as Player["zones"];
	for (const zone of ZONES) zones[zone] = [];
	return zones;
};

const opponentOf = (index: PlayerIndex): PlayerIndex => (index === 0 ? 1 : 0);

const replacePlayer = (
	match: Match,
	index: PlayerIndex,
	player: Player
): Match => {
	const players: [Player, Player] =
		index === 0 ? [player, match.players[1]] : [match.players[0], player];
	return { ...match, players };
};

const findCard = (
	player: Player,
	instanceId: string
): { zone: Zone; instance: CardInstance } | null => {
	for (const zone of ZONES) {
		const instance: CardInstance | undefined = player.zones[zone].find(
			(item) => item.instanceId === instanceId
		);
		if (instance) return { zone, instance };
	}
	return null;
};

const moveInPlayer = (
	player: Player,
	instance: CardInstance,
	from: Zone,
	to: Zone
): Player => {
	const withoutCard: CardInstance[] = player.zones[from].filter(
		(item) => item.instanceId !== instance.instanceId
	);
	const zones: Player["zones"] = { ...player.zones, [from]: withoutCard };
	zones[to] = [...zones[to], instance];
	return { ...player, zones };
};

const createPlayer = (
	id: string,
	deck: Deck,
	playerIndex: PlayerIndex,
	random: RandomFn
): Player => {
	const instances: CardInstance[] = deck.cards.map((card, i) => ({
		instanceId: `${playerIndex}-${i}`,
		card
	}));
	const commander: CardInstance = {
		instanceId: `${playerIndex}-commander`,
		card: deck.commander
	};
	const zones: Player["zones"] = createEmptyZones();
	zones.library = shuffle(instances, random);
	zones.command = [commander];
	return {
		id,
		life: STARTING_LIFE,
		zones,
		tappedLands: [],
		manaPool: createEmptyManaPool(),
		landPlayedThisTurn: false
	};
};

export const drawCard = (match: Match, index: PlayerIndex): MoveResult => {
	if (match.winner !== null) return fail("match_over", "Partida encerrada");
	const player: Player = match.players[index];
	const [top, ...rest] = player.zones.library;
	if (!top) return { ok: true, match: { ...match, winner: opponentOf(index) } };
	const next: Player = {
		...player,
		zones: {
			...player.zones,
			library: rest,
			hand: [...player.zones.hand, top]
		}
	};
	return { ok: true, match: replacePlayer(match, index, next) };
};

export const createMatch = (
	deckA: Deck,
	deckB: Deck,
	random: RandomFn = Math.random
): Match => {
	let match: Match = {
		players: [
			createPlayer("player-0", deckA, 0, random),
			createPlayer("player-1", deckB, 1, random)
		],
		activePlayer: 0,
		phase: "main1",
		turn: 1,
		winner: null
	};
	for (const index of [0, 1] as PlayerIndex[]) {
		for (let i = 0; i < STARTING_HAND_SIZE; i++) {
			const result: MoveResult = drawCard(match, index);
			if (result.ok) match = result.match;
		}
	}
	return match;
};

const checkActiveMainPhase = (
	match: Match,
	index: PlayerIndex
): MoveResult | null => {
	if (match.winner !== null) return fail("match_over", "Partida encerrada");
	if (match.activePlayer !== index)
		return fail("not_active_player", "Não é o turno deste jogador");
	if (match.phase !== "main1" && match.phase !== "main2")
		return fail("wrong_phase", "Só é possível na fase principal");
	return null;
};

export const playLand = (
	match: Match,
	index: PlayerIndex,
	instanceId: string
): MoveResult => {
	const invalid: MoveResult | null = checkActiveMainPhase(match, index);
	if (invalid) return invalid;
	const player: Player = match.players[index];
	const found = findCard(player, instanceId);
	if (!found) return fail("card_not_found", "Carta não encontrada");
	if (found.zone !== "hand") return fail("wrong_zone", "Carta não está na mão");
	if (found.instance.card.type !== "land")
		return fail("not_a_land", "A carta não é um terreno");
	if (player.landPlayedThisTurn)
		return fail("land_already_played", "Já jogou um terreno neste turno");
	const next: Player = {
		...moveInPlayer(player, found.instance, "hand", "lands"),
		landPlayedThisTurn: true
	};
	return { ok: true, match: replacePlayer(match, index, next) };
};

export const tapLand = (
	match: Match,
	index: PlayerIndex,
	instanceId: string
): MoveResult => {
	if (match.winner !== null) return fail("match_over", "Partida encerrada");
	const player: Player = match.players[index];
	const found = findCard(player, instanceId);
	if (!found) return fail("card_not_found", "Carta não encontrada");
	const color = found.instance.card.produces;
	if (found.zone !== "lands" || !color)
		return fail("not_a_land", "A carta não é um terreno em jogo");
	if (player.tappedLands.includes(instanceId))
		return fail("land_already_tapped", "Terreno já virado");
	const next: Player = {
		...player,
		tappedLands: [...player.tappedLands, instanceId],
		manaPool: { ...player.manaPool, [color]: player.manaPool[color] + 1 }
	};
	return { ok: true, match: replacePlayer(match, index, next) };
};

const castDestinations: Record<string, Zone> = {
	creature: "battlefield",
	commander: "battlefield",
	enchantment: "support",
	artifact: "support",
	instant: "usage",
	sorcery: "usage"
};

export const castCard = (
	match: Match,
	index: PlayerIndex,
	instanceId: string
): MoveResult => {
	if (match.winner !== null) return fail("match_over", "Partida encerrada");
	const player: Player = match.players[index];
	const found = findCard(player, instanceId);
	if (!found) return fail("card_not_found", "Carta não encontrada");
	const { zone, instance } = found;
	const type = instance.card.type;
	if (type !== "instant" && match.activePlayer !== index)
		return fail("not_active_player", "Não é o turno deste jogador");
	if (type === "land") return fail("not_castable", "Terreno não é lançado");
	const expectedZone: Zone = type === "commander" ? "command" : "hand";
	if (zone !== expectedZone)
		return fail("wrong_zone", "Carta não está na zona de origem correta");
	if (type !== "instant" && match.phase !== "main1" && match.phase !== "main2")
		return fail("wrong_phase", "Só é possível na fase principal");
	const pool = spendMana(player.manaPool, instance.card.cost);
	if (!pool) return fail("insufficient_mana", "Mana insuficiente");
	const next: Player = {
		...moveInPlayer(player, instance, zone, castDestinations[type]),
		manaPool: pool
	};
	return { ok: true, match: replacePlayer(match, index, next) };
};

export const resolveUsage = (match: Match, index: PlayerIndex): MoveResult => {
	if (match.winner !== null) return fail("match_over", "Partida encerrada");
	const player: Player = match.players[index];
	const next: Player = {
		...player,
		zones: {
			...player.zones,
			usage: [],
			graveyard: [...player.zones.graveyard, ...player.zones.usage]
		}
	};
	return { ok: true, match: replacePlayer(match, index, next) };
};

export const moveCard = (
	match: Match,
	index: PlayerIndex,
	instanceId: string,
	to: Zone
): MoveResult => {
	if (match.winner !== null) return fail("match_over", "Partida encerrada");
	const player: Player = match.players[index];
	const found = findCard(player, instanceId);
	if (!found) return fail("card_not_found", "Carta não encontrada");
	const moved: Player = moveInPlayer(player, found.instance, found.zone, to);
	const next: Player =
		found.zone === "lands"
			? {
					...moved,
					tappedLands: moved.tappedLands.filter((id) => id !== instanceId)
				}
			: moved;
	return { ok: true, match: replacePlayer(match, index, next) };
};

export const adjustLife = (
	match: Match,
	index: PlayerIndex,
	delta: number
): MoveResult => {
	if (match.winner !== null) return fail("match_over", "Partida encerrada");
	return {
		ok: true,
		match: replacePlayer(match, index, {
			...match.players[index],
			life: match.players[index].life + delta
		})
	};
};

const nextPhase: Record<Phase, Phase> = {
	draw: "main1",
	main1: "main2",
	combat: "main2",
	main2: "end",
	end: "draw"
};

export const advancePhase = (match: Match): MoveResult => {
	if (match.winner !== null) return fail("match_over", "Partida encerrada");
	const active: Player = match.players[match.activePlayer];
	const cleared: Match = replacePlayer(match, match.activePlayer, {
		...active,
		manaPool: createEmptyManaPool()
	});
	if (match.phase !== "end")
		return { ok: true, match: { ...cleared, phase: nextPhase[match.phase] } };
	const upcoming: PlayerIndex = opponentOf(match.activePlayer);
	const refreshed: Match = replacePlayer(cleared, upcoming, {
		...cleared.players[upcoming],
		tappedLands: [],
		manaPool: createEmptyManaPool(),
		landPlayedThisTurn: false
	});
	return drawCard(
		{
			...refreshed,
			activePlayer: upcoming,
			phase: "draw",
			turn: match.turn + 1
		},
		upcoming
	);
};

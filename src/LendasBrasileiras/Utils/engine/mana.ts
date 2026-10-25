import type { ManaCost } from "@/LendasBrasileiras/Types/card";
import type { ManaPool } from "@/LendasBrasileiras/Types/player";
import { MANA_COLORS } from "./constants";

export const createEmptyManaPool = (): ManaPool => ({
	green: 0,
	blue: 0,
	black: 0,
	red: 0,
	white: 0,
	colorless: 0
});

export const spendMana = (pool: ManaPool, cost: ManaCost): ManaPool | null => {
	const remaining: ManaPool = { ...pool };
	for (const color of MANA_COLORS) {
		if (color === "colorless") continue;
		const needed: number = cost[color] ?? 0;
		if (remaining[color] < needed) return null;
		remaining[color] -= needed;
	}
	let colorlessNeeded: number = cost.colorless ?? 0;
	for (const color of MANA_COLORS) {
		if (colorlessNeeded === 0) break;
		const used: number = Math.min(remaining[color], colorlessNeeded);
		remaining[color] -= used;
		colorlessNeeded -= used;
	}
	return colorlessNeeded === 0 ? remaining : null;
};

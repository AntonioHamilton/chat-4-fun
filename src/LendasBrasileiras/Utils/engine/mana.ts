import type { ManaCost } from "@/LendasBrasileiras/Types/card";
import type { CardInstance } from "@/LendasBrasileiras/Types/player";
import { MANA_COLORS } from "./constants";

export const findLandsToTap = (
	lands: CardInstance[],
	tapped: string[],
	cost: ManaCost
): string[] | null => {
	const free: CardInstance[] = lands.filter(
		(land) => !tapped.includes(land.instanceId)
	);
	const chosen: string[] = [];
	for (const color of MANA_COLORS) {
		if (color === "colorless") continue;
		const needed: number = cost[color] ?? 0;
		const matching: CardInstance[] = free.filter(
			(land) =>
				land.card.produces === color && !chosen.includes(land.instanceId)
		);
		if (matching.length < needed) return null;
		chosen.push(...matching.slice(0, needed).map((land) => land.instanceId));
	}
	const colorlessNeeded: number = cost.colorless ?? 0;
	const rest: CardInstance[] = free.filter(
		(land) => land.card.produces && !chosen.includes(land.instanceId)
	);
	if (rest.length < colorlessNeeded) return null;
	chosen.push(...rest.slice(0, colorlessNeeded).map((land) => land.instanceId));
	return chosen;
};

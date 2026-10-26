import type { ManaColor } from "@/LendasBrasileiras/Types/card";
import type { CardInstance } from "@/LendasBrasileiras/Types/player";
import { manaColors } from "@/LendasBrasileiras/Constants/colors";
import { manaLabels } from "@/LendasBrasileiras/Constants/labels";
import { MANA_COLORS } from "@/LendasBrasileiras/Utils/engine/constants";
import * as SC from "./styled";

type ManaPoolProps = {
	lands: CardInstance[];
	tappedLands: string[];
};

export const ManaPool = ({ lands, tappedLands }: ManaPoolProps) => {
	const free: CardInstance[] = lands.filter(
		(land) => !tappedLands.includes(land.instanceId)
	);
	const counts: [ManaColor, number][] = MANA_COLORS.map((color) => [
		color,
		free.filter((land) => land.card.produces === color).length
	]);
	const visible = counts.filter(([, count]) => count > 0);

	return (
		<SC.Container role="group" aria-label="Terrenos livres por cor">
			{visible.map(([color, count]) => (
				<SC.Circle
					key={color}
					$color={manaColors[color]}
					role="img"
					aria-label={`${manaLabels[color]}: ${count}`}
				>
					{count}
				</SC.Circle>
			))}
		</SC.Container>
	);
};

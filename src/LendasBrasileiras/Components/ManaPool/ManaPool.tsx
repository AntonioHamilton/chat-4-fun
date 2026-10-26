import type { ManaColor } from "@/LendasBrasileiras/Types/card";
import type { ManaPool as ManaPoolData } from "@/LendasBrasileiras/Types/player";
import { manaColors, manaSymbols } from "@/LendasBrasileiras/Constants/colors";
import { manaLabels } from "@/LendasBrasileiras/Constants/labels";
import { MANA_COLORS } from "@/LendasBrasileiras/Utils/engine/constants";
import * as SC from "./styled";

type ManaPoolProps = {
	pool: ManaPoolData;
	landsCount: number;
	tappedCount: number;
};

export const ManaPool = ({ pool, landsCount, tappedCount }: ManaPoolProps) => {
	const filled: ManaColor[] = MANA_COLORS.filter((color) => pool[color] > 0);

	return (
		<SC.Container aria-label="Mana">
			<span>
				Terrenos {landsCount - tappedCount}/{landsCount}
			</span>
			<span>Pool:</span>
			{filled.length === 0 && <span>vazio</span>}
			{filled.map((color) => (
				<SC.Chip
					key={color}
					$color={manaColors[color]}
					aria-label={`${manaLabels[color]} ${pool[color]}`}
				>
					{pool[color]} {manaSymbols[color]}
				</SC.Chip>
			))}
		</SC.Container>
	);
};

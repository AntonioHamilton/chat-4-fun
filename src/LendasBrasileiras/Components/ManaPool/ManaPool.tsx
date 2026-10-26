import type { ManaColor } from "@/LendasBrasileiras/Types/card";
import type { ManaPool as ManaPoolData } from "@/LendasBrasileiras/Types/player";
import { manaColors, manaSymbols } from "@/LendasBrasileiras/Constants/colors";
import { manaLabels } from "@/LendasBrasileiras/Constants/labels";
import { MANA_COLORS } from "@/LendasBrasileiras/Utils/engine/constants";
import * as SC from "./styled";

type ManaPoolProps = {
	pool: ManaPoolData;
};

export const ManaPool = ({ pool }: ManaPoolProps) => {
	const filled: ManaColor[] = MANA_COLORS.filter((color) => pool[color] > 0);

	return (
		<SC.Container aria-label="Mana">
			<span>Mana:</span>
			{filled.length === 0 && <span>vazia</span>}
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

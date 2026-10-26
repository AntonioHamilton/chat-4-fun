import type { ReactNode } from "react";
import type { Player } from "@/LendasBrasileiras/Types/player";
import type { ListZone } from "@/LendasBrasileiras/Types/zone";
import { LifeCounter } from "@/LendasBrasileiras/Components/LifeCounter/LifeCounter";
import * as SC from "./styled";

type OpponentBarProps = {
	name: string;
	player: Player;
	isActive: boolean;
	start?: ReactNode;
	end?: ReactNode;
	onOpenList: (zone: ListZone) => void;
};

export const OpponentBar = ({
	name,
	player,
	isActive,
	start,
	end,
	onOpenList
}: OpponentBarProps) => {
	const handCount = player.zones.hand.length;

	return (
		<SC.Bar $active={isActive} aria-label={`Faixa de ${name}`}>
			{start}
			<SC.Name>
				{name}
				{isActive && <SC.Badge>Na vez</SC.Badge>}
			</SC.Name>
			<LifeCounter life={player.life} />
			<SC.Hand
				role="img"
				aria-label={`Mão de ${name}, ${handCount} ${handCount === 1 ? "carta" : "cartas"} viradas para baixo`}
			>
				{player.zones.hand.map((instance) => (
					<SC.Back key={instance.instanceId} />
				))}
			</SC.Hand>
			<SC.Chips>
				<SC.Extra>
					<span>Biblioteca {player.zones.library.length}</span>
				</SC.Extra>
				<SC.Chip type="button" onClick={() => onOpenList("graveyard")}>
					Cemitério {player.zones.graveyard.length}
				</SC.Chip>
				<SC.Chip type="button" onClick={() => onOpenList("exile")}>
					Exílio {player.zones.exile.length}
				</SC.Chip>
			</SC.Chips>

			<SC.End>{end}</SC.End>
		</SC.Bar>
	);
};

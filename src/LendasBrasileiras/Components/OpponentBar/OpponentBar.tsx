import type { ReactNode } from "react";
import type { Player } from "@/LendasBrasileiras/Types/player";
import { LifeCounter } from "@/LendasBrasileiras/Components/LifeCounter/LifeCounter";
import { ManaPool } from "@/LendasBrasileiras/Components/ManaPool/ManaPool";
import * as SC from "./styled";

type OpponentBarProps = {
	name: string;
	player: Player;
	isActive: boolean;
	start?: ReactNode;
	end?: ReactNode;
};

export const OpponentBar = ({
	name,
	player,
	isActive,
	start,
	end
}: OpponentBarProps) => {
	const handCount = player.zones.hand.length;

	return (
		<SC.Bar $active={isActive} aria-label={`Faixa de ${name}`}>
			{start}
			<SC.Name>
				{name}
				{isActive && <SC.Badge>Na vez</SC.Badge>}
			</SC.Name>
			<LifeCounter life={player.life} onChange={() => undefined} disabled />
			<SC.Hand
				role="img"
				aria-label={`Mão de ${name}, ${handCount} ${handCount === 1 ? "carta" : "cartas"} viradas para baixo`}
			>
				{player.zones.hand.map((instance) => (
					<SC.Back key={instance.instanceId} />
				))}
			</SC.Hand>
			<SC.Chips>
				<span>Biblioteca {player.zones.library.length}</span>
				<span>Cemitério {player.zones.graveyard.length}</span>
				<span>Exílio {player.zones.exile.length}</span>
				<ManaPool pool={player.manaPool} />
			</SC.Chips>

			<SC.End>{end}</SC.End>
		</SC.Bar>
	);
};

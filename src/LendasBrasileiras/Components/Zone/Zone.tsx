import type { ReactNode } from "react";
import type { PlayerIndex } from "@/LendasBrasileiras/Types/match";
import type { Zone as ZoneName } from "@/LendasBrasileiras/Types/zone";
import { zoneLabels } from "@/LendasBrasileiras/Constants/labels";
import * as SC from "./styled";

type ZoneProps = {
	zone: ZoneName;
	playerIndex: PlayerIndex;
	area: string;
	count: number;
	highlighted: boolean;
	touch?: "none" | "pan-x" | "auto";
	scroll?: boolean;
	action?: ReactNode;
	children?: ReactNode;
};

export const Zone = ({
	zone,
	playerIndex,
	area,
	count,
	highlighted,
	touch = "auto",
	scroll = false,
	action,
	children
}: ZoneProps) => {
	const label = zoneLabels[zone];

	return (
		<SC.Container
			role="group"
			aria-label={`${label}, ${count} ${count === 1 ? "carta" : "cartas"}`}
			data-zone={zone}
			data-player={playerIndex}
			$area={area}
			$highlighted={highlighted}
			$touch={touch}
		>
			<SC.Header>
				<span>{label}</span>
				{action}
				<SC.Count>{count}</SC.Count>
			</SC.Header>
			<SC.Cards $scroll={scroll} $touch={touch}>
				{children}
			</SC.Cards>
		</SC.Container>
	);
};

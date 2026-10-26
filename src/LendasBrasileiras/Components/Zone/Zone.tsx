import type { ReactNode } from "react";
import type { PlayerIndex } from "@/LendasBrasileiras/Types/match";
import type { Zone as ZoneName } from "@/LendasBrasileiras/Types/zone";
import { zoneLabels } from "@/LendasBrasileiras/Constants/labels";
import * as SC from "./styled";

type ZoneProps = {
	zone: ZoneName;
	playerIndex: PlayerIndex;
	area?: string;
	count: number;
	countLabel?: string;
	highlighted: boolean;
	touch?: "none" | "pan-x" | "auto";
	scroll?: boolean;
	pile?: boolean;
	fan?: boolean;
	action?: ReactNode;
	children?: ReactNode;
};

export const Zone = ({
	zone,
	playerIndex,
	area,
	count,
	countLabel,
	highlighted,
	touch = "auto",
	scroll = false,
	pile = false,
	fan = false,
	action,
	children
}: ZoneProps) => {
	const label = zoneLabels[zone];
	const alwaysLabel =
		zone === "graveyard" || zone === "exile" || zone === "library";

	return (
		<SC.Container
			role="group"
			aria-label={`${label}, ${count} ${count === 1 ? "carta" : "cartas"}`}
			data-zone={zone}
			data-player={playerIndex}
			$area={area}
			$highlighted={highlighted}
			$touch={touch}
			$fan={fan}
		>
			{!fan && (
				<SC.Header>
					<SC.Label $always={alwaysLabel}>{label}</SC.Label>
					{action}
				</SC.Header>
			)}
			<SC.Count>{countLabel ?? count}</SC.Count>
			<SC.Cards $scroll={scroll} $touch={touch} $pile={pile} $fan={fan}>
				{children}
			</SC.Cards>
		</SC.Container>
	);
};

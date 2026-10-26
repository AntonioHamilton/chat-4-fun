import type { ReactNode } from "react";
import type { PlayerIndex } from "@/LendasBrasileiras/Types/match";
import type { Player } from "@/LendasBrasileiras/Types/player";
import type { CardHandlers } from "@/LendasBrasileiras/Types/ui";
import type { ListZone } from "@/LendasBrasileiras/Types/zone";
import { LifeCounter } from "@/LendasBrasileiras/Components/LifeCounter/LifeCounter";
import { ManaPool } from "@/LendasBrasileiras/Components/ManaPool/ManaPool";
import { PlayerZone } from "@/LendasBrasileiras/Components/PlayerZone/PlayerZone";
import { Zone } from "@/LendasBrasileiras/Components/Zone/Zone";
import * as SC from "./styled";

type PlayerDockProps = {
	name: string;
	player: Player;
	playerIndex: PlayerIndex;
	handlers: CardHandlers;
	onOpenList: (zone: ListZone) => void;
	children?: ReactNode;
};

const FAN_STEP_DEGREES = 3;
const FAN_ARC_LIFT = 0.28;
const FAN_MAX_SPREAD_DEGREES = 30;

const getInitials = (name: string): string =>
	name
		.split(/[\s,]+/)
		.filter(Boolean)
		.slice(0, 2)
		.map((word) => word[0])
		.join("")
		.toUpperCase();

export const PlayerDock = ({
	name,
	player,
	playerIndex,
	handlers,
	onOpenList,
	children
}: PlayerDockProps) => {
	const commander = Object.values(player.zones)
		.flat()
		.find((instance) => instance.card.type === "commander");
	const portraitName = commander?.card.name ?? name;
	const library = player.zones.library.length;

	return (
		<SC.Dock aria-label={`Faixa de ${name}`}>
			<SC.Hero>
				<SC.Portrait role="img" aria-label={`Comandante: ${portraitName}`}>
					<SC.Initials aria-hidden="true">
						{getInitials(portraitName)}
					</SC.Initials>
					<LifeCounter life={player.life} variant="portrait" />
				</SC.Portrait>
				{children}
			</SC.Hero>

			<SC.Piles>
				<PlayerZone
					zone="graveyard"
					player={player}
					playerIndex={playerIndex}
					handlers={handlers}
					pile
					onOpenList={() => onOpenList("graveyard")}
				/>
				<PlayerZone
					zone="exile"
					player={player}
					playerIndex={playerIndex}
					handlers={handlers}
					pile
					onOpenList={() => onOpenList("exile")}
				/>
				<Zone
					zone="library"
					playerIndex={playerIndex}
					count={library}
					highlighted={
						handlers.dragTarget?.playerIndex === playerIndex &&
						handlers.dragTarget.zone === "library"
					}
					pile
				>
					<SC.Back aria-hidden="true" />
				</Zone>
			</SC.Piles>

			<SC.Hand>
				<PlayerZone
					zone="hand"
					player={player}
					playerIndex={playerIndex}
					handlers={handlers}
					touch="none"
					fan
					renderItem={(card, index, total) => {
						const half = (total - 1) / 2;
						const offset = index - half;
						const ratio = half > 0 ? offset / half : 1;
						const lift = FAN_ARC_LIFT * (1 - ratio * ratio);
						return (
							<SC.FanItem
								$angle={`${offset * Math.min(FAN_STEP_DEGREES, FAN_MAX_SPREAD_DEGREES / total)}deg`}
								$lift={`calc(var(--card-w) * -${lift.toFixed(3)})`}
								$count={total}
							>
								{card}
							</SC.FanItem>
						);
					}}
				/>
			</SC.Hand>

			{player.zones.command.length > 0 && (
				<SC.CommandSlot>
					<PlayerZone
						zone="command"
						player={player}
						playerIndex={playerIndex}
						handlers={handlers}
						touch="none"
						fan
						countLabel="Comandante"
					/>
				</SC.CommandSlot>
			)}

			<SC.End>
				<ManaPool lands={player.zones.lands} tappedLands={player.tappedLands} />
			</SC.End>
		</SC.Dock>
	);
};

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
	onDraw: () => void;
	onLifeChange: (delta: number) => void;
	onOpenList: (zone: ListZone) => void;
	children?: ReactNode;
};

const FAN_STEP_DEGREES = 3;
const FAN_DROP_PX = 2;
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
	onDraw,
	onLifeChange,
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
					<LifeCounter
						life={player.life}
						onChange={onLifeChange}
						disabled={handlers.locked}
						variant="portrait"
					/>
				</SC.Portrait>
				<ManaPool pool={player.manaPool} />
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
			</SC.Piles>

			<SC.Hand>
				<PlayerZone
					zone="hand"
					player={player}
					playerIndex={playerIndex}
					handlers={handlers}
					touch="none"
					fan
					countLabel={`Mão ${player.zones.hand.length}`}
					renderItem={(card, index, total) => {
						const offset = index - (total - 1) / 2;
						return (
							<SC.FanItem
								$angle={`${offset * Math.min(FAN_STEP_DEGREES, FAN_MAX_SPREAD_DEGREES / total)}deg`}
								$drop={`${Math.abs(offset) * FAN_DROP_PX}px`}
								$count={total}
							>
								{card}
							</SC.FanItem>
						);
					}}
				/>
			</SC.Hand>

			<SC.End>
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
					<SC.DeckButton
						type="button"
						aria-label={`Comprar carta, ${library} na biblioteca`}
						disabled={handlers.locked}
						onClick={onDraw}
					>
						<SC.Back aria-hidden="true" />
					</SC.DeckButton>
				</Zone>
				{children}
			</SC.End>
		</SC.Dock>
	);
};

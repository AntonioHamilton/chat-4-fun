import type { PlayerIndex } from "@/LendasBrasileiras/Types/match";
import type { Player } from "@/LendasBrasileiras/Types/player";
import type { CardHandlers } from "@/LendasBrasileiras/Types/ui";
import { PlayerZone } from "@/LendasBrasileiras/Components/PlayerZone/PlayerZone";
import * as SC from "./styled";

type PlayerAreaProps = {
	name: string;
	player: Player;
	playerIndex: PlayerIndex;
	position: "top" | "bottom";
	isActive: boolean;
	handlers: CardHandlers;
};

export const PlayerArea = ({
	name,
	player,
	playerIndex,
	position,
	isActive,
	handlers
}: PlayerAreaProps) => {
	const landsTotal = player.zones.lands.length;
	const landsTapped = player.tappedLands.length;

	return (
		<SC.Root $position={position} $active={isActive} aria-label={name}>
			<PlayerZone
				zone="battlefield"
				animateEntry={position === "top"}
				player={player}
				playerIndex={playerIndex}
				handlers={handlers}
				area="battle"
				touch="none"
			/>
			<PlayerZone
				zone="lands"
				animateEntry={position === "top"}
				player={player}
				playerIndex={playerIndex}
				handlers={handlers}
				area="lands"
				scroll
				countLabel={`${landsTotal - landsTapped}/${landsTotal}`}
				overlay={
					landsTapped > 0 ? (
						<SC.TappedMarker>
							<span aria-hidden="true">↻</span> {landsTapped}{" "}
							{landsTapped === 1 ? "virado" : "virados"}
						</SC.TappedMarker>
					) : null
				}
			/>
			<PlayerZone
				zone="support"
				animateEntry={position === "top"}
				player={player}
				playerIndex={playerIndex}
				handlers={handlers}
				area="support"
				scroll
			/>
		</SC.Root>
	);
};

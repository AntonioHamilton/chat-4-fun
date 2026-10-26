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
	return (
		<SC.Root $position={position} $active={isActive} aria-label={name}>
			<PlayerZone
				zone="battlefield"
				animateEntry={position === "top"}
				player={player}
				playerIndex={playerIndex}
				handlers={handlers}
				bare
				area="battle"
				touch="none"
			/>
			<PlayerZone
				zone="lands"
				animateEntry={position === "top"}
				player={player}
				playerIndex={playerIndex}
				handlers={handlers}
				bare
				area="lands"
				scroll
			/>
			<PlayerZone
				zone="support"
				animateEntry={position === "top"}
				player={player}
				playerIndex={playerIndex}
				handlers={handlers}
				bare
				area="support"
				scroll
			/>
		</SC.Root>
	);
};

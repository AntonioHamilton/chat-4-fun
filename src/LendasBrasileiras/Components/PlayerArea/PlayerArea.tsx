import type { PlayerIndex } from "@/LendasBrasileiras/Types/match";
import type { CardInstance, Player } from "@/LendasBrasileiras/Types/player";
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
	onClearUsage: () => void;
};

export const PlayerArea = ({
	name,
	player,
	playerIndex,
	position,
	isActive,
	handlers,
	onClearUsage
}: PlayerAreaProps) => {
	const landsTotal = player.zones.lands.length;
	const landsTapped = player.tappedLands.length;

	const pickLand = (cards: CardInstance[]): CardInstance[] => {
		const free = cards.filter(
			(instance) => !player.tappedLands.includes(instance.instanceId)
		);
		const top =
			free.length > 0 ? free[free.length - 1] : cards[cards.length - 1];
		return top ? [top] : [];
	};

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
				pile
				pickVisible={pickLand}
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
			<PlayerZone
				zone="command"
				animateEntry={position === "top"}
				player={player}
				playerIndex={playerIndex}
				handlers={handlers}
				area="cmd"
				pile
			/>
			<PlayerZone
				zone="usage"
				player={player}
				playerIndex={playerIndex}
				handlers={handlers}
				area="usage"
				scroll
				action={
					player.zones.usage.length > 0 ? (
						<SC.ClearButton
							type="button"
							disabled={handlers.locked}
							onClick={onClearUsage}
						>
							Limpar
						</SC.ClearButton>
					) : null
				}
			/>
		</SC.Root>
	);
};

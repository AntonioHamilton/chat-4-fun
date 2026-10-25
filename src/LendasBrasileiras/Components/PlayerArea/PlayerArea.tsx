import type { PointerEvent, ReactNode } from "react";
import type { Card as CardData } from "@/LendasBrasileiras/Types/card";
import type { PlayerIndex } from "@/LendasBrasileiras/Types/match";
import type { CardInstance, Player } from "@/LendasBrasileiras/Types/player";
import type { CardSource, DropTarget } from "@/LendasBrasileiras/Types/ui";
import type { Zone as ZoneName } from "@/LendasBrasileiras/Types/zone";
import { zoneLabels } from "@/LendasBrasileiras/Constants/labels";
import { Card } from "@/LendasBrasileiras/Components/Card/Card";
import { LifeCounter } from "@/LendasBrasileiras/Components/LifeCounter/LifeCounter";
import { ManaPool } from "@/LendasBrasileiras/Components/ManaPool/ManaPool";
import { Zone } from "@/LendasBrasileiras/Components/Zone/Zone";
import * as SC from "./styled";

type PlayerAreaProps = {
	name: string;
	player: Player;
	playerIndex: PlayerIndex;
	position: "top" | "bottom";
	isActive: boolean;
	dragTarget: DropTarget | null;
	draggingId: string | null;
	onDraw: () => void;
	onLifeChange: (delta: number) => void;
	onClearUsage: () => void;
	onCardPointerDown: (
		event: PointerEvent<HTMLElement>,
		source: CardSource,
		card: CardData
	) => void;
	onCardClick: (source: CardSource) => void;
	onCardFocus: (card: CardData) => void;
	onCardBlur: () => void;
};

export const PlayerArea = ({
	name,
	player,
	playerIndex,
	position,
	isActive,
	dragTarget,
	draggingId,
	onDraw,
	onLifeChange,
	onClearUsage,
	onCardPointerDown,
	onCardClick,
	onCardFocus,
	onCardBlur
}: PlayerAreaProps) => {
	const isHighlighted = (zone: ZoneName): boolean =>
		dragTarget?.playerIndex === playerIndex && dragTarget.zone === zone;

	const renderCard = (zone: ZoneName, instance: CardInstance) => {
		const source: CardSource = {
			playerIndex,
			instanceId: instance.instanceId,
			zone
		};
		return (
			<Card
				key={instance.instanceId}
				card={instance.card}
				zoneLabel={zoneLabels[zone]}
				tapped={
					zone === "lands" && player.tappedLands.includes(instance.instanceId)
				}
				dragging={draggingId === instance.instanceId}
				onPointerDown={(event) =>
					onCardPointerDown(event, source, instance.card)
				}
				onClick={() => onCardClick(source)}
				onFocus={() => onCardFocus(instance.card)}
				onBlur={onCardBlur}
			/>
		);
	};

	const renderZone = (
		zone: ZoneName,
		area: string,
		options: {
			pile?: boolean;
			touch?: "none" | "pan-x";
			scroll?: boolean;
			action?: ReactNode;
		} = {}
	) => {
		const cards = player.zones[zone];
		const visible = options.pile ? cards.slice(-1) : cards;
		return (
			<Zone
				zone={zone}
				playerIndex={playerIndex}
				area={area}
				count={cards.length}
				highlighted={isHighlighted(zone)}
				touch={options.touch}
				scroll={options.scroll}
				action={options.action}
			>
				{visible.map((instance) => renderCard(zone, instance))}
			</Zone>
		);
	};

	const landsCount = player.zones.lands.length;

	return (
		<SC.Root $position={position} $active={isActive} aria-label={name}>
			<SC.Header $position={position}>
				<SC.Name>
					{name}
					{isActive && <SC.Badge>Na vez</SC.Badge>}
				</SC.Name>
				<LifeCounter life={player.life} onChange={onLifeChange} />
				<ManaPool
					pool={player.manaPool}
					landsCount={landsCount}
					tappedCount={player.tappedLands.length}
				/>
			</SC.Header>

			<SC.Board $position={position}>
				<Zone
					zone="library"
					playerIndex={playerIndex}
					area="lib"
					count={player.zones.library.length}
					highlighted={isHighlighted("library")}
				>
					<SC.Back aria-hidden="true" />
					<SC.DrawButton type="button" onClick={onDraw}>
						Comprar
					</SC.DrawButton>
				</Zone>
				{renderZone("graveyard", "grave", { pile: true })}
				{renderZone("exile", "exile", { pile: true })}
				{renderZone("command", "cmd")}
				{renderZone("lands", "lands")}
				{renderZone("battlefield", "battle", { touch: "none" })}
				{renderZone("support", "support")}
				{renderZone("usage", "usage", {
					action:
						player.zones.usage.length > 0 ? (
							<SC.ClearButton type="button" onClick={onClearUsage}>
								Limpar
							</SC.ClearButton>
						) : null
				})}
			</SC.Board>

			<SC.HandWrapper $position={position}>
				{renderZone("hand", "hand", { touch: "pan-x", scroll: true })}
			</SC.HandWrapper>
		</SC.Root>
	);
};

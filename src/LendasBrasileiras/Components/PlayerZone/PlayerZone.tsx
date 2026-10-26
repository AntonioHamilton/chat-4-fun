import { Fragment } from "react";
import type { ReactNode } from "react";
import type { PlayerIndex } from "@/LendasBrasileiras/Types/match";
import type { CardInstance, Player } from "@/LendasBrasileiras/Types/player";
import type { CardHandlers, CardSource } from "@/LendasBrasileiras/Types/ui";
import type { Zone as ZoneName } from "@/LendasBrasileiras/Types/zone";
import { zoneLabels } from "@/LendasBrasileiras/Constants/labels";
import { Card } from "@/LendasBrasileiras/Components/Card/Card";
import { Zone } from "@/LendasBrasileiras/Components/Zone/Zone";

type PlayerZoneProps = {
	zone: ZoneName;
	player: Player;
	playerIndex: PlayerIndex;
	handlers: CardHandlers;
	area?: string;
	touch?: "none" | "pan-x" | "auto";
	scroll?: boolean;
	pile?: boolean;
	fan?: boolean;
	animateEntry?: boolean;
	countLabel?: string;
	pickVisible?: (cards: CardInstance[]) => CardInstance[];
	renderItem?: (card: ReactNode, index: number, total: number) => ReactNode;
	overlay?: ReactNode;
	onOpenList?: () => void;
};

export const PlayerZone = ({
	zone,
	player,
	playerIndex,
	handlers,
	area,
	touch,
	scroll,
	pile = false,
	fan,
	animateEntry = false,
	countLabel,
	pickVisible,
	renderItem,
	overlay,
	onOpenList
}: PlayerZoneProps) => {
	const cards = player.zones[zone];
	const visible = pickVisible
		? pickVisible(cards)
		: pile
			? cards.slice(-1)
			: cards;

	const renderCard = (instance: CardInstance) => {
		const source: CardSource = {
			playerIndex,
			instanceId: instance.instanceId,
			zone
		};
		return (
			<Card
				key={instance.instanceId}
				card={instance.card}
				interactive={!onOpenList}
				zoneLabel={zoneLabels[zone]}
				tapped={
					zone === "lands" &&
					!pile &&
					player.tappedLands.includes(instance.instanceId)
				}
				entering={animateEntry}
				dragging={handlers.draggingId === instance.instanceId}
				onPointerDown={(event) => {
					if (!handlers.locked)
						handlers.onCardPointerDown(event, source, instance.card);
				}}
				onClick={() => handlers.onCardClick(source)}
				onFocus={() => handlers.onCardFocus(instance.card)}
				onBlur={handlers.onCardBlur}
			/>
		);
	};

	return (
		<Zone
			zone={zone}
			playerIndex={playerIndex}
			area={area}
			count={cards.length}
			countLabel={countLabel}
			highlighted={
				handlers.dragTarget?.playerIndex === playerIndex &&
				handlers.dragTarget.zone === zone
			}
			touch={touch}
			scroll={scroll}
			pile={pile}
			fan={fan}
			onOpen={onOpenList}
		>
			{visible.map((instance, index) => {
				const node = renderCard(instance);
				return renderItem ? (
					<Fragment key={instance.instanceId}>
						{renderItem(node, index, visible.length)}
					</Fragment>
				) : (
					node
				);
			})}
			{overlay}
		</Zone>
	);
};

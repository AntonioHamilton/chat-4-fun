import type { FocusEvent, MouseEvent, PointerEvent } from "react";
import type {
	Card as CardData,
	ManaColor
} from "@/LendasBrasileiras/Types/card";
import { manaColors } from "@/LendasBrasileiras/Constants/colors";
import { typeLabels } from "@/LendasBrasileiras/Constants/labels";
import { formatCost } from "@/LendasBrasileiras/Utils/formatCost";
import * as SC from "./styled";

type CardProps = {
	card: CardData;
	zoneLabel?: string;
	tapped?: boolean;
	dragging?: boolean;
	large?: boolean;
	interactive?: boolean;
	onPointerDown?: (event: PointerEvent<HTMLElement>) => void;
	onClick?: () => void;
	onFocus?: () => void;
	onBlur?: () => void;
};

const getCardColor = (card: CardData): ManaColor => {
	if (card.produces) return card.produces;
	const paid = (Object.keys(card.cost) as ManaColor[]).find(
		(color) => (card.cost[color] ?? 0) > 0
	);
	return paid ?? "colorless";
};

export const Card = ({
	card,
	zoneLabel,
	tapped = false,
	dragging = false,
	large = false,
	interactive = true,
	onPointerDown,
	onClick,
	onFocus,
	onBlur
}: CardProps) => {
	const stats =
		card.power !== undefined && card.toughness !== undefined
			? `${card.power}/${card.toughness}`
			: "";
	const label = [
		card.name,
		typeLabels[card.type],
		zoneLabel,
		tapped ? "virado" : null
	]
		.filter(Boolean)
		.join(", ");

	return (
		<SC.Root
			as={interactive ? "button" : "div"}
			type={interactive ? "button" : undefined}
			aria-label={interactive ? label : undefined}
			$color={manaColors[getCardColor(card)]}
			$tapped={tapped}
			$dragging={dragging}
			$large={large}
			onPointerDown={onPointerDown}
			onClick={onClick}
			onFocus={(event: FocusEvent<HTMLElement>) => {
				if (event.currentTarget.matches(":focus-visible")) onFocus?.();
			}}
			onBlur={onBlur}
			onContextMenu={(event: MouseEvent) => event.preventDefault()}
		>
			<SC.Name>{card.name}</SC.Name>
			<SC.Body $large={large} $darkText={getCardColor(card) === "white"}>
				{typeLabels[card.type]}
				{large && card.flavor ? <i> {card.flavor}</i> : null}
			</SC.Body>
			<SC.Footer>
				<span>{formatCost(card)}</span>
				<span>{stats}</span>
			</SC.Footer>
		</SC.Root>
	);
};

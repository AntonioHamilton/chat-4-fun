import { Character } from "../Types/character.types";
import { Card } from "../Types/card.types";

export type CombatResult = {
	damage: number;
	attackCard: Card;
	defenseCard?: Card;
	success: boolean;
};

export const resolveCombat = (
	attacker: Character,
	defender: Character,
	attackCard: Card,
	defenseCard?: Card,
	ignoreDefenseAmount: number = 0
): CombatResult => {
	const attackValue = attackCard.value;
	const defenseValue = Math.max(
		0,
		(defenseCard?.value || 0) - ignoreDefenseAmount
	);

	const damage = Math.max(0, attackValue - defenseValue);

	return {
		damage,
		attackCard,
		defenseCard,
		success: damage > 0
	};
};

export const canAttack = (
	attacker: Character,
	defender: Character,
	attackCard: Card
): boolean => {
	const distance =
		Math.abs(defender.position.x - attacker.position.x) +
		Math.abs(defender.position.y - attacker.position.y);

	const cardRange = attackCard.range || 1;

	return distance <= cardRange;
};

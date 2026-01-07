import { Character } from "../Types/character.types";
import { Effect } from "../Types/card.types";
import { GameState } from "../Types/game.types";

export type EffectContext = {
	attacker?: Character;
	defender?: Character;
	gameState: GameState;
	isDefenseSuccessful?: boolean;
};

export type EffectResult = {
	attackBonus?: number;
	defenseBonus?: number;
	damageModifier?: number;
	moveSpaces?: number;
	drawCards?: number;
	discardCards?: number;
	healAmount?: number;
	counterDamage?: number;
	ignoreDefense?: number;
	rangeBonus?: number;
	extraAction?: boolean;
	ignoreFirstAttack?: boolean;
	message?: string;
};

const drawCard = (character: Character): Character => {
	if (character.deck.length === 0) {
		const shuffledDeck = [...character.discardPile].sort(
			() => Math.random() - 0.5
		);
		return {
			...character,
			deck: shuffledDeck,
			discardPile: [],
			hand: [...character.hand]
		};
	}

	const newCard = character.deck[0];
	const newHand = [...character.hand, newCard];
	const newDeck = character.deck.slice(1);

	return {
		...character,
		hand: newHand,
		deck: newDeck
	};
};

export const applyEffect = (
	effect: Effect,
	context: EffectContext
): EffectResult => {
	const result: EffectResult = {};

	switch (effect.type) {
		case "bonusAfterManeuver":
			result.attackBonus = effect.value || 0;
			result.message = `+${effect.value} ataque após manobra`;
			break;

		case "ignoreDefense":
			result.ignoreDefense = effect.value || 0;
			result.message = `Ignora ${effect.value} de defesa`;
			break;

		case "canAttackFromDistance":
			result.message = "Pode atacar à distância";
			break;

		case "drawCardOnDefense":
			if (context.isDefenseSuccessful) {
				result.drawCards = effect.value || 0;
				result.message = `Compra ${effect.value} carta(s)`;
			}
			break;

		case "moveAfterDefense":
			if (context.isDefenseSuccessful) {
				result.moveSpaces = effect.value || 0;
				result.message = `Move ${effect.value} espaço(s)`;
			}
			break;

		case "healOnDefense":
			if (context.isDefenseSuccessful) {
				result.healAmount = effect.value || 0;
				result.message = `Recupera ${effect.value} de vida`;
			}
			break;

		case "counterAttack":
			if (context.isDefenseSuccessful) {
				result.counterDamage = effect.value || 0;
				result.message = `Contra-ataque de ${effect.value}`;
			}
			break;

		case "nextAttackBonus":
			result.attackBonus = effect.value || 0;
			result.message = `Próximo ataque +${effect.value}`;
			break;

		case "heal":
			result.healAmount = effect.value || 0;
			result.message = `Recupera ${effect.value} de vida`;
			break;

		case "moveAndAttack":
			result.moveSpaces = effect.value || 0;
			result.message = `Move ${effect.value} e pode atacar`;
			break;

		case "move":
			result.moveSpaces = effect.value || 0;
			break;

		case "drawCards":
			result.drawCards = effect.value || 0;
			break;

		case "discardCards":
			result.discardCards = effect.value || 0;
			break;

		case "godspeedBonus":
			if (context.gameState.godspeedActive) {
				result.attackBonus = effect.value || 0;
				result.message = `Godspeed: +${effect.value} ataque`;
			}
			break;

		case "extraAttackOnKill":
			result.message = "Ataque extra ao eliminar";
			break;

		case "bonusIfNoDefense":
			if (!context.defender) {
				result.attackBonus = effect.value || 0;
				result.message = `+${effect.value} se sem defesa`;
			}
			break;

		case "ignoreDefenseFromBehind":
			result.message = "Ignora defesa pelas costas";
			break;

		case "counterAttackOnDefense":
			if (context.isDefenseSuccessful) {
				result.counterDamage = effect.value || 0;
				result.message = `Contra-ataque de ${effect.value}`;
			}
			break;

		case "reduceDamageThisTurn":
			result.damageModifier = -(effect.value || 0);
			result.message = `Reduz ${effect.value} de dano este turno`;
			break;

		case "godspeedActive":
			result.message = `Godspeed ativo por ${effect.value} turnos`;
			break;

		case "extraAction":
			result.extraAction = true;
			result.message = "Ação extra";
			break;

		case "ignoreFirstAttack":
			result.ignoreFirstAttack = true;
			result.message = "Ignora primeiro ataque";
			break;

		case "nextAttackRangeBonus":
			result.rangeBonus = effect.value || 0;
			result.message = `Próximo ataque +${effect.value} alcance`;
			break;

		case "nextAttackIgnoreDefense":
			result.ignoreDefense = effect.value || 0;
			result.message = `Próximo ataque ignora ${effect.value} defesa`;
			break;
	}

	return result;
};

export const applyEffects = (
	effects: Effect[],
	context: EffectContext
): EffectResult => {
	return effects.reduce((acc, effect) => {
		const result = applyEffect(effect, context);
		return {
			attackBonus: (acc.attackBonus || 0) + (result.attackBonus || 0),
			defenseBonus: (acc.defenseBonus || 0) + (result.defenseBonus || 0),
			damageModifier: (acc.damageModifier || 0) + (result.damageModifier || 0),
			moveSpaces: Math.max(acc.moveSpaces || 0, result.moveSpaces || 0),
			drawCards: (acc.drawCards || 0) + (result.drawCards || 0),
			discardCards: (acc.discardCards || 0) + (result.discardCards || 0),
			healAmount: (acc.healAmount || 0) + (result.healAmount || 0),
			counterDamage: (acc.counterDamage || 0) + (result.counterDamage || 0),
			ignoreDefense: (acc.ignoreDefense || 0) + (result.ignoreDefense || 0),
			rangeBonus: (acc.rangeBonus || 0) + (result.rangeBonus || 0),
			extraAction: acc.extraAction || result.extraAction,
			ignoreFirstAttack: acc.ignoreFirstAttack || result.ignoreFirstAttack,
			message: acc.message
				? `${acc.message}, ${result.message}`
				: result.message
		};
	}, {} as EffectResult);
};

export const applyDrawCards = (
	character: Character,
	count: number
): Character => {
	let updatedCharacter = character;
	for (let i = 0; i < count; i++) {
		updatedCharacter = drawCard(updatedCharacter);
	}
	return updatedCharacter;
};

export const applyHeal = (character: Character, amount: number): Character => {
	return {
		...character,
		health: Math.min(character.maxHealth, character.health + amount)
	};
};

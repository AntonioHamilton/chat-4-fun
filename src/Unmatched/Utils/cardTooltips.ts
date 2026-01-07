import { Card } from "../Types/card.types";

export const getCardTooltip = (card: Card): string => {
	const parts: string[] = [];

	parts.push(card.description || card.name);

	if (card.value > 0) {
		parts.push(`Valor: ${card.value}`);
	}

	if (card.range !== undefined) {
		parts.push(`Alcance: ${card.range}`);
	}

	if (card.effects && card.effects.length > 0) {
		const effectDescriptions = card.effects.map((effect) => {
			switch (effect.type) {
				case "bonusAfterManeuver":
					return `+${effect.value} de ataque após manobra`;
				case "ignoreDefense":
					return `Ignora ${effect.value} de defesa`;
				case "canAttackFromDistance":
					return "Pode atacar à distância";
				case "drawCardOnDefense":
					return `Compra ${effect.value} carta(s) ao defender com sucesso`;
				case "moveAfterDefense":
					return `Move ${effect.value} espaço(s) após defender com sucesso`;
				case "healOnDefense":
					return `Recupera ${effect.value} de vida ao defender com sucesso`;
				case "counterAttack":
					return `Causa ${effect.value} de dano ao atacante ao defender com sucesso`;
				case "nextAttackBonus":
					return `Próximo ataque causa +${effect.value} de dano`;
				case "heal":
					return `Recupera ${effect.value} de vida`;
				case "moveAndAttack":
					return `Move ${effect.value} espaços e pode atacar no mesmo turno`;
				case "godspeedBonus":
					return `+${effect.value} de ataque se Godspeed estiver ativo`;
				case "extraAttackOnKill":
					return "Ataque extra se eliminar o alvo";
				case "bonusIfNoDefense":
					return `+${effect.value} de dano se o oponente não defender`;
				case "ignoreDefenseFromBehind":
					return "Ignora defesa se atacar pelas costas";
				case "counterAttackOnDefense":
					return `Contra-ataque de ${effect.value} ao defender com sucesso`;
				case "reduceDamageThisTurn":
					return `Reduz ${effect.value} de dano recebido neste turno`;
				case "godspeedActive":
					return `Godspeed ativo por ${effect.value} turnos`;
				case "extraAction":
					return "Permite uma ação extra";
				case "ignoreFirstAttack":
					return "Ignora o primeiro ataque recebido";
				case "nextAttackRangeBonus":
					return `Próximo ataque tem +${effect.value} de alcance`;
				case "nextAttackIgnoreDefense":
					return `Próximo ataque ignora ${effect.value} de defesa`;
				case "drawCards":
					return `Compra ${effect.value} carta(s)`;
				case "discardCards":
					return `Descarta ${effect.value} carta(s)`;
				default:
					return effect.description || effect.type;
			}
		});
		parts.push("Efeitos: " + effectDescriptions.join("; "));
	}

	return parts.join(" | ");
};

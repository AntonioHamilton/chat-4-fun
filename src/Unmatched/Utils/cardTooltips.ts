import { Card } from "../Types/card.types";
import { Language } from "@/types/Language";
import { getCardText, unmatchedTranslations } from "@/Translations/unmatched";

export const getCardTooltip = (
	card: Card,
	language: Language = "PT_BR"
): string => {
	const t = unmatchedTranslations[language];
	const text = getCardText(card.id, card.name, card.description, language);
	const parts: string[] = [];

	parts.push(text.description || text.name);

	if (card.value > 0) {
		parts.push(`${t.value}: ${card.value}`);
	}

	if (card.range !== undefined) {
		parts.push(`${t.range}: ${card.range}`);
	}

	if (card.effects && card.effects.length > 0) {
		const effectDescriptions = card.effects.map((effect) => {
			const effectText = t.effectTexts[effect.type];
			if (effectText) {
				return effectText(effect.value);
			}
			return effect.description || effect.type;
		});
		parts.push(`${t.effects}: ` + effectDescriptions.join("; "));
	}

	return parts.join(" | ");
};

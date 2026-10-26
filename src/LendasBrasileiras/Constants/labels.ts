import type { CardType, ManaColor } from "@/LendasBrasileiras/Types/card";
import type { Phase } from "@/LendasBrasileiras/Types/match";
import type { Zone } from "@/LendasBrasileiras/Types/zone";

export const zoneLabels: Record<Zone, string> = {
	library: "Biblioteca",
	hand: "Mão",
	battlefield: "Campo",
	support: "Suporte",
	lands: "Terrenos",
	graveyard: "Cemitério",
	exile: "Exílio",
	command: "Comando"
};

export const typeLabels: Record<CardType, string> = {
	creature: "Criatura",
	enchantment: "Encantamento",
	instant: "Instantâneo",
	sorcery: "Feitiço",
	artifact: "Artefato",
	land: "Terreno",
	commander: "Comandante"
};

export const phaseLabels: Record<Phase, string> = {
	draw: "Compra",
	main1: "Principal 1",
	combat: "Combate",
	main2: "Principal 2",
	end: "Fim"
};

export const manaLabels: Record<ManaColor, string> = {
	green: "Verde",
	blue: "Azul",
	black: "Preto",
	red: "Vermelho",
	white: "Branco",
	colorless: "Incolor"
};

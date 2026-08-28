import { Language } from "@/types/Language";

const PT_BR = {
	title: "GYM CLICKER",
	pumpCoins: "Pump Coins",
	getLifter: "Contratar Marombeiro",
	upgrade: "Melhorar",
	maxLevel: "Nível Máximo",
	click: "Clicar",
	hit: "👊 Bater 👊",
	upgradesButton: "🔥 Upgrades 🔥",
	chooseUpgrades: "Escolha seus Upgrades",
	close: "Fechar",
	clickUpgrades: [
		"⚡ Creatina +1 por clique",
		"🥛 Whey +3 por clique",
		"💉 Durateston +5 por clique",
		"☣️ Poder do Hulk +10 por clique",
		"💣 Anabolizante +20 por clique"
	]
};

const EN_US: typeof PT_BR = {
	title: "GYM CLICKER",
	pumpCoins: "Pump Coins",
	getLifter: "Get Lifter",
	upgrade: "Upgrade",
	maxLevel: "Max Level",
	click: "Click",
	hit: "👊 Hit 👊",
	upgradesButton: "🔥 Upgrades 🔥",
	chooseUpgrades: "Choose your Upgrades",
	close: "Close",
	clickUpgrades: [
		"⚡ Creatine +1 per click",
		"🥛 Whey +3 per click",
		"💉 Durateston +5 per click",
		"☣️ Hulk Power +10 per click",
		"💣 Anabolic +20 per click"
	]
};

export const gymClickerTranslations: Record<Language, typeof PT_BR> = {
	PT_BR,
	EN_US
};

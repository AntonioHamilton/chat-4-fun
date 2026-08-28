import { Language } from "@/types/Language";

type CardText = { name: string; description: string };
type EffectText = (value?: number) => string;

const PT_BR = {
	title: "Unmatched: Hunter x Hunter",
	startGame: "Iniciar Jogo",
	turn: "Turno",
	player: "Jogador",
	victory: "venceu!",
	playAgain: "Jogar Novamente",
	chooseDefense: "Escolha uma carta de defesa ou passe",
	passDefense: "Passar (Não Defender)",
	viewCards: "Ver Cartas",
	endTurn: "Finalizar Turno",
	actionsRemaining: "Ações restantes",
	chooseAttackCard: "Escolha uma carta de Ataque",
	chooseSchemeCard: "Escolha uma carta de Esquema",
	yourCards: "Suas Cartas",
	schemeUsed: "Carta de Esquema Usada:",
	selectedCard: "Carta Selecionada:",
	value: "Valor",
	range: "Alcance",
	effects: "Efeitos",
	cardTypes: {
		attack: "Ataque",
		defense: "Defesa",
		scheme: "Esquema",
		maneuver: "Manobra"
	} as Record<string, string>,
	cards: {
		"gon-jajanken-pedra": {
			name: "Jajanken: Pedra (Guu)",
			description: "Concentra Nen no punho para um soco devastador"
		},
		"gon-jajanken-tesoura": {
			name: "Jajanken: Tesoura (Chii)",
			description: "Transforma aura em lâmina afiada para cortes precisos"
		},
		"gon-jajanken-papel": {
			name: "Jajanken: Papel (Paa)",
			description: "Emite onda de aura em forma de projétil"
		},
		"gon-soco-potente": {
			name: "Soco Potente",
			description: "Ataque corpo a corpo direto e poderoso"
		},
		"gon-bloqueio-vara": {
			name: "Bloqueio com Vara de Pesca",
			description: "Usa a vara de pesca para desviar ataques"
		},
		"gon-esquiva-agil": {
			name: "Esquiva Ágil",
			description: "Movimento rápido para evitar o ataque"
		},
		"gon-determinacao": {
			name: "Determinação Inabalável",
			description: "Sua vontade o mantém de pé"
		},
		"gon-contra-ataque": {
			name: "Contra-ataque",
			description: "Retalia imediatamente após bloquear"
		},
		"gon-foco-determinado": {
			name: "Foco Determinado",
			description: "Concentra toda sua energia no próximo golpe"
		},
		"gon-recuperacao": {
			name: "Recuperação de Energia",
			description: "Descansa e recupera forças"
		},
		"gon-vara-extendida": {
			name: "Vara de Pesca Extendida",
			description: "Usa a vara para alcançar o oponente"
		},
		"killua-golpe-relampago": {
			name: "Golpe Relâmpago",
			description: "Ataque elétrico extremamente rápido"
		},
		"killua-corte-rapido": {
			name: "Corte Rápido",
			description: "Corte preciso com as garras"
		},
		"killua-thunderbolt": {
			name: "Thunderbolt",
			description: "Projétil elétrico à distância"
		},
		"killua-assassinato": {
			name: "Assassinato Silencioso",
			description: "Ataque furtivo típico dos Zoldyck"
		},
		"killua-esquiva-relampago": {
			name: "Esquiva Relâmpago",
			description: "Usa velocidade extrema para evitar o ataque"
		},
		"killua-bloqueio-yoyo": {
			name: "Bloqueio com Yo-Yo",
			description: "Usa o yo-yo como escudo e arma"
		},
		"killua-contra-ataque-eletrico": {
			name: "Contra-ataque Elétrico",
			description: "Retalia com eletricidade"
		},
		"killua-resistencia": {
			name: "Resistência Zoldyck",
			description: "Treinamento intenso o torna mais resistente"
		},
		"killua-godspeed": {
			name: "Godspeed: Modo Ativado",
			description: "Ativa sua velocidade máxima"
		},
		"killua-analise": {
			name: "Análise do Oponente",
			description: "Observa cuidadosamente para encontrar fraquezas"
		},
		"killua-recarrega": {
			name: "Recarga de Energia",
			description: "Recupera fôlego rapidamente"
		}
	} as Record<string, CardText>,
	effectTexts: {
		bonusAfterManeuver: (value) => `+${value} de ataque após manobra`,
		ignoreDefense: (value) => `Ignora ${value} de defesa`,
		canAttackFromDistance: () => "Pode atacar à distância",
		drawCardOnDefense: (value) =>
			`Compra ${value} carta(s) ao defender com sucesso`,
		moveAfterDefense: (value) =>
			`Move ${value} espaço(s) após defender com sucesso`,
		healOnDefense: (value) =>
			`Recupera ${value} de vida ao defender com sucesso`,
		counterAttack: (value) =>
			`Causa ${value} de dano ao atacante ao defender com sucesso`,
		nextAttackBonus: (value) => `Próximo ataque causa +${value} de dano`,
		heal: (value) => `Recupera ${value} de vida`,
		moveAndAttack: (value) =>
			`Move ${value} espaços e pode atacar no mesmo turno`,
		godspeedBonus: (value) => `+${value} de ataque se Godspeed estiver ativo`,
		extraAttackOnKill: () => "Ataque extra se eliminar o alvo",
		bonusIfNoDefense: (value) => `+${value} de dano se o oponente não defender`,
		ignoreDefenseFromBehind: () => "Ignora defesa se atacar pelas costas",
		counterAttackOnDefense: (value) =>
			`Contra-ataque de ${value} ao defender com sucesso`,
		reduceDamageThisTurn: (value) =>
			`Reduz ${value} de dano recebido neste turno`,
		godspeedActive: (value) => `Godspeed ativo por ${value} turnos`,
		extraAction: () => "Permite uma ação extra",
		ignoreFirstAttack: () => "Ignora o primeiro ataque recebido",
		nextAttackRangeBonus: (value) => `Próximo ataque tem +${value} de alcance`,
		nextAttackIgnoreDefense: (value) =>
			`Próximo ataque ignora ${value} de defesa`,
		drawCards: (value) => `Compra ${value} carta(s)`,
		discardCards: (value) => `Descarta ${value} carta(s)`
	} as Record<string, EffectText>
};

const EN_US: typeof PT_BR = {
	title: "Unmatched: Hunter x Hunter",
	startGame: "Start Game",
	turn: "Turn",
	player: "Player",
	victory: "wins!",
	playAgain: "Play Again",
	chooseDefense: "Choose a defense card or pass",
	passDefense: "Pass (Don't Defend)",
	viewCards: "View Cards",
	endTurn: "End Turn",
	actionsRemaining: "Actions remaining",
	chooseAttackCard: "Choose an Attack card",
	chooseSchemeCard: "Choose a Scheme card",
	yourCards: "Your Cards",
	schemeUsed: "Scheme Card Used:",
	selectedCard: "Selected Card:",
	value: "Value",
	range: "Range",
	effects: "Effects",
	cardTypes: {
		attack: "Attack",
		defense: "Defense",
		scheme: "Scheme",
		maneuver: "Maneuver"
	},
	cards: {
		"gon-jajanken-pedra": {
			name: "Jajanken: Rock (Guu)",
			description: "Focuses Nen into his fist for a devastating punch"
		},
		"gon-jajanken-tesoura": {
			name: "Jajanken: Scissors (Chii)",
			description: "Turns aura into a sharp blade for precise cuts"
		},
		"gon-jajanken-papel": {
			name: "Jajanken: Paper (Paa)",
			description: "Fires a wave of aura as a projectile"
		},
		"gon-soco-potente": {
			name: "Power Punch",
			description: "A direct, powerful melee attack"
		},
		"gon-bloqueio-vara": {
			name: "Fishing Rod Block",
			description: "Uses the fishing rod to deflect attacks"
		},
		"gon-esquiva-agil": {
			name: "Agile Dodge",
			description: "A quick movement to avoid the attack"
		},
		"gon-determinacao": {
			name: "Unshakable Resolve",
			description: "His will keeps him standing"
		},
		"gon-contra-ataque": {
			name: "Counterattack",
			description: "Retaliates immediately after blocking"
		},
		"gon-foco-determinado": {
			name: "Determined Focus",
			description: "Channels all his energy into the next strike"
		},
		"gon-recuperacao": {
			name: "Energy Recovery",
			description: "Rests and recovers his strength"
		},
		"gon-vara-extendida": {
			name: "Extended Fishing Rod",
			description: "Uses the rod to reach the opponent"
		},
		"killua-golpe-relampago": {
			name: "Lightning Strike",
			description: "An extremely fast electric attack"
		},
		"killua-corte-rapido": {
			name: "Quick Slash",
			description: "A precise cut with his claws"
		},
		"killua-thunderbolt": {
			name: "Thunderbolt",
			description: "A ranged electric projectile"
		},
		"killua-assassinato": {
			name: "Silent Assassination",
			description: "A stealth attack, typical of the Zoldyck"
		},
		"killua-esquiva-relampago": {
			name: "Lightning Dodge",
			description: "Uses extreme speed to avoid the attack"
		},
		"killua-bloqueio-yoyo": {
			name: "Yo-Yo Block",
			description: "Uses the yo-yo as both shield and weapon"
		},
		"killua-contra-ataque-eletrico": {
			name: "Electric Counterattack",
			description: "Retaliates with electricity"
		},
		"killua-resistencia": {
			name: "Zoldyck Endurance",
			description: "Intense training makes him tougher"
		},
		"killua-godspeed": {
			name: "Godspeed: Activated",
			description: "Unleashes his maximum speed"
		},
		"killua-analise": {
			name: "Opponent Analysis",
			description: "Watches carefully to find weaknesses"
		},
		"killua-recarrega": {
			name: "Energy Recharge",
			description: "Catches his breath quickly"
		}
	},
	effectTexts: {
		bonusAfterManeuver: (value) => `+${value} attack after a maneuver`,
		ignoreDefense: (value) => `Ignores ${value} defense`,
		canAttackFromDistance: () => "Can attack at range",
		drawCardOnDefense: (value) =>
			`Draw ${value} card(s) on a successful defense`,
		moveAfterDefense: (value) =>
			`Move ${value} space(s) on a successful defense`,
		healOnDefense: (value) => `Recover ${value} health on a successful defense`,
		counterAttack: (value) =>
			`Deals ${value} damage to the attacker on a successful defense`,
		nextAttackBonus: (value) => `Next attack deals +${value} damage`,
		heal: (value) => `Recover ${value} health`,
		moveAndAttack: (value) =>
			`Move ${value} spaces and may attack on the same turn`,
		godspeedBonus: (value) => `+${value} attack while Godspeed is active`,
		extraAttackOnKill: () => "Extra attack if the target is eliminated",
		bonusIfNoDefense: (value) =>
			`+${value} damage if the opponent does not defend`,
		ignoreDefenseFromBehind: () => "Ignores defense when attacking from behind",
		counterAttackOnDefense: (value) =>
			`Counterattack of ${value} on a successful defense`,
		reduceDamageThisTurn: (value) =>
			`Reduces ${value} incoming damage this turn`,
		godspeedActive: (value) => `Godspeed active for ${value} turns`,
		extraAction: () => "Grants an extra action",
		ignoreFirstAttack: () => "Ignores the first attack received",
		nextAttackRangeBonus: (value) => `Next attack has +${value} range`,
		nextAttackIgnoreDefense: (value) => `Next attack ignores ${value} defense`,
		drawCards: (value) => `Draw ${value} card(s)`,
		discardCards: (value) => `Discard ${value} card(s)`
	}
};

export const unmatchedTranslations: Record<Language, typeof PT_BR> = {
	PT_BR,
	EN_US
};

export const getCardBaseId = (id: string) => id.replace(/-\d+$/, "");

export const getCardText = (
	id: string,
	name: string,
	description: string,
	language: Language
): CardText => {
	const text = unmatchedTranslations[language].cards[getCardBaseId(id)];
	return text ?? { name, description };
};

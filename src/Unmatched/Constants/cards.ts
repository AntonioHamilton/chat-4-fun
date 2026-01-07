import { Card } from "../Types/card.types";

const createCard = (
	id: string,
	name: string,
	type: Card["type"],
	value: number,
	range?: number,
	effects?: Card["effects"],
	description: string = ""
): Card => ({
	id,
	name,
	type,
	value,
	range,
	effects,
	description
});

export const gonDeck: Card[] = [
	...Array(3)
		.fill(null)
		.map((_, i) =>
			createCard(
				`gon-jajanken-pedra-${i}`,
				"Jajanken: Pedra (Guu)",
				"attack",
				5,
				1,
				[{ type: "bonusAfterManeuver", value: 2 }],
				"Concentra Nen no punho para um soco devastador"
			)
		),
	...Array(3)
		.fill(null)
		.map((_, i) =>
			createCard(
				`gon-jajanken-tesoura-${i}`,
				"Jajanken: Tesoura (Chii)",
				"attack",
				3,
				2,
				[{ type: "ignoreDefense", value: 1 }],
				"Transforma aura em lâmina afiada para cortes precisos"
			)
		),
	...Array(2)
		.fill(null)
		.map((_, i) =>
			createCard(
				`gon-jajanken-papel-${i}`,
				"Jajanken: Papel (Paa)",
				"attack",
				4,
				3,
				[{ type: "canAttackFromDistance" }],
				"Emite onda de aura em forma de projétil"
			)
		),
	...Array(2)
		.fill(null)
		.map((_, i) =>
			createCard(
				`gon-soco-potente-${i}`,
				"Soco Potente",
				"attack",
				3,
				1,
				undefined,
				"Ataque corpo a corpo direto e poderoso"
			)
		),
	...Array(3)
		.fill(null)
		.map((_, i) =>
			createCard(
				`gon-bloqueio-vara-${i}`,
				"Bloqueio com Vara de Pesca",
				"defense",
				3,
				undefined,
				[{ type: "drawCardOnDefense", value: 1 }],
				"Usa a vara de pesca para desviar ataques"
			)
		),
	...Array(3)
		.fill(null)
		.map((_, i) =>
			createCard(
				`gon-esquiva-agil-${i}`,
				"Esquiva Ágil",
				"defense",
				2,
				undefined,
				[{ type: "moveAfterDefense", value: 1 }],
				"Movimento rápido para evitar o ataque"
			)
		),
	...Array(2)
		.fill(null)
		.map((_, i) =>
			createCard(
				`gon-determinacao-${i}`,
				"Determinação Inabalável",
				"defense",
				4,
				undefined,
				[{ type: "healOnDefense", value: 2 }],
				"Sua vontade o mantém de pé"
			)
		),
	...Array(2)
		.fill(null)
		.map((_, i) =>
			createCard(
				`gon-contra-ataque-${i}`,
				"Contra-ataque",
				"defense",
				2,
				undefined,
				[{ type: "counterAttack", value: 1 }],
				"Retalia imediatamente após bloquear"
			)
		),
	...Array(2)
		.fill(null)
		.map((_, i) =>
			createCard(
				`gon-foco-determinado-${i}`,
				"Foco Determinado",
				"scheme",
				0,
				undefined,
				[{ type: "nextAttackBonus", value: 3 }],
				"Concentra toda sua energia no próximo golpe"
			)
		),
	...Array(2)
		.fill(null)
		.map((_, i) =>
			createCard(
				`gon-recuperacao-${i}`,
				"Recuperação de Energia",
				"scheme",
				0,
				undefined,
				[{ type: "heal", value: 4 }],
				"Descansa e recupera forças"
			)
		),
	createCard(
		"gon-vara-extendida",
		"Vara de Pesca Extendida",
		"scheme",
		0,
		undefined,
		[{ type: "moveAndAttack", value: 3 }],
		"Usa a vara para alcançar o oponente"
	)
];

export const killuaDeck: Card[] = [
	...Array(3)
		.fill(null)
		.map((_, i) =>
			createCard(
				`killua-golpe-relampago-${i}`,
				"Golpe Relâmpago",
				"attack",
				4,
				1,
				[{ type: "godspeedBonus", value: 2 }],
				"Ataque elétrico extremamente rápido"
			)
		),
	...Array(3)
		.fill(null)
		.map((_, i) =>
			createCard(
				`killua-corte-rapido-${i}`,
				"Corte Rápido",
				"attack",
				3,
				1,
				[{ type: "extraAttackOnKill" }],
				"Corte preciso com as garras"
			)
		),
	...Array(2)
		.fill(null)
		.map((_, i) =>
			createCard(
				`killua-thunderbolt-${i}`,
				"Thunderbolt",
				"attack",
				5,
				2,
				[{ type: "bonusIfNoDefense", value: 1 }],
				"Projétil elétrico à distância"
			)
		),
	...Array(2)
		.fill(null)
		.map((_, i) =>
			createCard(
				`killua-assassinato-${i}`,
				"Assassinato Silencioso",
				"attack",
				3,
				1,
				[{ type: "ignoreDefenseFromBehind" }],
				"Ataque furtivo típico dos Zoldyck"
			)
		),
	...Array(3)
		.fill(null)
		.map((_, i) =>
			createCard(
				`killua-esquiva-relampago-${i}`,
				"Esquiva Relâmpago",
				"defense",
				3,
				undefined,
				[{ type: "moveAfterDefense", value: 2 }],
				"Usa velocidade extrema para evitar o ataque"
			)
		),
	...Array(3)
		.fill(null)
		.map((_, i) =>
			createCard(
				`killua-bloqueio-yoyo-${i}`,
				"Bloqueio com Yo-Yo",
				"defense",
				2,
				undefined,
				[{ type: "counterAttackOnDefense", value: 2 }],
				"Usa o yo-yo como escudo e arma"
			)
		),
	...Array(2)
		.fill(null)
		.map((_, i) =>
			createCard(
				`killua-contra-ataque-eletrico-${i}`,
				"Contra-ataque Elétrico",
				"defense",
				2,
				undefined,
				[{ type: "counterAttack", value: 2 }],
				"Retalia com eletricidade"
			)
		),
	...Array(2)
		.fill(null)
		.map((_, i) =>
			createCard(
				`killua-resistencia-${i}`,
				"Resistência Zoldyck",
				"defense",
				4,
				undefined,
				[{ type: "reduceDamageThisTurn", value: 1 }],
				"Treinamento intenso o torna mais resistente"
			)
		),
	...Array(2)
		.fill(null)
		.map((_, i) =>
			createCard(
				`killua-godspeed-${i}`,
				"Godspeed: Modo Ativado",
				"scheme",
				0,
				undefined,
				[
					{ type: "godspeedActive", value: 2 },
					{ type: "extraAction", value: 1 },
					{ type: "ignoreFirstAttack", value: 1 }
				],
				"Ativa sua velocidade máxima"
			)
		),
	...Array(2)
		.fill(null)
		.map((_, i) =>
			createCard(
				`killua-analise-${i}`,
				"Análise do Oponente",
				"scheme",
				0,
				undefined,
				[
					{ type: "drawCards", value: 3 },
					{ type: "discardCards", value: 1 }
				],
				"Observa cuidadosamente para encontrar fraquezas"
			)
		),
	createCard(
		"killua-recarrega",
		"Recarga de Energia",
		"scheme",
		0,
		undefined,
		[
			{ type: "heal", value: 3 },
			{ type: "drawCards", value: 1 }
		],
		"Recupera fôlego rapidamente"
	)
];

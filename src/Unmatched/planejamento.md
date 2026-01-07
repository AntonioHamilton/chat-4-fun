# Planejamento: Jogo Unmatched em JavaScript

## 1. Visão Geral do Projeto

### Objetivo

Desenvolver um jogo de batalha tática assimétrica inspirado em Unmatched, onde jogadores controlam personagens únicos com baralhos personalizados em combates estratégicos.

### Plataforma

- Framework: Next.js (já configurado no projeto)
- Linguagem: TypeScript
- Estilização: Styled Components
- Estado: React Hooks + Context API (se necessário)

## 2. Mecânicas Principais do Jogo

### 2.1 Sistema de Turnos

- Cada jogador realiza **2 ações por turno**
- Ações disponíveis:
  - **Manobra**: Comprar carta + mover personagem
  - **Ataque**: Jogar carta de ataque contra oponente
  - **Esquema**: Ativar habilidade especial

### 2.2 Sistema de Combate

- Resolução por comparação de valores (ataque vs defesa)
- Cartas têm valores numéricos e efeitos especiais
- Dano reduz pontos de vida do personagem

### 2.3 Sistema de Movimentação

- Tabuleiro com zonas/posições
- Alcance para ataques (corpo a corpo vs distância)
- Regras de adjacência

### 2.4 Condições de Vitória

- Eliminar o personagem adversário
- Objetivos alternativos (opcional)

## 3. Estrutura de Dados

### 3.1 Personagem (Character)

```typescript
type Character = {
	id: string;
	name: string;
	health: number;
	maxHealth: number;
	position: { x: number; y: number };
	deck: Card[];
	hand: Card[];
	discardPile: Card[];
	specialAbility: Ability;
};
```

### 3.2 Carta (Card)

```typescript
type Card = {
	id: string;
	name: string;
	type: "attack" | "defense" | "scheme" | "maneuver";
	value: number;
	range?: number;
	effects?: Effect[];
	description: string;
};
```

### 3.3 Tabuleiro (Board)

```typescript
type Board = {
	width: number;
	height: number;
	zones: Zone[][];
	obstacles?: Obstacle[];
};
```

### 3.4 Estado do Jogo (GameState)

```typescript
type GameState = {
	currentPlayer: number;
	players: Character[];
	board: Board;
	turn: number;
	phase: "setup" | "playing" | "finished";
	winner?: number;
};
```

## 4. Estrutura de Arquivos

```
src/
├── Unmatched/
│   ├── Components/
│   │   ├── Board/
│   │   │   ├── Board.tsx
│   │   │   ├── Zone.tsx
│   │   │   └── styled.ts
│   │   ├── Character/
│   │   │   ├── Character.tsx
│   │   │   ├── CharacterCard.tsx
│   │   │   └── styled.ts
│   │   ├── Card/
│   │   │   ├── Card.tsx
│   │   │   ├── Hand.tsx
│   │   │   ├── Deck.tsx
│   │   │   └── styled.ts
│   │   ├── UI/
│   │   │   ├── ActionButtons.tsx
│   │   │   ├── HealthBar.tsx
│   │   │   ├── TurnIndicator.tsx
│   │   │   └── styled.ts
│   │   └── GameOver/
│   │       ├── GameOver.tsx
│   │       └── styled.ts
│   ├── Hooks/
│   │   ├── useUnmatched.tsx
│   │   ├── useGameLogic.tsx
│   │   ├── useCombat.tsx
│   │   └── useMovement.tsx
│   ├── Types/
│   │   ├── character.types.ts
│   │   ├── card.types.ts
│   │   ├── board.types.ts
│   │   └── game.types.ts
│   ├── Constants/
│   │   ├── characters.ts
│   │   ├── cards.ts
│   │   └── boards.ts
│   ├── Utils/
│   │   ├── combat.ts
│   │   ├── movement.ts
│   │   ├── cardEffects.ts
│   │   └── gameRules.ts
│   └── Context/
│       └── GameContext.tsx
└── pages/
    └── brasil-unmatched/
        └── index.tsx
```

## 5. Personagens MVP: Gon e Killua

### 5.1 Gon Freecss

**Tipo de Nen**: Reforço (Enhancement)

**Saúde**: 16

**Habilidade Especial**: Jajanken (Pedra-Papel-Tesoura)

- Gon concentra Nen e escolhe uma das três variações antes de atacar
- Cada variação tem propriedades únicas

**Estilo de Jogo**: Equilibrado, focado em ataques diretos e resistência

**Baralho (30 cartas)**:

#### Cartas de Ataque (10)

1. **Jajanken: Pedra (Guu)** x3
   - Valor: 5
   - Alcance: 1
   - Efeito: Se usado após uma carta de Manobra, causa +2 de dano
   - Descrição: "Concentra Nen no punho para um soco devastador"

2. **Jajanken: Tesoura (Chii)** x3
   - Valor: 3
   - Alcance: 2
   - Efeito: Ignora 1 ponto de defesa
   - Descrição: "Transforma aura em lâmina afiada para cortes precisos"

3. **Jajanken: Papel (Paa)** x2
   - Valor: 4
   - Alcance: 3
   - Efeito: Pode atacar mesmo se não estiver adjacente
   - Descrição: "Emite onda de aura em forma de projétil"

4. **Soco Potente** x2
   - Valor: 3
   - Alcance: 1
   - Descrição: "Ataque corpo a corpo direto e poderoso"

#### Cartas de Defesa (10)

1. **Bloqueio com Vara de Pesca** x3
   - Valor: 3
   - Efeito: Se defender com sucesso, compra 1 carta
   - Descrição: "Usa a vara de pesca para desviar ataques"

2. **Esquiva Ágil** x3
   - Valor: 2
   - Efeito: Move 1 espaço após defender
   - Descrição: "Movimento rápido para evitar o ataque"

3. **Determinação Inabalável** x2
   - Valor: 4
   - Efeito: Restaura 2 de vida ao defender
   - Descrição: "Sua vontade o mantém de pé"

4. **Contra-ataque** x2
   - Valor: 2
   - Efeito: Causa 1 de dano ao atacante se defender com sucesso
   - Descrição: "Retalia imediatamente após bloquear"

#### Cartas de Esquema (5)

1. **Foco Determinado** x2
   - Efeito: Próximo ataque causa +3 de dano
   - Descrição: "Concentra toda sua energia no próximo golpe"

2. **Recuperação de Energia** x2
   - Efeito: Restaura 4 de vida
   - Descrição: "Descansa e recupera forças"

3. **Vara de Pesca Extendida** x1
   - Efeito: Move até 3 espaços e pode atacar no mesmo turno
   - Descrição: "Usa a vara para alcançar o oponente"

#### Cartas de Manobra (5)

1. **Investida Selvagem** x3
   - Valor: 0
   - Efeito: Move 2 espaços e compra 2 cartas
   - Descrição: "Avança rapidamente em direção ao oponente"

2. **Posicionamento Estratégico** x2
   - Valor: 0
   - Efeito: Move 1 espaço e próxima carta de ataque tem +1 de valor
   - Descrição: "Se posiciona para um ataque mais eficaz"

### 5.2 Killua Zoldyck

**Tipo de Nen**: Transformação (Transmutation)

**Saúde**: 14

**Habilidade Especial**: Godspeed (Velocidade Divina)

- Killua pode ativar Godspeed uma vez por turno
- Durante Godspeed: pode realizar 1 ação adicional e ignora o primeiro ataque recebido
- Redemoinho (Whirlwind): reage automaticamente a ataques, permitindo contra-ataques

**Estilo de Jogo**: Ágil e furtivo, focado em ataques rápidos e evasão

**Baralho (30 cartas)**:

#### Cartas de Ataque (10)

1. **Golpe Relâmpago** x3
   - Valor: 4
   - Alcance: 1
   - Efeito: Se Killua usou Godspeed neste turno, causa +2 de dano
   - Descrição: "Ataque elétrico extremamente rápido"

2. **Corte Rápido** x3
   - Valor: 3
   - Alcance: 1
   - Efeito: Pode atacar novamente se eliminar o alvo
   - Descrição: "Corte preciso com as garras"

3. **Thunderbolt** x2
   - Valor: 5
   - Alcance: 2
   - Efeito: Se o oponente não defender, causa dano adicional de 1
   - Descrição: "Projétil elétrico à distância"

4. **Assassinato Silencioso** x2
   - Valor: 3
   - Alcance: 1
   - Efeito: Ignora defesa se atacar pelas costas (oponente não está virado para Killua)
   - Descrição: "Ataque furtivo típico dos Zoldyck"

#### Cartas de Defesa (10)

1. **Esquiva Relâmpago** x3
   - Valor: 3
   - Efeito: Move 2 espaços após defender
   - Descrição: "Usa velocidade extrema para evitar o ataque"

2. **Bloqueio com Yo-Yo** x3
   - Valor: 2
   - Efeito: Se defender com sucesso, pode atacar imediatamente com valor 2
   - Descrição: "Usa o yo-yo como escudo e arma"

3. **Contra-ataque Elétrico** x2
   - Valor: 2
   - Efeito: Causa 2 de dano ao atacante se defender com sucesso
   - Descrição: "Retalia com eletricidade"

4. **Resistência Zoldyck** x2
   - Valor: 4
   - Efeito: Reduz todo dano recebido neste turno em 1
   - Descrição: "Treinamento intenso o torna mais resistente"

#### Cartas de Esquema (5)

1. **Godspeed: Modo Ativado** x2
   - Efeito: Próximos 2 turnos, Killua pode realizar 1 ação adicional por turno e ignora o primeiro ataque recebido
   - Descrição: "Ativa sua velocidade máxima"

2. **Análise do Oponente** x2
   - Efeito: Compra 3 cartas e descarta 1
   - Descrição: "Observa cuidadosamente para encontrar fraquezas"

3. **Recarga de Energia** x1
   - Efeito: Restaura 3 de vida e compra 1 carta
   - Descrição: "Recupera fôlego rapidamente"

#### Cartas de Manobra (5)

1. **Investida Elétrica** x3
   - Valor: 0
   - Efeito: Move até 3 espaços e próxima carta de ataque tem alcance +1
   - Descrição: "Move-se com velocidade sobre-humana"

2. **Posicionamento Furtivo** x2
   - Valor: 0
   - Efeito: Move 2 espaços e próxima carta de ataque ignora 1 ponto de defesa
   - Descrição: "Se posiciona para um ataque pelas costas"

## 6. Fases de Desenvolvimento

### Fase 1: Fundação (MVP Básico)

**Objetivo**: Criar estrutura básica funcional

1. **Setup Inicial**
   - Criar estrutura de pastas
   - Definir tipos TypeScript básicos
   - Configurar página do jogo

2. **Sistema de Tabuleiro**
   - Componente de tabuleiro básico (grid)
   - Sistema de zonas/posições
   - Renderização visual

3. **Sistema de Personagens**
   - Estrutura de dados de personagem
   - Renderização de Gon e Killua no tabuleiro
   - Barra de vida básica

4. **Sistema de Cartas Básico**
   - Estrutura de dados de carta
   - Renderização de mão (hand)
   - Sistema de compra/descarte
   - Implementar baralhos de Gon e Killua

**Resultado Esperado**: Tabuleiro com Gon e Killua que podem ser movidos manualmente

### Fase 2: Mecânicas Core

**Objetivo**: Implementar regras básicas de jogo

1. **Sistema de Turnos**
   - Alternância de jogadores
   - Indicador de turno
   - Limite de 2 ações por turno

2. **Sistema de Movimentação**
   - Validação de movimentos
   - Regras de alcance
   - Animações de movimento

3. **Sistema de Combate Básico**
   - Seleção de alvo
   - Comparação de valores de carta
   - Cálculo de dano
   - Atualização de vida

4. **Ações do Jogo**
   - Botão Manobra (comprar + mover)
   - Botão Ataque
   - Botão Esquema

5. **Habilidades Especiais**
   - Implementar Jajanken (Gon)
   - Implementar Godspeed (Killua)

**Resultado Esperado**: Jogo jogável com regras básicas funcionando

### Fase 3: Sistema de Cartas Completo

**Objetivo**: Implementar sistema completo de cartas

1. **Tipos de Cartas**
   - Cartas de Ataque
   - Cartas de Defesa
   - Cartas de Esquema
   - Cartas de Manobra

2. **Efeitos de Cartas**
   - Sistema de efeitos genérico
   - Efeitos especiais (dano extra, movimento, etc)
   - Efeitos condicionais
   - Implementar todos os efeitos das cartas de Gon e Killua

3. **Baralhos de Personagens**
   - Sistema de embaralhamento
   - Gerenciamento de mão/deck/descarte
   - Limite de mão (7 cartas)

4. **UI de Cartas**
   - Visualização detalhada de cartas
   - Animações de jogada
   - Feedback visual
   - Design temático para cada personagem

**Resultado Esperado**: Sistema completo de cartas com todos os efeitos funcionando

### Fase 4: Balanceamento e Testes

**Objetivo**: Garantir gameplay balanceado

1. **Testes de Gameplay**
   - Testar matchups Gon vs Killua
   - Verificar balanceamento de cartas
   - Ajustar valores se necessário

2. **Ajustes de Balanceamento**
   - Ajuste de valores de cartas
   - Ajuste de saúde dos personagens
   - Ajuste de habilidades especiais

3. **Visual dos Personagens**
   - Sprites/ícones únicos para Gon e Killua (👊 e ⚡)
   - Gradientes visuais diferenciados
   - CSS para animações de ataque e dano (preparado)

**Resultado Esperado**: Gon e Killua balanceados e jogáveis

### Fase 5: Polimento e UX

**Objetivo**: Melhorar experiência do jogador

1. **Animações**
   - ✅ Animações de movimento (transição suave no CharacterMarker)
   - ✅ Animações de combate (attackPulse e damageShake preparadas)
   - ✅ Transições suaves (CSS transitions em todos os componentes)
   - ⏭️ Animações especiais para Jajanken e Godspeed (habilidades removidas)

2. **Feedback Visual**
   - ✅ Destaque de ações possíveis (zones válidas destacadas)
   - ✅ Indicadores de alcance (highlight verde para ataques)
   - ✅ Efeitos visuais de dano (animação damageShake)
   - ⏭️ Feedback para habilidades especiais (habilidades removidas)

3. **UI/UX**
   - ✅ Interface intuitiva
   - ✅ Tooltips explicando cartas e habilidades (atributo title com descrições detalhadas)
   - ✅ Componente StatusMessage criado (preparado para uso)
   - ✅ Design temático Hunter x Hunter (cores e gradientes)

4. **Som (Opcional)**
   - ⏭️ Efeitos sonoros básicos (não implementado)
   - ⏭️ Música de fundo (não implementado)

**Resultado Esperado**: Jogo polido e agradável de jogar

## 7. Implementação Técnica Detalhada

### 7.1 Hook Principal: useUnmatched

```typescript
export const useUnmatched = () => {
	const [gameState, setGameState] = useState<GameState>(initialState);
	const [selectedCard, setSelectedCard] = useState<Card | null>(null);
	const [selectedAction, setSelectedAction] = useState<Action | null>(null);
	const [jajankenMode, setJajankenMode] = useState<
		"guu" | "chii" | "paa" | null
	>(null);
	const [godspeedActive, setGodspeedActive] = useState(false);

	const performAction = useCallback((action: Action) => {
		// Lógica de ação
	}, []);

	const playCard = useCallback((card: Card, target?: Character) => {
		// Lógica de jogar carta
		// Aplicar efeitos especiais (Jajanken, Godspeed, etc)
	}, []);

	const moveCharacter = useCallback(
		(characterId: string, position: Position) => {
			// Lógica de movimento
		},
		[]
	);

	const activateJajanken = useCallback((mode: "guu" | "chii" | "paa") => {
		setJajankenMode(mode);
	}, []);

	const activateGodspeed = useCallback(() => {
		setGodspeedActive(true);
	}, []);

	return {
		gameState,
		selectedCard,
		selectedAction,
		jajankenMode,
		godspeedActive,
		performAction,
		playCard,
		moveCharacter,
		activateJajanken,
		activateGodspeed
	};
};
```

### 7.2 Sistema de Combate

```typescript
export const resolveCombat = (
	attacker: Character,
	defender: Character,
	attackCard: Card,
	defenseCard?: Card
): CombatResult => {
	let attackValue = attackCard.value;
	let defenseValue = defenseCard?.value || 0;

	// Aplicar efeitos de Jajanken
	if (attacker.id === "gon" && attackCard.name.includes("Jajanken")) {
		// Efeitos específicos de cada variação já aplicados na carta
	}

	// Aplicar efeitos de Godspeed
	if (attacker.id === "killua" && godspeedActive) {
		attackValue += 2;
	}

	// Aplicar efeitos de defesa
	if (defenseCard?.effects) {
		defenseCard.effects.forEach((effect) => {
			if (effect.type === "reduceDamage") {
				defenseValue += effect.value;
			}
		});
	}

	const damage = Math.max(0, attackValue - defenseValue);

	return {
		damage,
		attackerCard: attackCard,
		defenderCard: defenseCard,
		success: damage > 0
	};
};
```

### 7.3 Sistema de Movimento

```typescript
export const isValidMove = (
	from: Position,
	to: Position,
	board: Board,
	character: Character
): boolean => {
	const distance = calculateDistance(from, to);
	const isInRange = distance <= character.moveRange;
	const isZoneValid = board.zones[to.y]?.[to.x]?.accessible;

	return isInRange && isZoneValid;
};
```

### 7.4 Sistema de Multiplayer (Convite por Link)

```typescript
// Criar partida e gerar link único
const createGame = async (): Promise<string> => {
	const gameId = generateUniqueId();
	const gameLink = `${window.location.origin}/unmatched?game=${gameId}`;

	await socket.emit("create-game", { gameId });
	return gameLink;
};

// Entrar em partida via link
const joinGame = async (gameId: string) => {
	await socket.emit("join-game", { gameId });
};

// Sincronizar estado do jogo
socket.on("game-state-update", (gameState: GameState) => {
	setGameState(gameState);
});

// Enviar ação para o servidor
const sendAction = (action: Action) => {
	socket.emit("player-action", { gameId, action });
};
```

### 7.5 Sistema de IA para Bots

```typescript
type BotDifficulty = "easy" | "medium" | "hard";

type BotDecision = {
	action: Action;
	card?: Card;
	target?: Position | Character;
};

export const botMakeDecision = (
	gameState: GameState,
	botCharacter: Character,
	difficulty: BotDifficulty
): BotDecision => {
	const availableActions = getAvailableActions(gameState, botCharacter);
	const hand = botCharacter.hand;

	// Análise da situação
	const enemyHealth = getEnemyHealth(gameState, botCharacter);
	const distance = calculateDistance(
		botCharacter.position,
		getEnemyPosition(gameState, botCharacter)
	);

	// Estratégia baseada em dificuldade
	switch (difficulty) {
		case "easy":
			return botEasyDecision(availableActions, hand, distance);
		case "medium":
			return botMediumDecision(availableActions, hand, distance, enemyHealth);
		case "hard":
			return botHardDecision(
				availableActions,
				hand,
				distance,
				enemyHealth,
				gameState
			);
	}
};

const botEasyDecision = (
	actions: Action[],
	hand: Card[],
	distance: number
): BotDecision => {
	// IA simples: prioriza ataques quando próximo
	if (distance <= 2) {
		const attackCards = hand.filter((card) => card.type === "attack");
		if (attackCards.length > 0) {
			return {
				action: "attack",
				card: attackCards[Math.floor(Math.random() * attackCards.length)]
			};
		}
	}

	// Caso contrário, faz manobra
	return {
		action: "maneuver",
		card: hand.find((card) => card.type === "maneuver") || hand[0]
	};
};

const botMediumDecision = (
	actions: Action[],
	hand: Card[],
	distance: number,
	enemyHealth: number
): BotDecision => {
	// IA média: considera saúde do inimigo e posicionamento
	if (enemyHealth <= 5 && distance <= 2) {
		const bestAttack = hand
			.filter((card) => card.type === "attack")
			.sort((a, b) => b.value - a.value)[0];

		if (bestAttack) {
			return { action: "attack", card: bestAttack };
		}
	}

	// Mantém distância se com pouca vida
	if (distance <= 1) {
		const defenseCards = hand.filter((card) => card.type === "defense");
		if (defenseCards.length > 0) {
			return { action: "maneuver" };
		}
	}

	return botEasyDecision(actions, hand, distance);
};

const botHardDecision = (
	actions: Action[],
	hand: Card[],
	distance: number,
	enemyHealth: number,
	gameState: GameState
): BotDecision => {
	// IA difícil: análise profunda de situação
	// Considera cartas do oponente, probabilidades, combos
	const enemyHandSize = getEnemyHandSize(gameState);
	const bestMove = calculateBestMove(gameState, hand, distance, enemyHealth);

	return bestMove;
};
```

## 8. Checklist de Desenvolvimento

### Setup

- [ ] Criar estrutura de pastas
- [ ] Definir tipos TypeScript
- [ ] Configurar página do jogo

### Tabuleiro

- [ ] Componente de tabuleiro
- [ ] Sistema de zonas
- [ ] Renderização visual

### Personagens

- [ ] Estrutura de dados
- [ ] Renderização de Gon no tabuleiro
- [ ] Renderização de Killua no tabuleiro
- [ ] Sistema de vida
- [ ] Habilidade Jajanken (Gon)
- [ ] Habilidade Godspeed (Killua)

### Cartas

- [ ] Estrutura de dados
- [ ] Sistema de mão/deck/descarte
- [ ] Renderização de cartas
- [ ] Baralho completo de Gon (30 cartas)
- [ ] Baralho completo de Killua (30 cartas)
- [ ] Implementar todos os efeitos de cartas

### Mecânicas

- [ ] Sistema de turnos
- [ ] Sistema de movimento
- [ ] Sistema de combate
- [ ] Ações do jogo
- [ ] Efeitos especiais de cartas

### Balanceamento

- [ ] Testes Gon vs Killua
- [ ] Ajuste de valores
- [ ] Ajuste de habilidades especiais

### Polimento

- [ ] Animações
- [ ] Feedback visual
- [ ] UI/UX
- [ ] Design temático

### Bots (Opcional)

- [ ] Sistema básico de IA
- [ ] Nível fácil (decisões simples)
- [ ] Nível médio (considera saúde e posição)
- [ ] Nível difícil (análise estratégica avançada)
- [ ] Interface para escolher dificuldade
- [ ] Testes de balanceamento contra bots

## 9. Próximos Passos Imediatos

1. **Criar estrutura básica**
   - Pasta `src/Unmatched/`
   - Tipos básicos em `Types/`
   - Página em `pages/unmatched/index.tsx`

2. **Implementar tabuleiro básico**
   - Componente Board com grid
   - Sistema de posições
   - Renderização visual

3. **Adicionar Gon e Killua**
   - Estrutura de Character
   - Renderização no tabuleiro
   - Sistema de vida
   - Habilidades especiais básicas

4. **Implementar sistema de cartas básico**
   - Estrutura de Card
   - Renderização de mão
   - Sistema de compra/descarte
   - Baralhos iniciais de Gon e Killua

## 10. Notas Importantes

- Começar com MVP mínimo e iterar
- Testar mecânicas básicas antes de adicionar complexidade
- Manter código modular e reutilizável
- Seguir padrões do projeto (styled-components, TypeScript, hooks)
- Priorizar gameplay sobre gráficos no início
- Documentar decisões de design importantes
- Focar no balanceamento entre Gon e Killua para o MVP
- Implementar habilidades especiais de forma clara e intuitiva

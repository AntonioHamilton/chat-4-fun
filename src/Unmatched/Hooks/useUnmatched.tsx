import { useState, useCallback } from "react";
import { GameState, Action } from "../Types/game.types";
import { Character } from "../Types/character.types";
import { Card } from "../Types/card.types";
import { createGon, createKillua } from "../Constants/characters";
import { createBasicBoard } from "../Constants/boards";
import { isValidMove } from "../Utils/movement";
import { resolveCombat, canAttack } from "../Utils/combat";
import { applyEffects, applyDrawCards, applyHeal } from "../Utils/cardEffects";

const drawInitialHand = (
	character: Character,
	count: number = 5
): Character => {
	const newHand = character.deck.slice(0, count);
	const newDeck = character.deck.slice(count);

	return {
		...character,
		hand: newHand,
		deck: newDeck
	};
};

const shuffleDeck = (cards: Card[]): Card[] => {
	const shuffled = [...cards];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled;
};

const MAX_HAND_SIZE = 7;

const drawCard = (character: Character): Character => {
	if (character.hand.length >= MAX_HAND_SIZE) {
		return character;
	}

	if (character.deck.length === 0) {
		if (character.discardPile.length === 0) {
			return character;
		}
		const shuffledDeck = shuffleDeck(character.discardPile);
		return drawCard({
			...character,
			deck: shuffledDeck,
			discardPile: []
		});
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

const discardCard = (character: Character, cardId: string): Character => {
	const cardIndex = character.hand.findIndex((card) => card.id === cardId);
	if (cardIndex === -1) {
		return character;
	}

	const card = character.hand[cardIndex];
	const newHand = character.hand.filter((card) => card.id !== cardId);
	const newDiscardPile = [...character.discardPile, card];

	return {
		...character,
		hand: newHand,
		discardPile: newDiscardPile
	};
};

const createInitialGameState = (): GameState => {
	const board = createBasicBoard(10, 7);

	const gonWithShuffledDeck = {
		...createGon({ x: 1, y: 3 }),
		deck: shuffleDeck(createGon({ x: 1, y: 3 }).deck)
	};
	const killuaWithShuffledDeck = {
		...createKillua({ x: 8, y: 3 }),
		deck: shuffleDeck(createKillua({ x: 6, y: 3 }).deck)
	};

	const gon = drawInitialHand(gonWithShuffledDeck);
	const killua = drawInitialHand(killuaWithShuffledDeck);

	return {
		currentPlayer: 0,
		players: [gon, killua],
		board,
		turn: 1,
		phase: "setup",
		actionsRemaining: 2,
		godspeedActive: false,
		godspeedTurnsRemaining: 0,
		activeEffects: {}
	};
};

export const useUnmatched = () => {
	const [gameState, setGameState] = useState<GameState>(createInitialGameState);
	const [selectedPosition, setSelectedPosition] = useState<{
		x: number;
		y: number;
	} | null>(null);
	const [selectedCard, setSelectedCard] = useState<Card | null>(null);
	const [currentAction, setCurrentAction] = useState<Action | null>(null);
	const [jajankenMode, setJajankenMode] = useState<
		"guu" | "chii" | "paa" | null
	>(null);
	const [godspeedActive, setGodspeedActive] = useState(false);

	const endTurn = useCallback(() => {
		setGameState((prev) => {
			if (prev.phase === "finished") {
				return prev;
			}

			const nextPlayer = (prev.currentPlayer + 1) % prev.players.length;
			const newTurn = nextPlayer === 0 ? prev.turn + 1 : prev.turn;

			return {
				...prev,
				currentPlayer: nextPlayer,
				turn: newTurn,
				actionsRemaining: 2,
				lastUsedScheme: undefined
			};
		});
		setSelectedCard(null);
		setCurrentAction(null);
		setSelectedPosition(null);
		setJajankenMode(null);
	}, []);

	const useAction = useCallback(() => {
		setGameState((prev) => {
			if (prev.actionsRemaining <= 0) {
				return prev;
			}
			return {
				...prev,
				actionsRemaining: prev.actionsRemaining - 1
			};
		});
		setCurrentAction(null);
		setSelectedCard(null);
	}, []);

	const performManeuver = useCallback(
		(newPosition: { x: number; y: number }) => {
			setGameState((prev) => {
				if (prev.actionsRemaining <= 0) {
					return prev;
				}

				const currentCharacter = prev.players[prev.currentPlayer];

				if (
					!isValidMove(
						currentCharacter.position,
						newPosition,
						prev.board,
						currentCharacter
					)
				) {
					return prev;
				}

				let updatedCharacter = {
					...currentCharacter,
					position: newPosition
				};

				updatedCharacter = drawCard(updatedCharacter);

				const updatedPlayers = prev.players.map((char) =>
					char.id === currentCharacter.id ? updatedCharacter : char
				);

				return {
					...prev,
					players: updatedPlayers,
					actionsRemaining: Math.max(0, prev.actionsRemaining - 1)
				};
			});
			setSelectedPosition(null);
			setCurrentAction(null);
		},
		[]
	);

	const performAttack = useCallback(
		(attackCard: Card, targetPosition: { x: number; y: number }) => {
			if (!attackCard) {
				return;
			}

			setGameState((prev) => {
				if (prev.actionsRemaining <= 0) {
					return prev;
				}

				const attacker = prev.players[prev.currentPlayer];
				const defender = prev.players.find(
					(char) =>
						char.position.x === targetPosition.x &&
						char.position.y === targetPosition.y &&
						char.id !== attacker.id
				);

				if (!defender || !canAttack(attacker, defender, attackCard)) {
					return prev;
				}

				return {
					...prev,
					phase: "waitingForDefense",
					pendingAttack: {
						attackerId: attacker.id,
						defenderId: defender.id,
						attackCard,
						targetPosition
					}
				};
			});
			setSelectedCard(null);
			setSelectedPosition(null);
			setCurrentAction(null);
		},
		[]
	);

	const performDefense = useCallback((defenseCard?: Card) => {
		setGameState((prev) => {
			if (prev.phase !== "waitingForDefense" || !prev.pendingAttack) {
				return prev;
			}

			const { attackerId, defenderId, attackCard } = prev.pendingAttack;

			const attacker = prev.players.find((char) => char.id === attackerId);
			const defender = prev.players.find((char) => char.id === defenderId);

			if (!attacker || !defender) {
				return prev;
			}

			let attackBonus = prev.activeEffects?.attackBonus || 0;
			let ignoreDefenseAmount = prev.activeEffects?.ignoreDefense || 0;

			if (attackCard.effects) {
				const attackEffects = applyEffects(attackCard.effects, {
					attacker,
					defender,
					gameState: prev
				});
				attackBonus += attackEffects.attackBonus || 0;
				ignoreDefenseAmount += attackEffects.ignoreDefense || 0;
			}

			const modifiedAttackCard = {
				...attackCard,
				value: attackCard.value + attackBonus
			};

			const combatResult = resolveCombat(
				attacker,
				defender,
				modifiedAttackCard,
				defenseCard,
				ignoreDefenseAmount
			);

			let updatedDefender = {
				...defender,
				health: Math.max(0, defender.health - combatResult.damage)
			};

			let updatedAttacker = discardCard(attacker, attackCard.id);

			if (defenseCard) {
				updatedDefender = discardCard(updatedDefender, defenseCard.id);

				if (defenseCard.effects && combatResult.success === false) {
					const defenseEffects = applyEffects(defenseCard.effects, {
						attacker: updatedDefender,
						defender: updatedAttacker,
						gameState: prev,
						isDefenseSuccessful: true
					});

					if (defenseEffects.healAmount) {
						updatedDefender = applyHeal(
							updatedDefender,
							defenseEffects.healAmount
						);
					}

					if (defenseEffects.drawCards) {
						updatedDefender = applyDrawCards(
							updatedDefender,
							defenseEffects.drawCards
						);
					}

					if (defenseEffects.counterDamage) {
						updatedAttacker = {
							...updatedAttacker,
							health: Math.max(
								0,
								updatedAttacker.health - defenseEffects.counterDamage
							)
						};
					}
				}
			}

			const updatedPlayers = prev.players.map((char) => {
				if (char.id === defender.id) {
					return updatedDefender;
				}
				if (char.id === attacker.id) {
					return updatedAttacker;
				}
				return char;
			});

			const winner =
				updatedDefender.health <= 0 ? prev.currentPlayer : undefined;

			return {
				...prev,
				players: updatedPlayers,
				actionsRemaining: Math.max(0, prev.actionsRemaining - 1),
				activeEffects: {},
				phase: winner !== undefined ? "finished" : "playing",
				pendingAttack: undefined,
				winner
			};
		});
		setSelectedCard(null);
		setSelectedPosition(null);
		setCurrentAction(null);
	}, []);

	const performScheme = useCallback((schemeCard: Card) => {
		setGameState((prev) => {
			if (prev.actionsRemaining <= 0) {
				return prev;
			}

			const currentCharacter = prev.players[prev.currentPlayer];
			let updatedCharacter = discardCard(currentCharacter, schemeCard.id);

			if (schemeCard.effects) {
				const effectResult = applyEffects(schemeCard.effects, {
					attacker: currentCharacter,
					gameState: prev
				});

				if (effectResult.drawCards) {
					updatedCharacter = applyDrawCards(
						updatedCharacter,
						effectResult.drawCards
					);
				}

				if (effectResult.healAmount) {
					updatedCharacter = applyHeal(
						updatedCharacter,
						effectResult.healAmount
					);
				}

				if (effectResult.discardCards) {
					for (let i = 0; i < effectResult.discardCards; i++) {
						if (updatedCharacter.hand.length > 0) {
							const cardToDiscard = updatedCharacter.hand[0];
							updatedCharacter = discardCard(
								updatedCharacter,
								cardToDiscard.id
							);
						}
					}
				}

				const newActiveEffects = {
					attackBonus:
						effectResult.attackBonus || prev.activeEffects?.attackBonus,
					rangeBonus: effectResult.rangeBonus || prev.activeEffects?.rangeBonus,
					ignoreDefense:
						effectResult.ignoreDefense || prev.activeEffects?.ignoreDefense
				};

				const updatedPlayers = prev.players.map((char) =>
					char.id === currentCharacter.id ? updatedCharacter : char
				);

				return {
					...prev,
					players: updatedPlayers,
					actionsRemaining: Math.max(0, prev.actionsRemaining - 1),
					activeEffects: newActiveEffects,
					godspeedActive:
						effectResult.extraAction || prev.godspeedActive || false,
					godspeedTurnsRemaining: effectResult.extraAction
						? 2
						: prev.godspeedTurnsRemaining || 0,
					lastUsedScheme: schemeCard
				};
			}

			const updatedPlayers = prev.players.map((char) =>
				char.id === currentCharacter.id ? updatedCharacter : char
			);

			return {
				...prev,
				players: updatedPlayers,
				actionsRemaining: Math.max(0, prev.actionsRemaining - 1),
				lastUsedScheme: schemeCard
			};
		});
		setSelectedCard(null);
		setCurrentAction(null);
	}, []);

	const handleZoneClick = useCallback(
		(x: number, y: number) => {
			if (gameState.phase === "finished") {
				return;
			}

			if (gameState.actionsRemaining <= 0) {
				return;
			}

			if (currentAction === "maneuver") {
				performManeuver({ x, y });
			} else if (currentAction === "attack") {
				if (!selectedCard) {
					return;
				}
				performAttack(selectedCard, { x, y });
			}
		},
		[
			currentAction,
			selectedCard,
			performManeuver,
			performAttack,
			gameState.actionsRemaining,
			gameState.phase
		]
	);

	const handleCardClick = useCallback(
		(card: Card) => {
			if (gameState.phase === "finished") {
				return;
			}

			if (gameState.actionsRemaining <= 0) {
				return;
			}

			if (card.type === "attack") {
				setSelectedCard(card);
				setCurrentAction("attack");
			} else if (card.type === "scheme") {
				performScheme(card);
			}
		},
		[performScheme, gameState.actionsRemaining, gameState.phase]
	);

	const handleActionClick = useCallback(
		(action: Action) => {
			if (gameState.phase === "finished") {
				return;
			}
			setCurrentAction(action);
			setSelectedCard(null);
		},
		[gameState.phase]
	);

	const activateJajanken = useCallback((mode: "guu" | "chii" | "paa") => {
		setJajankenMode(mode);
	}, []);

	const activateGodspeed = useCallback(() => {
		setGodspeedActive(true);
	}, []);

	const startGame = useCallback(() => {
		setGameState((prev) => ({ ...prev, phase: "playing" }));
	}, []);

	return {
		gameState,
		selectedPosition,
		selectedCard,
		currentAction,
		jajankenMode,
		godspeedActive,
		moveCharacter: performManeuver,
		handleZoneClick,
		handleCardClick,
		handleActionClick,
		performAttack,
		performDefense,
		performScheme,
		activateJajanken,
		activateGodspeed,
		endTurn,
		startGame
	};
};

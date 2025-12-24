import { useState, useCallback } from "react";
import { GameState, Action } from "../Types/game.types";
import { Character } from "../Types/character.types";
import { Card } from "../Types/card.types";
import { createGon, createKillua } from "../Constants/characters";
import { createBasicBoard } from "../Constants/boards";
import { isValidMove } from "../Utils/movement";
import { resolveCombat, canAttack } from "../Utils/combat";

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

const drawCard = (character: Character): Character => {
	if (character.deck.length === 0) {
		const shuffledDeck = [...character.discardPile];
		character.discardPile = [];
		character.deck = shuffledDeck;
	}

	if (character.deck.length === 0) {
		return character;
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
	const board = createBasicBoard(8, 6);
	const gon = drawInitialHand(createGon({ x: 1, y: 3 }));
	const killua = drawInitialHand(createKillua({ x: 6, y: 3 }));

	return {
		currentPlayer: 0,
		players: [gon, killua],
		board,
		turn: 1,
		phase: "setup",
		actionsRemaining: 2
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
			const nextPlayer = (prev.currentPlayer + 1) % prev.players.length;
			const newTurn = nextPlayer === 0 ? prev.turn + 1 : prev.turn;

			return {
				...prev,
				currentPlayer: nextPlayer,
				turn: newTurn,
				actionsRemaining: 2
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

				const updatedCharacter = drawCard({
					...currentCharacter,
					position: newPosition
				});

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

				const combatResult = resolveCombat(attacker, defender, attackCard);

				const updatedDefender = {
					...defender,
					health: Math.max(0, defender.health - combatResult.damage)
				};

				const updatedAttacker = discardCard(attacker, attackCard.id);

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
					winner,
					phase: winner !== undefined ? "finished" : prev.phase
				};
			});
			setSelectedCard(null);
			setSelectedPosition(null);
			setCurrentAction(null);
		},
		[]
	);

	const performScheme = useCallback((schemeCard: Card) => {
		setGameState((prev) => {
			if (prev.actionsRemaining <= 0) {
				return prev;
			}

			const currentCharacter = prev.players[prev.currentPlayer];
			let updatedCharacter = discardCard(currentCharacter, schemeCard.id);

			if (schemeCard.effects) {
				schemeCard.effects.forEach((effect) => {
					if (effect.type === "heal") {
						updatedCharacter = {
							...updatedCharacter,
							health: Math.min(
								updatedCharacter.maxHealth,
								updatedCharacter.health + (effect.value || 0)
							)
						};
					}
					if (effect.type === "drawCards") {
						for (let i = 0; i < (effect.value || 0); i++) {
							updatedCharacter = drawCard(updatedCharacter);
						}
					}
				});
			}

			const updatedPlayers = prev.players.map((char) =>
				char.id === currentCharacter.id ? updatedCharacter : char
			);

			return {
				...prev,
				players: updatedPlayers,
				actionsRemaining: Math.max(0, prev.actionsRemaining - 1)
			};
		});
		setSelectedCard(null);
		setCurrentAction(null);
	}, []);

	const handleZoneClick = useCallback(
		(x: number, y: number) => {
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
			gameState.actionsRemaining
		]
	);

	const handleCardClick = useCallback(
		(card: Card) => {
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
		[performScheme, gameState.actionsRemaining]
	);

	const handleActionClick = useCallback((action: Action) => {
		setCurrentAction(action);
		setSelectedCard(null);
	}, []);

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
		performScheme,
		activateJajanken,
		activateGodspeed,
		endTurn,
		startGame
	};
};

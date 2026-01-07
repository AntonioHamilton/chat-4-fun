import { Board } from "@/Unmatched/Components/Board/Board";
import { HealthBar } from "@/Unmatched/Components/UI/HealthBar";
import { Hand } from "@/Unmatched/Components/Card/Hand";
import { ActionButtons } from "@/Unmatched/Components/UI/ActionButtons";
import { CardModal } from "@/Unmatched/Components/UI/CardModal";
import { useUnmatched } from "@/Unmatched/Hooks/useUnmatched";
import { useState } from "react";
import { Action } from "@/Unmatched/Types/game.types";
import * as SC from "../../styles/brasil-unmatched.styled";

const Unmatched = () => {
	const {
		gameState,
		selectedPosition,
		selectedCard,
		currentAction,
		handleZoneClick,
		handleCardClick,
		handleActionClick: handleActionClickFromHook,
		performDefense,
		endTurn,
		startGame
	} = useUnmatched();

	const [isCardModalOpen, setIsCardModalOpen] = useState(false);

	const handleActionClick = (action: Action) => {
		handleActionClickFromHook(action);
		if (action === "attack") {
			setIsCardModalOpen(true);
		} else if (action === "scheme") {
			setIsCardModalOpen(true);
		}
	};

	if (gameState.phase === "setup") {
		return (
			<SC.Container>
				<SC.SetupScreen>
					<SC.Title>Unmatched: Hunter x Hunter</SC.Title>
					<SC.StartButton onClick={startGame}>Iniciar Jogo</SC.StartButton>
				</SC.SetupScreen>
			</SC.Container>
		);
	}

	return (
		<SC.Container>
			<SC.GameHeader>
				<SC.PlayerSection>
					<HealthBar character={gameState.players[0]} />
				</SC.PlayerSection>
				<SC.TurnIndicator>
					Turno: {gameState.turn} - Jogador:{" "}
					{gameState.players[gameState.currentPlayer].name}
				</SC.TurnIndicator>
				<SC.PlayerSection>
					<HealthBar character={gameState.players[1]} />
				</SC.PlayerSection>
			</SC.GameHeader>
			{gameState.phase === "finished" && gameState.winner !== undefined && (
				<SC.GameOverOverlay>
					<SC.GameOverModal>
						<SC.VictoryMessage>
							🏆 {gameState.players[gameState.winner].name} venceu! 🏆
						</SC.VictoryMessage>
						<SC.RestartButton onClick={() => window.location.reload()}>
							Jogar Novamente
						</SC.RestartButton>
					</SC.GameOverModal>
				</SC.GameOverOverlay>
			)}
			{gameState.phase === "waitingForDefense" && gameState.pendingAttack && (
				<SC.DefenseOverlay>
					<SC.DefenseModal>
						<SC.DefenseTitle>
							{
								gameState.players.find(
									(p) => p.id === gameState.pendingAttack?.defenderId
								)?.name
							}{" "}
							- Escolha uma carta de defesa ou passe
						</SC.DefenseTitle>
						<SC.DefenseOptions>
							<SC.PassButton onClick={() => performDefense()}>
								Passar (Não Defender)
							</SC.PassButton>
						</SC.DefenseOptions>
						<SC.DefenseHandSection>
							<Hand
								cards={
									gameState.players
										.find((p) => p.id === gameState.pendingAttack?.defenderId)
										?.hand.filter((card) => card.type === "defense") || []
								}
								onCardClick={(card) => performDefense(card)}
								selectedCardId={selectedCard?.id}
							/>
						</SC.DefenseHandSection>
					</SC.DefenseModal>
				</SC.DefenseOverlay>
			)}
			<SC.BoardWrapper>
				<Board
					board={gameState.board}
					characters={gameState.players}
					selectedPosition={selectedPosition}
					currentAction={currentAction}
					currentPlayerIndex={gameState.currentPlayer}
					selectedCard={selectedCard}
					onZoneClick={handleZoneClick}
				/>
			</SC.BoardWrapper>
			<SC.ActionsSection>
				<ActionButtons
					actionsRemaining={gameState.actionsRemaining}
					currentAction={currentAction}
					onActionClick={handleActionClick}
					onEndTurn={endTurn}
					disabled={
						gameState.phase === "finished" ||
						gameState.phase === "waitingForDefense"
					}
				/>
			</SC.ActionsSection>
			<SC.ViewCardsButton onClick={() => setIsCardModalOpen(true)}>
				Ver Cartas ({gameState.players[gameState.currentPlayer].hand.length})
			</SC.ViewCardsButton>
			<CardModal
				isOpen={isCardModalOpen}
				cards={gameState.players[gameState.currentPlayer].hand}
				onCardClick={handleCardClick}
				onClose={() => setIsCardModalOpen(false)}
				selectedCardId={selectedCard?.id}
				filterByAction={currentAction}
			/>
		</SC.Container>
	);
};

export default Unmatched;

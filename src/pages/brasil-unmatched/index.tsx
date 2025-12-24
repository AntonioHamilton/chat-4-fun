import { Board } from "@/Unmatched/Components/Board/Board";
import { HealthBar } from "@/Unmatched/Components/UI/HealthBar";
import { Hand } from "@/Unmatched/Components/Card/Hand";
import { ActionButtons } from "@/Unmatched/Components/UI/ActionButtons";
import { SpecialAbility } from "@/Unmatched/Components/UI/SpecialAbility";
import { useUnmatched } from "@/Unmatched/Hooks/useUnmatched";
import * as SC from "../../styles/brasil-unmatched.styled";

const Unmatched = () => {
	const {
		gameState,
		selectedPosition,
		currentAction,
		jajankenMode,
		godspeedActive,
		handleZoneClick,
		handleCardClick,
		handleActionClick,
		activateJajanken,
		activateGodspeed,
		endTurn,
		startGame
	} = useUnmatched();

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
				<SC.WinnerMessage>
					{gameState.players[gameState.winner].name} venceu!
				</SC.WinnerMessage>
			)}
			<SC.BoardWrapper>
				<Board
					board={gameState.board}
					characters={gameState.players}
					selectedPosition={selectedPosition}
					currentAction={currentAction}
					currentPlayerIndex={gameState.currentPlayer}
					onZoneClick={handleZoneClick}
				/>
			</SC.BoardWrapper>
			<SC.ActionsSection>
				<ActionButtons
					actionsRemaining={gameState.actionsRemaining}
					currentAction={currentAction}
					onActionClick={handleActionClick}
					onEndTurn={endTurn}
				/>
				<SC.SpecialAbilityWrapper>
					<SpecialAbility
						character={gameState.players[gameState.currentPlayer]}
						jajankenMode={jajankenMode}
						godspeedActive={godspeedActive}
						onJajankenSelect={activateJajanken}
						onGodspeedActivate={activateGodspeed}
					/>
				</SC.SpecialAbilityWrapper>
			</SC.ActionsSection>
			<SC.HandSection>
				<Hand
					cards={gameState.players[gameState.currentPlayer].hand}
					onCardClick={handleCardClick}
				/>
			</SC.HandSection>
		</SC.Container>
	);
};

export default Unmatched;

import * as SC from "./styled";
import { Board as BoardType } from "../../Types/board.types";
import { Character } from "../../Types/character.types";
import { Card } from "../../Types/card.types";
import { isValidMove } from "../../Utils/movement";
import { canAttack } from "../../Utils/combat";

type BoardProps = {
	board: BoardType;
	characters: Character[];
	selectedPosition?: { x: number; y: number } | null;
	currentAction?: string | null;
	currentPlayerIndex?: number;
	selectedCard?: Card | null;
	onZoneClick?: (x: number, y: number) => void;
};

export const Board = ({
	board,
	characters,
	selectedPosition,
	currentAction,
	currentPlayerIndex,
	selectedCard,
	onZoneClick
}: BoardProps) => {
	const getCharacterAtPosition = (
		x: number,
		y: number
	): Character | undefined => {
		return characters.find(
			(char) => char.position.x === x && char.position.y === y
		);
	};

	const isMoveValid = (x: number, y: number): boolean => {
		if (currentAction !== "maneuver" || currentPlayerIndex === undefined) {
			return false;
		}
		const currentCharacter = characters[currentPlayerIndex];
		if (!currentCharacter) {
			return false;
		}
		return isValidMove(
			currentCharacter.position,
			{ x, y },
			board,
			currentCharacter
		);
	};

	const isAttackValid = (x: number, y: number): boolean => {
		if (
			currentAction !== "attack" ||
			currentPlayerIndex === undefined ||
			!selectedCard
		) {
			return false;
		}
		const currentCharacter = characters[currentPlayerIndex];
		const targetCharacter = getCharacterAtPosition(x, y);
		if (
			!currentCharacter ||
			!targetCharacter ||
			currentCharacter.id === targetCharacter.id
		) {
			return false;
		}
		return canAttack(currentCharacter, targetCharacter, selectedCard);
	};

	return (
		<SC.BoardContainer
			style={{
				gridTemplateColumns: `repeat(${board.width}, 1fr)`,
				gridTemplateRows: `repeat(${board.height}, 1fr)`
			}}
		>
			{board.zones.map((row, y) =>
				row.map((zone, x) => {
					const character = getCharacterAtPosition(x, y);
					const isSelected =
						selectedPosition?.x === x && selectedPosition?.y === y;
					const isValid = isMoveValid(x, y);
					const isValidAttack = isAttackValid(x, y);

					return (
						<SC.Zone
							key={`zone-${x}-${y}`}
							$isOccupied={!!character}
							$isSelected={isSelected}
							$isValid={isValid || isValidAttack}
							onClick={() => onZoneClick?.(x, y)}
						>
							{character && (
								<SC.CharacterMarker $characterId={character.id}>
									{character.id === "gon" ? "👊" : "⚡"}
								</SC.CharacterMarker>
							)}
						</SC.Zone>
					);
				})
			)}
		</SC.BoardContainer>
	);
};

import { Position } from "../Types/game.types";
import { Board } from "../Types/board.types";
import { Character } from "../Types/character.types";

export const calculateDistance = (from: Position, to: Position): number => {
	return Math.abs(to.x - from.x) + Math.abs(to.y - from.y);
};

export const isValidMove = (
	from: Position,
	to: Position,
	board: Board,
	character: Character,
	maxDistance: number = 2
): boolean => {
	const distance = calculateDistance(from, to);

	if (distance > maxDistance) {
		return false;
	}

	if (to.x < 0 || to.x >= board.width || to.y < 0 || to.y >= board.height) {
		return false;
	}

	const zone = board.zones[to.y]?.[to.x];
	if (!zone || !zone.accessible) {
		return false;
	}

	return true;
};

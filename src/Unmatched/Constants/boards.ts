import { Board } from "../Types/board.types";

export const createBasicBoard = (
	width: number = 8,
	height: number = 6
): Board => {
	const zones: Board["zones"] = [];

	for (let y = 0; y < height; y++) {
		zones[y] = [];
		for (let x = 0; x < width; x++) {
			zones[y][x] = {
				accessible: true,
				x,
				y
			};
		}
	}

	return {
		width,
		height,
		zones
	};
};

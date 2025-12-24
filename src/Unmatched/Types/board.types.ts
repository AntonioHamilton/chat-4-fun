export type Zone = {
	accessible: boolean;
	x: number;
	y: number;
};

export type Obstacle = {
	x: number;
	y: number;
	type: string;
};

export type Board = {
	width: number;
	height: number;
	zones: Zone[][];
	obstacles?: Obstacle[];
};

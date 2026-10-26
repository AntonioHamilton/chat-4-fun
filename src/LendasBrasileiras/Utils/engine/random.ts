export type RandomFn = () => number;

export const shuffle = <T>(items: T[], random: RandomFn = Math.random): T[] => {
	const result: T[] = [...items];
	for (let i = result.length - 1; i > 0; i--) {
		const j: number = Math.floor(random() * (i + 1));
		const temp: T = result[i];
		result[i] = result[j];
		result[j] = temp;
	}
	return result;
};

export const normalize = (value: string): string =>
	value
		.normalize("NFD")
		.replace(/[̀-ͯ]/g, "")
		.toLowerCase()
		.replace(/[^a-z]/g, "");

export const countLetters = (value: string): number => normalize(value).length;

export const revealPrefix = (value: string, count: number): string => {
	let seen = 0;
	let result = "";

	for (const char of value) {
		if (/\p{L}/u.test(char)) {
			if (seen === count) break;
			seen++;
		} else if (seen === count) {
			break;
		}
		result += char;
	}

	return result;
};

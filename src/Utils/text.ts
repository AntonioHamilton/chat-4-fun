export const normalize = (value: string): string =>
	value
		.normalize("NFD")
		.replace(/[̀-ͯ]/g, "")
		.toLowerCase()
		.replace(/[^a-z]/g, "");

export const countLetters = (value: string): number => normalize(value).length;

export const levenshtein = (a: string, b: string): number => {
	let row = Array.from({ length: b.length + 1 }, (_, index) => index);

	for (let i = 1; i <= a.length; i++) {
		const next = [i];
		for (let j = 1; j <= b.length; j++) {
			next[j] = Math.min(
				row[j] + 1,
				next[j - 1] + 1,
				row[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
			);
		}
		row = next;
	}

	return row[b.length];
};

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

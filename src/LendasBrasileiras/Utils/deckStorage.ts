const STORAGE_KEY = "lendas-brasileiras:deck";

export const loadDeckId = (): string | null => {
	try {
		return window.localStorage.getItem(STORAGE_KEY);
	} catch {
		return null;
	}
};

export const saveDeckId = (deckId: string): void => {
	try {
		window.localStorage.setItem(STORAGE_KEY, deckId);
	} catch {
		return;
	}
};

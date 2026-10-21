import { useEffect, useState } from "react";

const STORAGE_KEY = "sound-enabled";
const CHANGE_EVENT = "soundChange";

export const isSoundEnabled = () => {
	try {
		return localStorage.getItem(STORAGE_KEY) !== "false";
	} catch {
		return true;
	}
};

export const setSoundEnabled = (enabled: boolean) => {
	window.dispatchEvent(
		new CustomEvent<boolean>(CHANGE_EVENT, { detail: enabled })
	);
	try {
		localStorage.setItem(STORAGE_KEY, String(enabled));
	} catch {
		return;
	}
};

export const playSound = (src: string) => {
	if (!isSoundEnabled()) return;
	new Audio(src).play().catch(() => undefined);
};

export const useSoundEnabled = () => {
	const [enabled, setEnabled] = useState(true);

	useEffect(() => {
		setEnabled(isSoundEnabled());
		const handleChange = (event: Event) =>
			setEnabled((event as CustomEvent<boolean>).detail);
		window.addEventListener(CHANGE_EVENT, handleChange);
		return () => window.removeEventListener(CHANGE_EVENT, handleChange);
	}, []);

	return enabled;
};

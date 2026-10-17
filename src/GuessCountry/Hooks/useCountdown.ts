import { useEffect, useState } from "react";

export const useCountdown = (timeLeftMs: number | null, resetKey: unknown) => {
	const [seconds, setSeconds] = useState<number | null>(null);

	useEffect(() => {
		if (timeLeftMs === null) {
			setSeconds(null);
			return;
		}

		const endsAt = Date.now() + timeLeftMs;
		const tick = () =>
			setSeconds(Math.max(0, Math.ceil((endsAt - Date.now()) / 1000)));
		tick();
		const interval = setInterval(tick, 250);
		return () => clearInterval(interval);
	}, [timeLeftMs, resetKey]);

	return seconds;
};

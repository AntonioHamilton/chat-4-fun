import { useEffect, useRef, useState } from "react";
import * as SC from "./styled";

type ServerLoadingProps = {
	ready: boolean;
	flagSrc: string;
	label: string;
	hint: string;
	onComplete: () => void;
};

const FLAG_WIDTH = 40;
const CEILING = 90;
const SLOW_RATE = 0.00006;
const FINISH_RATE = 0.3;

export const ServerLoading = ({
	ready,
	flagSrc,
	label,
	hint,
	onComplete
}: ServerLoadingProps) => {
	const [progress, setProgress] = useState(0);
	const progressRef = useRef(0);
	const onCompleteRef = useRef(onComplete);
	onCompleteRef.current = onComplete;

	useEffect(() => {
		const reducedMotion =
			typeof matchMedia === "function" &&
			matchMedia("(prefers-reduced-motion: reduce)").matches;

		if (reducedMotion) {
			progressRef.current = ready ? 100 : CEILING;
			setProgress(progressRef.current);
			if (ready) onCompleteRef.current();
			return undefined;
		}

		let frame = 0;
		let last = performance.now();

		const tick = (now: number) => {
			const delta = Math.min(now - last, 250);
			last = now;
			const current = progressRef.current;
			progressRef.current = ready
				? Math.min(current + delta * FINISH_RATE, 100)
				: current + (CEILING - current) * SLOW_RATE * delta;
			setProgress(progressRef.current);
			if (ready && progressRef.current >= 100) {
				onCompleteRef.current();
				return;
			}
			frame = requestAnimationFrame(tick);
		};

		frame = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(frame);
	}, [ready]);

	return (
		<SC.Wrapper role="status" aria-live="polite">
			<SC.Lane>
				<SC.Flag
					src={flagSrc}
					alt=""
					style={{ left: `calc((100% - ${FLAG_WIDTH}px) * ${progress / 100})` }}
				/>
			</SC.Lane>
			<SC.Track>
				<SC.Fill style={{ width: `${progress}%` }} />
			</SC.Track>
			<SC.Label>{label}</SC.Label>
			<SC.Hint>{hint}</SC.Hint>
		</SC.Wrapper>
	);
};

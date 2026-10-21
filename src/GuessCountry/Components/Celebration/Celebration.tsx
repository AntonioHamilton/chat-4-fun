import { useEffect, useRef } from "react";
import * as SC from "./styled";

type Piece = {
	x: number;
	y: number;
	vx: number;
	vy: number;
	size: number;
	rotation: number;
	spin: number;
	color: string;
};

const COLORS = [
	"#f2c94c",
	"#2ecc71",
	"#3498db",
	"#e74c3c",
	"#9b59b6",
	"#ffffff"
];
const PIECES = 160;
const DURATION_MS = 4500;
const GRAVITY = 0.0016;
const playFanfare = () => {
	new Audio("/sounds/victory.mp3").play().catch(() => undefined);
};

const createPiece = (width: number, height: number, left: boolean): Piece => ({
	x: left ? 0 : width,
	y: height,
	vx: (left ? 1 : -1) * (0.3 + Math.random() * 0.7) * (width < 600 ? 0.6 : 1),
	vy: -(0.9 + Math.random() * 0.9) * (height < 700 ? 0.8 : 1),
	size: 6 + Math.random() * 6,
	rotation: Math.random() * Math.PI * 2,
	spin: (Math.random() - 0.5) * 0.02,
	color: COLORS[Math.floor(Math.random() * COLORS.length)]
});

export const Celebration = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const context = canvas?.getContext("2d");
		if (!canvas || !context) return undefined;

		const reduceMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)"
		).matches;

		playFanfare();
		if (reduceMotion) return undefined;

		const ratio = window.devicePixelRatio || 1;
		const width = window.innerWidth;
		const height = window.innerHeight;
		canvas.width = width * ratio;
		canvas.height = height * ratio;
		context.scale(ratio, ratio);

		const pieces = Array.from({ length: PIECES }, (_, index) =>
			createPiece(width, height, index % 2 === 0)
		);
		const startedAt = performance.now();
		let last = startedAt;
		let frame = 0;

		const tick = (now: number) => {
			const delta = Math.min(now - last, 32);
			last = now;
			const elapsed = now - startedAt;
			context.clearRect(0, 0, width, height);
			context.globalAlpha = Math.min(1, (DURATION_MS - elapsed) / 800);
			pieces.forEach((piece) => {
				piece.vy += GRAVITY * delta;
				piece.vx *= 0.995;
				piece.x += piece.vx * delta;
				piece.y += piece.vy * delta;
				piece.rotation += piece.spin * delta;
				context.save();
				context.translate(piece.x, piece.y);
				context.rotate(piece.rotation);
				context.fillStyle = piece.color;
				context.fillRect(
					-piece.size / 2,
					-piece.size / 4,
					piece.size,
					piece.size / 2
				);
				context.restore();
			});
			if (elapsed < DURATION_MS) {
				frame = requestAnimationFrame(tick);
			} else {
				context.clearRect(0, 0, width, height);
			}
		};

		frame = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(frame);
	}, []);

	return <SC.Canvas ref={canvasRef} aria-hidden="true" />;
};

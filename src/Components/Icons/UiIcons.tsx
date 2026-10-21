import { ReactNode } from "react";

const Svg = ({ children }: { children: ReactNode }) => (
	<svg
		viewBox="0 0 24 24"
		width="1em"
		height="1em"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		aria-hidden="true"
	>
		{children}
	</svg>
);

export const SoundOnIcon = () => (
	<Svg>
		<path d="M11 5L6 9H2v6h4l5 4V5z" />
		<path d="M15.5 8.5a5 5 0 010 7M19 5a10 10 0 010 14" />
	</Svg>
);

export const SoundOffIcon = () => (
	<Svg>
		<path d="M11 5L6 9H2v6h4l5 4V5z" />
		<path d="M22 9l-6 6M16 9l6 6" />
	</Svg>
);

export const InfoIcon = () => (
	<Svg>
		<circle cx="12" cy="12" r="9" />
		<path d="M12 11v5M12 8h.01" />
	</Svg>
);

export const PlayIcon = () => (
	<Svg>
		<path d="M7 4l13 8-13 8V4z" />
	</Svg>
);

export const TrophyIcon = () => (
	<Svg>
		<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 01-10 0V4zM7 6H4v2a3 3 0 003 3M17 6h3v2a3 3 0 01-3 3" />
	</Svg>
);

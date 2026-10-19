import { ReactNode } from "react";
import * as SC from "./styled";

const Icon = ({ children }: { children: ReactNode }) => (
	<SC.Svg viewBox="0 0 24 24" aria-hidden="true">
		{children}
	</SC.Svg>
);

export const ComputerIcon = () => (
	<Icon>
		<rect x="3" y="4" width="18" height="12" rx="2" />
		<path d="M8 20h8M12 16v4" />
	</Icon>
);

export const VersusIcon = () => (
	<Icon>
		<circle cx="7.5" cy="6.5" r="3" />
		<circle cx="16.5" cy="6.5" r="3" />
		<path d="M2 15v-1.5a4.5 4.5 0 014.5-4.5M22 15v-1.5a4.5 4.5 0 00-4.5-4.5" />
		<circle cx="12" cy="16.5" r="5" />
		<path d="M9.8 14.8l1 3 1-3M13.4 17.8h2a.8.8 0 000-1.6h-1.2a.8.8 0 010-1.6h1.8" />
	</Icon>
);

export const ClockIcon = () => (
	<Icon>
		<circle cx="12" cy="12" r="9" />
		<path d="M12 7v5l3 2" />
	</Icon>
);

export const ClockOffIcon = () => (
	<Icon>
		<circle cx="12" cy="12" r="9" />
		<path d="M12 7v5l3 2M4 4l16 16" />
	</Icon>
);

export const JumpIcon = () => (
	<Icon>
		<circle cx="12" cy="4.5" r="2" />
		<path d="M12 7.5v6M12 10l-5-3M12 10l5-3M12 13.5l-4 3.5M12 13.5l4 3.5M6 21h12" />
	</Icon>
);

export const CreateRoomIcon = () => (
	<Icon>
		<rect x="3" y="3" width="18" height="18" rx="3" />
		<path d="M12 8v8M8 12h8" />
	</Icon>
);

export const JoinRoomIcon = () => (
	<Icon>
		<path d="M15 3h3a3 3 0 013 3v12a3 3 0 01-3 3h-3M10 17l5-5-5-5M15 12H3" />
	</Icon>
);

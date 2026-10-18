import { ReactNode } from "react";
import * as SC from "./styled";

type BackButtonProps = {
	children: ReactNode;
	tone?: "dark" | "light";
	href?: string;
	onClick?: () => void;
};

const Chevron = () => (
	<svg
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2.5"
		strokeLinecap="round"
		strokeLinejoin="round"
		aria-hidden="true"
	>
		<path d="M15 5l-7 7 7 7" />
	</svg>
);

export const BackButton = ({
	children,
	tone = "dark",
	href,
	onClick
}: BackButtonProps) =>
	href ? (
		<SC.BackAnchor href={href} $tone={tone}>
			<Chevron />
			{children}
		</SC.BackAnchor>
	) : (
		<SC.BackAction type="button" $tone={tone} onClick={onClick}>
			<Chevron />
			{children}
		</SC.BackAction>
	);

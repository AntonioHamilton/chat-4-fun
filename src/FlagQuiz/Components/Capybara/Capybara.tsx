import { Feedback } from "../../Hooks/useFlagQuiz";
import * as SC from "./styled";

type CapybaraProps = {
	kind: Feedback;
};

const IMAGE_BY_KIND: Record<Feedback, string> = {
	correct: "/FlagQuiz/capybara.webp",
	wrong: "/FlagQuiz/capybara-sad.webp"
};

export const Capybara = ({ kind }: CapybaraProps) => (
	<SC.Wrapper $kind={kind} aria-hidden="true">
		<SC.Image src={IMAGE_BY_KIND[kind]} alt="" />
		<SC.Badge $kind={kind}>
			<svg
				viewBox="0 0 24 24"
				width="22"
				height="22"
				fill="none"
				stroke="currentColor"
				strokeWidth="3"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				{kind === "correct" ? (
					<path d="M5 12.5l4.5 4.5L19 7.5" />
				) : (
					<path d="M6 6l12 12M18 6L6 18" />
				)}
			</svg>
		</SC.Badge>
	</SC.Wrapper>
);

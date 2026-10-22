import { guessCountryTranslations } from "@/Translations/guessCountry";
import { useCountdown } from "@/Hooks/useCountdown";
import { GameAction, GameView } from "../../Types/game.types";
import { Language } from "@/Types/Language";
import { Board } from "../Board/Board";
import * as BoardSC from "../Board/styled";
import { CountryPicker } from "../CountryPicker/CountryPicker";

type GameProps = {
	view: GameView;
	t: (typeof guessCountryTranslations)["PT_BR"];
	language: Language;
	send: (action: GameAction) => void;
	onExit: () => void;
};

const formatTime = (seconds: number) =>
	`${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;

export const Game = ({ view, t, language, send, onExit }: GameProps) => {
	const seconds = useCountdown(view.timeLeftMs, view.phase + view.round);

	if (view.phase !== "picking") {
		return (
			<Board
				view={view}
				t={t}
				language={language}
				send={send}
				onExit={onExit}
			/>
		);
	}

	return (
		<>
			<BoardSC.TopBar>
				<BoardSC.TopInfo>
					<strong>
						{t.round} {view.round} · {t.bestOfThree}
					</strong>
				</BoardSC.TopInfo>
				{seconds !== null && (
					<BoardSC.Timer $urgent={seconds <= 10} aria-label={t.timeLeft}>
						{formatTime(seconds)}
					</BoardSC.Timer>
				)}
			</BoardSC.TopBar>
			<CountryPicker
				key={view.round}
				t={t}
				language={language}
				waiting={view.myReady}
				onSubmit={(countries) => send({ type: "setCountries", countries })}
			/>
		</>
	);
};

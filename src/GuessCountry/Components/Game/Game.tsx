import { guessCountryTranslations } from "@/Translations/guessCountry";
import { useCountdown } from "../../Hooks/useCountdown";
import { GameAction, GameView } from "../../Types/game.types";
import { Board } from "../Board/Board";
import * as BoardSC from "../Board/styled";
import { CountryPicker } from "../CountryPicker/CountryPicker";

type GameProps = {
	view: GameView;
	t: (typeof guessCountryTranslations)["PT_BR"];
	opponentLabel: string;
	send: (action: GameAction) => void;
	onExit: () => void;
};

const formatTime = (seconds: number) =>
	`${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;

export const Game = ({ view, t, opponentLabel, send, onExit }: GameProps) => {
	const seconds = useCountdown(view.timeLeftMs, view.phase + view.round);

	if (view.phase !== "picking") {
		return (
			<Board
				view={view}
				t={t}
				opponentLabel={opponentLabel}
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
					<span>{view.starter === "me" ? t.youStart : t.opponentStarts}</span>
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
				waiting={view.myReady}
				onSubmit={(countries) => send({ type: "setCountries", countries })}
			/>
		</>
	);
};

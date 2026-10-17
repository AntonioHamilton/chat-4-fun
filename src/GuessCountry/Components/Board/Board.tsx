import { useState } from "react";
import { guessCountryTranslations } from "@/Translations/guessCountry";
import * as Shared from "@/styles/guess-country.styled";
import { COUNTRIES_PER_PLAYER } from "../../Constants/countries";
import { useCountdown } from "../../Hooks/useCountdown";
import { GameAction, GameView } from "../../Types/game.types";
import { findCountry } from "../../Utils/countries";
import { revealPrefix } from "../../Utils/text";
import * as SC from "./styled";

type BoardProps = {
	view: GameView;
	t: (typeof guessCountryTranslations)["PT_BR"];
	opponentLabel: string;
	send: (action: GameAction) => void;
	onExit: () => void;
};

const formatTime = (seconds: number) =>
	`${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;

export const Board = ({ view, t, opponentLabel, send, onExit }: BoardProps) => {
	const [guessText, setGuessText] = useState("");
	const [invalidGuess, setInvalidGuess] = useState(false);
	const seconds = useCountdown(view.timeLeftMs, view);
	const myCountries = view.myCountries ?? [];
	const ended = view.phase === "roundOver" || view.phase === "matchOver";

	const submitGuess = () => {
		const text = guessText.trim();
		if (!text || !view.canGuess) return;
		const country = findCountry(text);
		if (!country) {
			setInvalidGuess(true);
			return;
		}
		send({ type: "guess", country });
		setGuessText("");
	};

	const lastGuess = view.lastGuess;
	const lastGuessText = lastGuess
		? lastGuess.timeout
			? t.timeoutText
			: `${lastGuess.by === "me" ? t.youGuessed : t.opponentGuessed} ${lastGuess.country}: ${
					lastGuess.correct ? t.correct : t.wrong
				}`
		: null;

	return (
		<>
			<SC.TopBar>
				<SC.TopInfo>
					<strong>
						{t.round} {view.round} · {t.bestOfThree}
					</strong>
					<span>{view.starter === "me" ? t.youStart : t.opponentStarts}</span>
				</SC.TopInfo>
				<SC.Score aria-label={`${view.wins.me} x ${view.wins.opp}`}>
					<SC.ScoreLabel>{t.you}</SC.ScoreLabel>
					{view.wins.me} x {view.wins.opp}
					<SC.ScoreLabel>{opponentLabel}</SC.ScoreLabel>
				</SC.Score>
				{seconds !== null && view.timerKind === "guess" && (
					<SC.Timer $urgent={seconds <= 5} aria-label={t.timeLeft}>
						{formatTime(seconds)}
					</SC.Timer>
				)}
			</SC.TopBar>

			<SC.Lists>
				<Shared.Panel>
					<Shared.PanelTitle>{t.yourCountries}</Shared.PanelTitle>
					<SC.Words>
						{myCountries.map((country, index) => {
							const found = index < view.mySolved;
							const active =
								index === view.mySolved && view.phase === "playing";
							const shown = active
								? revealPrefix(country, view.myRevealedCount)
								: "";
							return (
								<SC.Word
									key={country}
									$state={found ? "found" : active ? "active" : "idle"}
								>
									<SC.WordIndex>{index + 1}</SC.WordIndex>
									{active ? (
										<span>
											<SC.Revealed>{shown}</SC.Revealed>
											<SC.Hidden>{country.slice(shown.length)}</SC.Hidden>
										</span>
									) : (
										country
									)}
								</SC.Word>
							);
						})}
					</SC.Words>
				</Shared.Panel>

				<Shared.Panel>
					<Shared.PanelTitle>{t.opponentCountries}</Shared.PanelTitle>
					<SC.Words>
						{Array.from({ length: COUNTRIES_PER_PLAYER }, (_, index) => {
							const solved = view.oppSolved[index];
							const current =
								!ended && index === view.oppSolved.length && !!view.oppRevealed;
							return (
								<SC.Word
									key={index}
									$state={solved ? "found" : current ? "active" : "hidden"}
								>
									<SC.WordIndex>{index + 1}</SC.WordIndex>
									{solved ??
										(current ? (
											<span>
												<SC.Revealed>{view.oppRevealed}</SC.Revealed>
												<SC.Caret>_</SC.Caret>
											</span>
										) : (
											"···"
										))}
								</SC.Word>
							);
						})}
					</SC.Words>
				</Shared.Panel>
			</SC.Lists>

			{view.phase === "playing" && (
				<Shared.Panel>
					<SC.Actions>
						{lastGuess && lastGuessText && (
							<SC.Banner role="status" $correct={lastGuess.correct}>
								{lastGuessText}
							</SC.Banner>
						)}

						{view.role === "giver" && (
							<>
								<SC.ActionText>
									{view.canNextLetter ? t.youGive : t.waitingGuess}
								</SC.ActionText>
								<Shared.PrimaryButton
									type="button"
									disabled={!view.canNextLetter}
									onClick={() => send({ type: "nextLetter" })}
								>
									{t.nextLetter}
								</Shared.PrimaryButton>
							</>
						)}

						{view.role === "guesser" && (
							<>
								<SC.ActionText>
									{view.canGuess ? t.youGuess : t.waitingLetter}
								</SC.ActionText>
								<SC.GuessRow>
									<SC.GuessInput
										type="text"
										aria-label={t.guessPlaceholder}
										placeholder={t.guessPlaceholder}
										autoComplete="off"
										autoCorrect="off"
										spellCheck={false}
										maxLength={60}
										value={guessText}
										disabled={!view.canGuess}
										onChange={(event) => {
											setGuessText(event.target.value);
											setInvalidGuess(false);
										}}
										onKeyDown={(event) => {
											if (event.key === "Enter") submitGuess();
										}}
									/>
									<Shared.PrimaryButton
										type="button"
										disabled={!view.canGuess || !guessText.trim()}
										onClick={submitGuess}
									>
										{t.guess}
									</Shared.PrimaryButton>
								</SC.GuessRow>
								{invalidGuess && (
									<SC.ActionText role="alert">{t.unknownCountry}</SC.ActionText>
								)}
							</>
						)}

						{view.currentWrong.length > 0 && (
							<SC.WrongList>
								{t.wrongGuesses}:
								{view.currentWrong.map((country) => (
									<SC.WrongChip key={country}>{country}</SC.WrongChip>
								))}
							</SC.WrongList>
						)}
					</SC.Actions>
				</Shared.Panel>
			)}

			{ended && (
				<SC.Overlay>
					<SC.Modal role="dialog" aria-modal="true">
						<SC.ModalTitle $won={view.roundWinner === "me"}>
							{view.phase === "matchOver"
								? view.matchWinner === "me"
									? t.matchWon
									: t.matchLost
								: view.roundWinner === "me"
									? t.roundWon
									: t.roundLost}
						</SC.ModalTitle>
						<SC.ModalScore>
							{view.wins.me} x {view.wins.opp}
						</SC.ModalScore>
						{view.oppCountries && (
							<>
								<Shared.PanelTitle>{t.opponentWere}</Shared.PanelTitle>
								<SC.ModalList>
									{view.oppCountries.map((country) => (
										<li key={country}>{country}</li>
									))}
								</SC.ModalList>
							</>
						)}
						{view.phase === "matchOver" ? (
							<Shared.PrimaryButton type="button" onClick={onExit}>
								{t.backToMenu}
							</Shared.PrimaryButton>
						) : (
							<>
								<Shared.PrimaryButton
									type="button"
									disabled={view.meAcked}
									onClick={() => send({ type: "continue" })}
								>
									{t.continue}
								</Shared.PrimaryButton>
								{view.meAcked && !view.oppAcked && (
									<SC.ActionText>{t.waitingContinue}</SC.ActionText>
								)}
							</>
						)}
					</SC.Modal>
				</SC.Overlay>
			)}
		</>
	);
};

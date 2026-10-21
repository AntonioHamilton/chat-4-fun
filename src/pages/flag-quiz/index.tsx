import { useEffect, useState } from "react";
import { BackButton } from "@/Components/BackButton/BackButton";
import { GameLayout } from "@/Components/GameLayout/GameLayout";
import { useTranslation } from "@/hooks/useTranslation";
import { flagQuizTranslations } from "@/Translations/flagQuiz";
import { pageBackground } from "@/styles/guess-country.styled";
import { Game } from "@/FlagQuiz/Components/Game/Game";
import { Menu } from "@/FlagQuiz/Components/Menu/Menu";
import { Ranking } from "@/FlagQuiz/Components/Ranking/Ranking";
import { Result } from "@/FlagQuiz/Components/Result/Result";
import { EndReason, Mode } from "@/FlagQuiz/Types/game.types";
import { saveScore, wakeServer } from "@/FlagQuiz/Utils/ranking";

type Session =
	| { kind: "menu" }
	| { kind: "playing"; mode: Mode }
	| {
			kind: "result";
			mode: Mode;
			score: number;
			missed: string | null;
			endedBy: EndReason;
	  }
	| { kind: "ranking"; mode?: Mode };

const FlagQuiz = () => {
	const { language } = useTranslation();
	const t = flagQuizTranslations[language];
	const [session, setSession] = useState<Session>({ kind: "menu" });

	useEffect(() => {
		void wakeServer();
	}, []);

	const backToMenu = () => setSession({ kind: "menu" });

	const topActions =
		session.kind === "menu" ? null : (
			<BackButton onClick={backToMenu}>{t.menu}</BackButton>
		);

	return (
		<GameLayout background={pageBackground} topActions={topActions}>
			{session.kind === "menu" && (
				<Menu
					t={t}
					onPlay={(mode) => setSession({ kind: "playing", mode })}
					onRanking={() => setSession({ kind: "ranking" })}
				/>
			)}

			{session.kind === "playing" && (
				<Game
					mode={session.mode}
					t={t}
					onFinish={(score, missed, endedBy) =>
						setSession({
							kind: "result",
							mode: session.mode,
							score,
							missed,
							endedBy
						})
					}
				/>
			)}

			{session.kind === "result" && (
				<Result
					t={t}
					language={language}
					score={session.score}
					missed={session.missed}
					endedBy={session.endedBy}
					onSave={async (name) => {
						await saveScore({
							name,
							score: session.score,
							mode: session.mode
						});
						setSession({ kind: "ranking", mode: session.mode });
					}}
					onPlayAgain={() =>
						setSession({ kind: "playing", mode: session.mode })
					}
				/>
			)}

			{session.kind === "ranking" && (
				<Ranking
					t={t}
					language={language}
					initialMode={session.mode}
					onPlay={(mode) => setSession({ kind: "playing", mode })}
				/>
			)}
		</GameLayout>
	);
};

export default FlagQuiz;

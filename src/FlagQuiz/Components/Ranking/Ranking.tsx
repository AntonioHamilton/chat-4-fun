import { useEffect, useState } from "react";
import { flagQuizTranslations } from "@/Translations/flagQuiz";
import { NameLanguage } from "@/GuessCountry/Types/game.types";
import * as Shared from "@/styles/guess-country.styled";
import * as FlagSC from "@/styles/flag-quiz.styled";
import { RankingEntry } from "../../Types/game.types";
import { fetchRanking } from "../../Utils/ranking";
import * as SC from "./styled";

type Translations = (typeof flagQuizTranslations)["PT_BR"];

type RankingProps = {
	t: Translations;
	language: NameLanguage;
};

type RankingData = {
	timed: RankingEntry[];
	untimed: RankingEntry[];
};

type LoadState =
	| { status: "loading" }
	| { status: "error" }
	| ({ status: "ready" } & RankingData);

const RankingTable = ({
	title,
	entries,
	t,
	language
}: {
	title: string;
	entries: RankingEntry[];
	t: Translations;
	language: NameLanguage;
}) => (
	<Shared.Panel>
		<Shared.PanelTitle>{title}</Shared.PanelTitle>
		{entries.length === 0 ? (
			<FlagSC.Message>{t.rankingEmpty}</FlagSC.Message>
		) : (
			<SC.TableWrapper>
				<SC.Table>
					<thead>
						<tr>
							<th scope="col">{t.position}</th>
							<th scope="col">{t.name}</th>
							<th scope="col">{t.points}</th>
							<th scope="col">{t.date}</th>
						</tr>
					</thead>
					<tbody>
						{entries.map((entry, index) => (
							<tr key={`${entry.date}-${index}`}>
								<td>{index + 1}</td>
								<td>{entry.name}</td>
								<td>{entry.score}</td>
								<td>
									{new Date(entry.date).toLocaleDateString(
										language === "EN_US" ? "en-US" : "pt-BR"
									)}
								</td>
							</tr>
						))}
					</tbody>
				</SC.Table>
			</SC.TableWrapper>
		)}
	</Shared.Panel>
);

export const Ranking = ({ t, language }: RankingProps) => {
	const [state, setState] = useState<LoadState>({ status: "loading" });

	useEffect(() => {
		let active = true;
		Promise.all([fetchRanking("timed"), fetchRanking("untimed")])
			.then(([timed, untimed]) => {
				if (active) setState({ status: "ready", timed, untimed });
			})
			.catch(() => {
				if (active) setState({ status: "error" });
			});
		return () => {
			active = false;
		};
	}, []);

	return (
		<FlagSC.Column>
			<FlagSC.Title>{t.ranking}</FlagSC.Title>
			{state.status === "loading" && (
				<FlagSC.Message>{t.rankingLoading}</FlagSC.Message>
			)}
			{state.status === "error" && (
				<FlagSC.Message>{t.rankingError}</FlagSC.Message>
			)}
			{state.status === "ready" && (
				<>
					<RankingTable
						title={t.rankingTimedTitle}
						entries={state.timed}
						t={t}
						language={language}
					/>
					<RankingTable
						title={t.rankingUntimedTitle}
						entries={state.untimed}
						t={t}
						language={language}
					/>
				</>
			)}
		</FlagSC.Column>
	);
};

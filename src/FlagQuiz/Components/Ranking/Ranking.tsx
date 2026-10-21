import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { flagQuizTranslations } from "@/Translations/flagQuiz";
import { NameLanguage } from "@/GuessCountry/Types/game.types";
import * as FlagSC from "@/styles/flag-quiz.styled";
import * as Shared from "@/styles/guess-country.styled";
import { Mode, RankingEntry } from "../../Types/game.types";
import { fetchRanking } from "../../Utils/ranking";
import * as SC from "./styled";

type Translations = (typeof flagQuizTranslations)["PT_BR"];

type RankingProps = {
	t: Translations;
	language: NameLanguage;
};

type RankingData = Record<Mode, RankingEntry[]>;

type LoadState =
	| { status: "loading" }
	| { status: "error" }
	| ({ status: "ready" } & RankingData);

const MODES: Mode[] = ["timed", "untimed"];

const RankingTable = ({
	entries,
	t,
	language
}: {
	entries: RankingEntry[];
	t: Translations;
	language: NameLanguage;
}) => (
	<Shared.Panel>
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
	const [selected, setSelected] = useState<Mode>("timed");
	const tabRefs = useRef<Record<Mode, HTMLButtonElement | null>>({
		timed: null,
		untimed: null
	});

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

	const titles: Record<Mode, string> = {
		timed: t.rankingTimedTitle,
		untimed: t.rankingUntimedTitle
	};

	const handleKeyDown = (
		event: KeyboardEvent<HTMLButtonElement>,
		mode: Mode
	) => {
		if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
		event.preventDefault();
		const next = mode === "timed" ? "untimed" : "timed";
		setSelected(next);
		tabRefs.current[next]?.focus();
	};

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
					<SC.Tabs role="tablist" aria-label={t.ranking}>
						{MODES.map((mode) => (
							<SC.Tab
								key={mode}
								ref={(element) => {
									tabRefs.current[mode] = element;
								}}
								type="button"
								role="tab"
								id={`ranking-tab-${mode}`}
								aria-selected={selected === mode}
								aria-controls={`ranking-panel-${mode}`}
								tabIndex={selected === mode ? 0 : -1}
								$active={selected === mode}
								onClick={() => setSelected(mode)}
								onKeyDown={(event) => handleKeyDown(event, mode)}
							>
								{titles[mode]}
							</SC.Tab>
						))}
					</SC.Tabs>
					<div
						role="tabpanel"
						id={`ranking-panel-${selected}`}
						aria-labelledby={`ranking-tab-${selected}`}
						style={{ width: "100%" }}
					>
						<RankingTable entries={state[selected]} t={t} language={language} />
					</div>
				</>
			)}
		</FlagSC.Column>
	);
};

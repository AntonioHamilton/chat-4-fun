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
	initialMode?: Mode;
	onPlay: (mode: Mode) => void;
};

type RankingData = Record<Mode, RankingEntry[]>;

type LoadState =
	| { status: "loading" }
	| { status: "error" }
	| ({ status: "ready" } & RankingData);

const MODES: Mode[] = ["timed", "untimed"];
const MEDAL_COLORS = ["#f2c94c", "#c9ced8", "#d9925c"];

const initialsOf = (name: string) =>
	name
		.trim()
		.split(/\s+/)
		.slice(0, 2)
		.map((part) => part[0]?.toUpperCase() ?? "")
		.join("");

const colorOf = (name: string) => {
	let hash = 0;
	for (const char of name) hash = (hash * 31 + char.charCodeAt(0)) % 360;
	return `hsl(${hash} 60% 45%)`;
};

const Podium = ({
	entries,
	language
}: {
	entries: RankingEntry[];
	language: NameLanguage;
}) => {
	const order = [1, 0, 2].filter((index) => index < entries.length);

	return (
		<SC.Podium aria-label="Top 3">
			{order.map((index) => {
				const entry = entries[index];
				return (
					<SC.PodiumSlot key={`${entry.date}-${index}`} $place={index + 1}>
						<SC.Avatar
							$color={colorOf(entry.name)}
							$size={index === 0 ? 72 : 58}
						>
							{initialsOf(entry.name)}
							<SC.Medal $color={MEDAL_COLORS[index]}>{index + 1}</SC.Medal>
						</SC.Avatar>
						<SC.PodiumName>{entry.name}</SC.PodiumName>
						<SC.PodiumScore>{entry.score}</SC.PodiumScore>
					</SC.PodiumSlot>
				);
			})}
		</SC.Podium>
	);
};

const RankingRows = ({
	entries,
	startAt,
	language
}: {
	entries: RankingEntry[];
	startAt: number;
	language: NameLanguage;
}) => (
	<SC.RowList>
		{entries.map((entry, index) => (
			<SC.Row key={`${entry.date}-${index}`}>
				<SC.RowPosition>{startAt + index + 1}</SC.RowPosition>
				<SC.Avatar $color={colorOf(entry.name)} $size={40}>
					{initialsOf(entry.name)}
				</SC.Avatar>
				<SC.RowInfo>
					<SC.RowName>{entry.name}</SC.RowName>
					<SC.RowDate>
						{new Date(entry.date).toLocaleDateString(
							language === "EN_US" ? "en-US" : "pt-BR"
						)}
					</SC.RowDate>
				</SC.RowInfo>
				<SC.RowScore>{entry.score}</SC.RowScore>
			</SC.Row>
		))}
	</SC.RowList>
);

export const Ranking = ({
	t,
	language,
	initialMode = "timed",
	onPlay
}: RankingProps) => {
	const [state, setState] = useState<LoadState>({ status: "loading" });
	const [selected, setSelected] = useState<Mode>(initialMode);
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
						{state[selected].length === 0 ? (
							<FlagSC.Message>{t.rankingEmpty}</FlagSC.Message>
						) : (
							<>
								<Podium
									entries={state[selected].slice(0, 3)}
									language={language}
								/>
								{state[selected].length > 3 && (
									<RankingRows
										entries={state[selected].slice(3)}
										startAt={3}
										language={language}
									/>
								)}
							</>
						)}
					</div>
				</>
			)}
			<Shared.PrimaryButton type="button" onClick={() => onPlay(selected)}>
				{t.play}
			</Shared.PrimaryButton>
		</FlagSC.Column>
	);
};

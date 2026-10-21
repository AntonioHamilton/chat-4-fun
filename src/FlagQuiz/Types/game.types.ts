export type Mode = "timed" | "untimed";

export type EndReason = "timeout" | "miss" | "finished";

export type NewRankingEntry = {
	id: string;
	name: string;
	score: number;
	mode: Mode;
};

export type RankingEntry = NewRankingEntry & {
	date: string;
};

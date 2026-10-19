import { useEffect, useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { BackButton } from "@/Components/BackButton/BackButton";
import { GameLayout } from "@/Components/GameLayout/GameLayout";
import { ServerLoading } from "@/Components/ServerLoading/ServerLoading";
import { guessCountryTranslations } from "@/Translations/guessCountry";
import * as SC from "@/styles/guess-country.styled";
import { Game } from "@/GuessCountry/Components/Game/Game";
import { Menu } from "@/GuessCountry/Components/Menu/Menu";
import * as MenuSC from "@/GuessCountry/Components/Menu/styled";
import { useLocalGame } from "@/GuessCountry/Hooks/useLocalGame";
import { OnlineStart, useOnlineGame } from "@/GuessCountry/Hooks/useOnlineGame";
import { Mode, NameLanguage } from "@/GuessCountry/Types/game.types";

type Translations = (typeof guessCountryTranslations)["PT_BR"];

type Session =
	| { kind: "menu"; error: string | null }
	| { kind: "computer"; mode: Mode }
	| { kind: "online"; start: OnlineStart };

const FLAGS: Record<NameLanguage, string> = {
	PT_BR: "/icons/br-flag.svg",
	EN_US: "/icons/us-flag.svg"
};

const ComputerGame = ({
	mode,
	t,
	language,
	onExit
}: {
	mode: Mode;
	t: Translations;
	language: NameLanguage;
	onExit: () => void;
}) => {
	const { view, send } = useLocalGame(mode, language);
	return (
		<Game view={view} t={t} language={language} send={send} onExit={onExit} />
	);
};

const OnlineGame = ({
	start,
	t,
	language,
	onExit
}: {
	start: OnlineStart;
	t: Translations;
	language: NameLanguage;
	onExit: (error: string | null) => void;
}) => {
	const { status, code, view, error, send } = useOnlineGame(start, language);
	const [copied, setCopied] = useState(false);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		if (status === "error") onExit(error ? t[error] : null);
	}, [status, error, t, onExit]);

	if (status === "error") return null;

	if (!loaded) {
		return (
			<ServerLoading
				ready={status !== "connecting"}
				flagSrc={FLAGS[language]}
				label={t.connecting}
				hint={t.connectingHint}
				onComplete={() => setLoaded(true)}
			/>
		);
	}

	if (status === "playing" && view) {
		return (
			<Game
				view={view}
				t={t}
				language={language}
				send={send}
				onExit={() => onExit(null)}
			/>
		);
	}

	const copyCode = async () => {
		try {
			await navigator.clipboard.writeText(code ?? "");
			setCopied(true);
		} catch {
			setCopied(false);
		}
	};

	return (
		<SC.Panel>
			<SC.PanelTitle>{t.shareCode}</SC.PanelTitle>
			{status === "waiting" && code && (
				<>
					<MenuSC.CodeBox role="status">{code}</MenuSC.CodeBox>
					<MenuSC.Message>{t.waitingOpponent}</MenuSC.Message>
					<SC.GhostButton type="button" onClick={copyCode}>
						{copied ? t.copied : t.copyCode}
					</SC.GhostButton>
				</>
			)}
		</SC.Panel>
	);
};

const GuessTheCountry = () => {
	const { language } = useTranslation();
	const t = guessCountryTranslations[language];
	const [session, setSession] = useState<Session>({
		kind: "menu",
		error: null
	});

	const backToMenu = (error: string | null = null) =>
		setSession({ kind: "menu", error });

	const topActions =
		session.kind === "menu" ? null : (
			<BackButton onClick={() => backToMenu()}>{t.backToMenu}</BackButton>
		);

	return (
		<GameLayout background={SC.pageBackground} topActions={topActions}>
			{session.kind === "menu" ? (
				<Menu
					t={t}
					error={session.error}
					onComputer={(mode) => setSession({ kind: "computer", mode })}
					onCreate={(mode) =>
						setSession({ kind: "online", start: { type: "create", mode } })
					}
					onJoin={(code) =>
						setSession({ kind: "online", start: { type: "join", code } })
					}
				/>
			) : session.kind === "computer" ? (
				<ComputerGame
					mode={session.mode}
					t={t}
					language={language}
					onExit={() => backToMenu()}
				/>
			) : (
				<OnlineGame
					start={session.start}
					t={t}
					language={language}
					onExit={backToMenu}
				/>
			)}
		</GameLayout>
	);
};

export default GuessTheCountry;

import { useEffect, useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { guessCountryTranslations } from "@/Translations/guessCountry";
import * as SC from "@/styles/guess-country.styled";
import { Game } from "@/GuessCountry/Components/Game/Game";
import { Menu } from "@/GuessCountry/Components/Menu/Menu";
import * as MenuSC from "@/GuessCountry/Components/Menu/styled";
import { useLocalGame } from "@/GuessCountry/Hooks/useLocalGame";
import { OnlineStart, useOnlineGame } from "@/GuessCountry/Hooks/useOnlineGame";
import { Mode } from "@/GuessCountry/Types/game.types";

type Translations = (typeof guessCountryTranslations)["PT_BR"];

type Session =
	| { kind: "menu"; error: string | null }
	| { kind: "computer"; mode: Mode }
	| { kind: "online"; start: OnlineStart };

const ComputerGame = ({
	mode,
	t,
	onExit
}: {
	mode: Mode;
	t: Translations;
	onExit: () => void;
}) => {
	const { view, send } = useLocalGame(mode);
	return (
		<Game
			view={view}
			t={t}
			opponentLabel={t.computer}
			send={send}
			onExit={onExit}
		/>
	);
};

const OnlineGame = ({
	start,
	t,
	onExit
}: {
	start: OnlineStart;
	t: Translations;
	onExit: (error: string | null) => void;
}) => {
	const { status, code, view, error, send } = useOnlineGame(start);
	const [copied, setCopied] = useState(false);

	useEffect(() => {
		if (status === "error") onExit(error ? t[error] : null);
	}, [status, error, t, onExit]);

	if (status === "error") return null;

	if (status === "playing" && view) {
		return (
			<Game
				view={view}
				t={t}
				opponentLabel={t.opponent}
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
			<SC.PanelTitle>{code ? t.shareCode : t.connecting}</SC.PanelTitle>
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

	return (
		<SC.Container>
			<SC.Content>
				{session.kind === "menu" ? (
					<>
						<SC.HomeLink href="/">{t.homeLink}</SC.HomeLink>
						<Menu
							t={t}
							error={session.error}
							onComputer={(mode) => setSession({ kind: "computer", mode })}
							onCreate={(mode) =>
								setSession({
									kind: "online",
									start: { type: "create", mode }
								})
							}
							onJoin={(code) =>
								setSession({ kind: "online", start: { type: "join", code } })
							}
						/>
					</>
				) : (
					<>
						<SC.GhostButton
							type="button"
							style={{ alignSelf: "flex-start" }}
							onClick={() => backToMenu()}
						>
							{t.backToMenu}
						</SC.GhostButton>
						{session.kind === "computer" ? (
							<ComputerGame
								mode={session.mode}
								t={t}
								onExit={() => backToMenu()}
							/>
						) : (
							<OnlineGame start={session.start} t={t} onExit={backToMenu} />
						)}
					</>
				)}
			</SC.Content>
		</SC.Container>
	);
};

export default GuessTheCountry;

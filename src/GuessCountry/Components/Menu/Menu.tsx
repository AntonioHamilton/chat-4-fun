import { useState } from "react";
import { guessCountryTranslations } from "@/Translations/guessCountry";
import * as Shared from "@/styles/guess-country.styled";
import { Mode } from "../../Types/game.types";
import * as SC from "./styled";

type MenuProps = {
	t: (typeof guessCountryTranslations)["PT_BR"];
	error: string | null;
	onComputer: (mode: Mode) => void;
	onCreate: (mode: Mode) => void;
	onJoin: (code: string) => void;
};

type Step = "main" | "computer" | "multiplayer" | "create" | "join";

const ModeButtons = ({
	t,
	onSelect
}: {
	t: MenuProps["t"];
	onSelect: (mode: Mode) => void;
}) => {
	const [openInfo, setOpenInfo] = useState<Mode | null>(null);
	const modes: { mode: Mode; label: string; info: string }[] = [
		{ mode: "untimed", label: t.untimed, info: t.untimedInfo },
		{ mode: "timed", label: t.timed, info: t.timedInfo }
	];

	return (
		<>
			{modes.map(({ mode, label, info }) => (
				<SC.ModeButton
					key={mode}
					type="button"
					aria-describedby={`mode-info-${mode}`}
					onClick={() => onSelect(mode)}
					onFocus={() => setOpenInfo(mode)}
					onBlur={() => setOpenInfo(null)}
				>
					{label}
					<SC.InfoIcon
						aria-hidden="true"
						onMouseEnter={() => setOpenInfo(mode)}
						onMouseLeave={() => setOpenInfo(null)}
						onClick={(event) => {
							event.stopPropagation();
							setOpenInfo(openInfo === mode ? null : mode);
						}}
					>
						i
					</SC.InfoIcon>
					<SC.Tooltip
						role="tooltip"
						id={`mode-info-${mode}`}
						hidden={openInfo !== mode}
					>
						{info}
					</SC.Tooltip>
				</SC.ModeButton>
			))}
		</>
	);
};

export const Menu = ({ t, error, onComputer, onCreate, onJoin }: MenuProps) => {
	const [step, setStep] = useState<Step>("main");
	const [code, setCode] = useState("");

	return (
		<>
			<SC.Hero>
				<SC.Mascot src="/GuessCountry/logo.png" alt="" />
				<SC.Title>{t.title}</SC.Title>
				<SC.Subtitle>{t.subtitle}</SC.Subtitle>
			</SC.Hero>

			<SC.Options>
				{error && (
					<SC.Message role="alert" $error>
						{error}
					</SC.Message>
				)}

				{step === "main" && (
					<>
						<Shared.PrimaryButton
							type="button"
							onClick={() => setStep("computer")}
						>
							{t.vsComputer}
						</Shared.PrimaryButton>
						<Shared.PrimaryButton
							type="button"
							onClick={() => setStep("multiplayer")}
						>
							{t.multiplayer}
						</Shared.PrimaryButton>
					</>
				)}

				{step === "computer" && (
					<>
						<SC.SectionTitle>{t.vsComputer}</SC.SectionTitle>
						<ModeButtons t={t} onSelect={onComputer} />
					</>
				)}

				{step === "multiplayer" && (
					<>
						<SC.SectionTitle>{t.multiplayer}</SC.SectionTitle>
						<Shared.PrimaryButton
							type="button"
							onClick={() => setStep("create")}
						>
							{t.createRoom}
						</Shared.PrimaryButton>
						<Shared.PrimaryButton type="button" onClick={() => setStep("join")}>
							{t.joinRoom}
						</Shared.PrimaryButton>
					</>
				)}

				{step === "create" && (
					<>
						<SC.SectionTitle>{t.createRoom}</SC.SectionTitle>
						<ModeButtons t={t} onSelect={onCreate} />
					</>
				)}

				{step === "join" && (
					<>
						<SC.SectionTitle>{t.joinRoom}</SC.SectionTitle>
						<SC.CodeInput
							aria-label={t.roomCode}
							placeholder={t.roomCodePlaceholder}
							maxLength={5}
							value={code}
							onChange={(event) => setCode(event.target.value.toUpperCase())}
							onKeyDown={(event) => {
								if (event.key === "Enter" && code.length === 5) onJoin(code);
							}}
						/>
						<Shared.PrimaryButton
							type="button"
							disabled={code.length !== 5}
							onClick={() => onJoin(code)}
						>
							{t.join}
						</Shared.PrimaryButton>
					</>
				)}

				{step !== "main" && (
					<Shared.GhostButton
						type="button"
						onClick={() =>
							setStep(
								step === "create" || step === "join" ? "multiplayer" : "main"
							)
						}
					>
						{t.back}
					</Shared.GhostButton>
				)}
			</SC.Options>
		</>
	);
};

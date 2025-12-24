import * as SC from "./styled";
import { Character } from "../../Types/character.types";

type SpecialAbilityProps = {
	character: Character;
	jajankenMode: "guu" | "chii" | "paa" | null;
	godspeedActive: boolean;
	onJajankenSelect?: (mode: "guu" | "chii" | "paa") => void;
	onGodspeedActivate?: () => void;
};

export const SpecialAbility = ({
	character,
	jajankenMode,
	godspeedActive,
	onJajankenSelect,
	onGodspeedActivate
}: SpecialAbilityProps) => {
	if (character.id === "gon") {
		return (
			<SC.SpecialAbilityContainer>
				<SC.AbilityTitle>Jajanken</SC.AbilityTitle>
				<SC.JajankenButtons>
					<SC.JajankenButton
						$active={jajankenMode === "guu"}
						onClick={() => onJajankenSelect?.("guu")}
					>
						Pedra (Guu)
					</SC.JajankenButton>
					<SC.JajankenButton
						$active={jajankenMode === "chii"}
						onClick={() => onJajankenSelect?.("chii")}
					>
						Tesoura (Chii)
					</SC.JajankenButton>
					<SC.JajankenButton
						$active={jajankenMode === "paa"}
						onClick={() => onJajankenSelect?.("paa")}
					>
						Papel (Paa)
					</SC.JajankenButton>
				</SC.JajankenButtons>
			</SC.SpecialAbilityContainer>
		);
	}

	if (character.id === "killua") {
		return (
			<SC.SpecialAbilityContainer>
				<SC.AbilityTitle>Godspeed</SC.AbilityTitle>
				<SC.GodspeedButton
					$active={godspeedActive}
					onClick={onGodspeedActivate}
					disabled={godspeedActive}
				>
					{godspeedActive ? "Godspeed Ativo" : "Ativar Godspeed"}
				</SC.GodspeedButton>
			</SC.SpecialAbilityContainer>
		);
	}

	return null;
};

import * as SC from "./styled";
import { Character } from "../../Types/character.types";

type HealthBarProps = {
	character: Character;
};

export const HealthBar = ({ character }: HealthBarProps) => {
	const percentage = (character.health / character.maxHealth) * 100;

	return (
		<SC.HealthBarContainer>
			<SC.CharacterName>{character.name}</SC.CharacterName>
			<SC.HealthBarWrapper>
				<SC.HealthBarFill
					$percentage={percentage}
					$color={character.id === "gon" ? "#f39c12" : "#3498db"}
				>
					<SC.HealthText>
						{character.health}/{character.maxHealth}
					</SC.HealthText>
				</SC.HealthBarFill>
			</SC.HealthBarWrapper>
		</SC.HealthBarContainer>
	);
};

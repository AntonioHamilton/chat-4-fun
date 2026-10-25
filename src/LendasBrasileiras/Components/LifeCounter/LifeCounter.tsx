import * as SC from "./styled";

type LifeCounterProps = {
	life: number;
	onChange: (delta: number) => void;
};

export const LifeCounter = ({ life, onChange }: LifeCounterProps) => {
	return (
		<SC.Container role="group" aria-label="Vida">
			<SC.Button
				type="button"
				aria-label="Diminuir vida"
				onClick={() => onChange(-1)}
			>
				-
			</SC.Button>
			<SC.Value aria-live="polite">{life}</SC.Value>
			<SC.Button
				type="button"
				aria-label="Aumentar vida"
				onClick={() => onChange(1)}
			>
				+
			</SC.Button>
		</SC.Container>
	);
};

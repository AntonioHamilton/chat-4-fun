import * as SC from "./styled";

type LifeCounterProps = {
	life: number;
	onChange: (delta: number) => void;
	disabled?: boolean;
	variant?: "inline" | "portrait";
};

export const LifeCounter = ({
	life,
	onChange,
	disabled = false,
	variant = "inline"
}: LifeCounterProps) => {
	return (
		<SC.Container role="group" aria-label="Vida" $variant={variant}>
			<SC.Button
				type="button"
				aria-label="Diminuir vida"
				disabled={disabled}
				onClick={() => onChange(-1)}
			>
				-
			</SC.Button>
			<SC.Value aria-live="polite" $variant={variant}>
				{life}
			</SC.Value>
			<SC.Button
				type="button"
				aria-label="Aumentar vida"
				disabled={disabled}
				onClick={() => onChange(1)}
			>
				+
			</SC.Button>
		</SC.Container>
	);
};

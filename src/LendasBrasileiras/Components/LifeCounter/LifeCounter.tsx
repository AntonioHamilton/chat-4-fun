import * as SC from "./styled";

type LifeCounterProps = {
	life: number;
	variant?: "inline" | "portrait";
};

export const LifeCounter = ({ life, variant = "inline" }: LifeCounterProps) => {
	return (
		<SC.Container role="group" aria-label="Vida" $variant={variant}>
			<SC.Value aria-live="polite" $variant={variant}>
				{life}
			</SC.Value>
		</SC.Container>
	);
};

import { ReactNode, useId, useState } from "react";
import { InfoIcon } from "@/Components/Icons/UiIcons";
import * as SC from "./styled";

type OptionButtonProps = {
	icon: ReactNode;
	label: string;
	info: string;
	infoLabel: string;
	onClick: () => void;
};

export const OptionButton = ({
	icon,
	label,
	info,
	infoLabel,
	onClick
}: OptionButtonProps) => {
	const [open, setOpen] = useState(false);
	const tooltipId = useId();

	return (
		<SC.Row>
			<SC.Button type="button" onClick={onClick} aria-describedby={tooltipId}>
				{icon}
				{label}
			</SC.Button>
			<SC.InfoButton
				type="button"
				aria-label={infoLabel}
				aria-expanded={open}
				aria-controls={tooltipId}
				onClick={() => setOpen((value) => !value)}
				onMouseEnter={() => setOpen(true)}
				onMouseLeave={() => setOpen(false)}
				onBlur={() => setOpen(false)}
			>
				<InfoIcon />
			</SC.InfoButton>
			<SC.Tooltip id={tooltipId} role="tooltip" hidden={!open}>
				{info}
			</SC.Tooltip>
		</SC.Row>
	);
};

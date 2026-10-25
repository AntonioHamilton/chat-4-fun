import { useEffect, useRef } from "react";
import type { KeyboardEvent } from "react";
import type { MenuOption } from "@/LendasBrasileiras/Types/ui";
import * as SC from "./styled";

type CardMenuProps = {
	title: string;
	options: MenuOption[];
	onClose: () => void;
};

export const CardMenu = ({ title, options, onClose }: CardMenuProps) => {
	const dialogRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		dialogRef.current?.querySelector("button")?.focus();
	}, []);

	const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
		if (event.key === "Escape") onClose();
	};

	return (
		<SC.Overlay onClick={onClose}>
			<SC.Dialog
				ref={dialogRef}
				role="dialog"
				aria-modal="true"
				aria-label={`Ações de ${title}`}
				onClick={(event) => event.stopPropagation()}
				onKeyDown={handleKeyDown}
			>
				<SC.Title>{title}</SC.Title>
				{options.map((option) => (
					<SC.Option
						key={option.label}
						type="button"
						onClick={() => {
							option.onSelect();
							onClose();
						}}
					>
						{option.label}
					</SC.Option>
				))}
				<SC.Option type="button" onClick={onClose}>
					Fechar
				</SC.Option>
			</SC.Dialog>
		</SC.Overlay>
	);
};

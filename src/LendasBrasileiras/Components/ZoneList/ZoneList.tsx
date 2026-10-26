import type { CardInstance } from "@/LendasBrasileiras/Types/player";
import { typeLabels } from "@/LendasBrasileiras/Constants/labels";
import { useModal } from "@/LendasBrasileiras/Hooks/useModal";
import { formatCost } from "@/LendasBrasileiras/Utils/formatCost";
import * as SC from "./styled";

type ZoneListProps = {
	title: string;
	cards: CardInstance[];
	onClose: () => void;
};

export const ZoneList = ({ title, cards, onClose }: ZoneListProps) => {
	const { dialogRef, handleKeyDown } = useModal(onClose);

	return (
		<SC.Overlay onClick={onClose}>
			<SC.Dialog
				ref={dialogRef}
				role="dialog"
				aria-modal="true"
				aria-label={title}
				onClick={(event) => event.stopPropagation()}
				onKeyDown={handleKeyDown}
			>
				<SC.Title>
					{title} ({cards.length})
				</SC.Title>
				{cards.length === 0 ? (
					<SC.Empty>Nenhuma carta.</SC.Empty>
				) : (
					<SC.List>
						{cards.map((instance) => (
							<SC.Item key={instance.instanceId}>
								<SC.Name>{instance.card.name}</SC.Name>
								<span>{typeLabels[instance.card.type]}</span>
								<span>{formatCost(instance.card) || "-"}</span>
							</SC.Item>
						))}
					</SC.List>
				)}
				<SC.Close type="button" onClick={onClose}>
					Fechar
				</SC.Close>
			</SC.Dialog>
		</SC.Overlay>
	);
};

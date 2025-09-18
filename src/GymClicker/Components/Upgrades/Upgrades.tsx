import { useState } from "react";
import * as SC from "./styled";

const upgrades = [
	{
		name: "⚡ Creatine +1 per click",
		effect: "click",
		price: 100,
		value: 1
	},
	{
		name: "🥛 Whey +3 per click",
		effect: "click",
		price: 100,
		value: 3
	},
	{
		name: "💉 Durateston +5 per click",
		effect: "click",
		price: 100,
		value: 5
	},
	{
		name: "☣️ Hulk Power +10 per click",
		effect: "click",
		price: 100,
		value: 10
	},
	{
		name: "💣 anabolic +20 per click",
		effect: "click",
		price: 100,
		value: 20
	}
];

export const Upgrades = () => {
	const [open, setOpen] = useState(false);

	return (
		<>
			<SC.UpgradesButton onClick={() => setOpen(true)}>
				🔥 Upgrades 🔥
			</SC.UpgradesButton>

			{open && (
				<SC.ModalOverlay onClick={() => setOpen(false)}>
					<SC.ModalContent onClick={(e) => e.stopPropagation()}>
						<h2>Choose your Upgrades</h2>
						<SC.UpgradeOption>⚡ Mais Força (+1 por click)</SC.UpgradeOption>
						<SC.UpgradeOption>
							⏱️ Mais Velocidade (cliques automáticos)
						</SC.UpgradeOption>
						<SC.UpgradeOption>💰 Multiplicador de Coins</SC.UpgradeOption>
						<SC.CloseButton onClick={() => setOpen(false)}>
							Fechar
						</SC.CloseButton>
					</SC.ModalContent>
				</SC.ModalOverlay>
			)}
		</>
	);
};

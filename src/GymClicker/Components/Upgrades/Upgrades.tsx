import { useState } from "react";
import * as SC from "./styled";

const upgrades = [
	{
		name: "⚡ Creatine +1 per click",
		effect: "click",
		price: 1,
		value: 1
	},
	{
		name: "🥛 Whey +3 per click",
		effect: "click",
		price: 2,
		value: 3
	},
	{
		name: "💉 Durateston +5 per click",
		effect: "click",
		price: 3,
		value: 5
	},
	{
		name: "☣️ Hulk Power +10 per click",
		effect: "click",
		price: 4,
		value: 10
	},
	{
		name: "💣 anabolic +20 per click",
		effect: "click",
		price: 5,
		value: 20
	}
];

type UpgradesProps = {
	money: number;
	setClickValue: (value: number) => void;
};

export const Upgrades = ({ money, setClickValue }: UpgradesProps) => {
	const [open, setOpen] = useState(false);
	const [activeUpgrades, setActiveUpgrades] = useState([0, 1, 2]);

	const handleUpgradeClick = (
		upgrade: { name: string; price: number; value: number; effect: string },
		index: number
	) => {
		if (upgrade.effect === "click") setClickValue(upgrade.value);

		const newActiveUpgrades = activeUpgrades.filter(
			(position) => position !== index
		);
		newActiveUpgrades.sort();
		let newOrderedArray = [...newActiveUpgrades];

		console.log(newOrderedArray);

		const lastPositionValue = activeUpgrades[activeUpgrades.length - 1];
		if (upgrades[lastPositionValue]) {
			newOrderedArray = [...newActiveUpgrades, lastPositionValue + 1];
		}

		console.log(newOrderedArray);

		setActiveUpgrades(newOrderedArray);
	};

	return (
		<>
			<SC.UpgradesButton onClick={() => setOpen(true)}>
				🔥 Upgrades 🔥
			</SC.UpgradesButton>

			{open && (
				<SC.ModalOverlay onClick={() => setOpen(false)}>
					<SC.ModalContent onClick={(e) => e.stopPropagation()}>
						<h2>Choose your Upgrades</h2>
						{upgrades.map((upgrade, index) => (
							<SC.UpgradeOptionContainer key={upgrade.name}>
								<SC.UpgradeOption
									className={
										activeUpgrades.some((position) => position === index)
											? "--active"
											: "--inactive"
									}
									onClick={() => handleUpgradeClick(upgrade, index)}
									disabled={money < upgrade.price}
								>
									{upgrade.name}
								</SC.UpgradeOption>
							</SC.UpgradeOptionContainer>
						))}
						<SC.CloseButton onClick={() => setOpen(false)}>
							Fechar
						</SC.CloseButton>
					</SC.ModalContent>
				</SC.ModalOverlay>
			)}
		</>
	);
};

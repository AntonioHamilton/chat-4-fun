import { Dispatch, SetStateAction, useState } from "react";
import * as SC from "./styled";
import { clickUpgrades } from "./constants/clicks";

type UpgradesProps = {
	money: number;
	setClickValue: (value: number) => void;
	setMoney: Dispatch<SetStateAction<number>>;
};

export const Upgrades = ({ money, setMoney, setClickValue }: UpgradesProps) => {
	const [open, setOpen] = useState(false);
	const [clickIndex, setClickIndex] = useState(0);

	const handleClickUpgrade = (index: number, price: number) => {
		setMoney((money: number) => money - price);
		setClickValue(clickUpgrades[index].value);
		setClickIndex(clickIndex + 1);
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
						{clickUpgrades[clickIndex] && (
							<SC.UpgradeOptionContainer>
								<SC.UpgradeOption
									onClick={() =>
										handleClickUpgrade(
											clickIndex,
											clickUpgrades[clickIndex].price
										)
									}
									disabled={money < clickUpgrades[clickIndex].price}
								>
									{clickUpgrades[clickIndex].price} 🏋️ -{" "}
									{clickUpgrades[clickIndex].name}
								</SC.UpgradeOption>
							</SC.UpgradeOptionContainer>
						)}
						<SC.CloseButton onClick={() => setOpen(false)}>
							Fechar
						</SC.CloseButton>
					</SC.ModalContent>
				</SC.ModalOverlay>
			)}
		</>
	);
};

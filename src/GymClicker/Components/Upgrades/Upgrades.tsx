import { Dispatch, SetStateAction, useState } from "react";
import * as SC from "./styled";
import { clickUpgrades } from "./constants/clicks";
import { useTranslation } from "@/hooks/useTranslation";
import { gymClickerTranslations } from "@/Translations/gymClicker";

type UpgradesProps = {
	money: number;
	setClickValue: (value: number) => void;
	setMoney: Dispatch<SetStateAction<number>>;
};

export const Upgrades = ({ money, setMoney, setClickValue }: UpgradesProps) => {
	const { language } = useTranslation();
	const t = gymClickerTranslations[language];
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
				{t.upgradesButton}
			</SC.UpgradesButton>

			{open && (
				<SC.ModalOverlay onClick={() => setOpen(false)}>
					<SC.ModalContent onClick={(e) => e.stopPropagation()}>
						<h2>{t.chooseUpgrades}</h2>
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
									{t.clickUpgrades[clickIndex] ??
										clickUpgrades[clickIndex].name}
								</SC.UpgradeOption>
							</SC.UpgradeOptionContainer>
						)}
						<SC.CloseButton onClick={() => setOpen(false)}>
							{t.close}
						</SC.CloseButton>
					</SC.ModalContent>
				</SC.ModalOverlay>
			)}
		</>
	);
};

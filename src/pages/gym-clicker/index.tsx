import Image from "next/image";
import * as SC from "@styles/gym-clicker.styled";
import { useGymClicker } from "@/GymClicker/Hooks/useGymClicker";
import { Upgrades } from "@/GymClicker/Components/Upgrades/Upgrades";
import { Bosses } from "@/GymClicker/Components/Bosses/Bosses";
import { useTranslation } from "@/hooks/useTranslation";
import { gymClickerTranslations } from "@/Translations/gymClicker";

const GymClicker = () => {
	const {
		lifterPrice,
		lifters,
		liftersSpread,
		gifs,
		money,
		clickValue,
		setClickValue,
		setLifters,
		setMoney,
		setClicks
	} = useGymClicker();

	const { language } = useTranslation();
	const t = gymClickerTranslations[language];

	const getMoneyOnClick = () => {
		setMoney((money) => money + clickValue);
		setClicks((value: number) => value + 1);
	};

	const handleUpgrade = (lifterPrice: number, index: number) => {
		setMoney((money) => money - lifterPrice);
		const newObjectLifters = lifters;
		newObjectLifters[index].level += 1;
		newObjectLifters[index].spread =
			liftersSpread[newObjectLifters[index].level];
		setLifters(newObjectLifters);
	};

	const reset = () => {
		setMoney(0);
		setClicks(0);
		setLifters([
			{ name: "first lifter", spread: 0, level: 0 },
			{ name: "second lifter", spread: 0, level: 0 },
			{ name: "third lifter", spread: 0, level: 0 }
		]);
	};

	return (
		<SC.Container>
			<SC.Logo>
				<h1>{t.title}</h1>
				<SC.ImageContainer>
					<Image
						src="/GymClicker/muscledfinger.jpg"
						width={80}
						height={80}
						alt="muscled finger left"
					/>
					<Image
						className="muscled-finger__right"
						src="/GymClicker/muscledfinger.jpg"
						width={80}
						height={80}
						alt="muscled finger right"
					/>
				</SC.ImageContainer>
			</SC.Logo>
			<Bosses hit={1} />
			<SC.GainsCounter>
				{t.pumpCoins}: {money}
			</SC.GainsCounter>
			<SC.LiftersContainer>
				{lifters.map((lifter, index) => (
					<div className="lifters" key={lifter.name}>
						{gifs[lifter.level]}
						<SC.UpgradeButton
							disabled={
								lifterPrice[lifter.level] > money ||
								lifterPrice.length <= lifter.level
							}
							onClick={() => handleUpgrade(lifterPrice[lifter.level], index)}
						>
							<p>{lifter.level === 0 ? t.getLifter : t.upgrade}</p>
							<p>
								{lifterPrice.length > lifter.level
									? `${lifterPrice[lifter.level]}🏋️`
									: t.maxLevel}
							</p>
						</SC.UpgradeButton>
					</div>
				))}
			</SC.LiftersContainer>
			<SC.ButtonContainer>
				<Upgrades
					setMoney={setMoney}
					setClickValue={setClickValue}
					money={money}
				/>
				<SC.MuscleButton onClick={getMoneyOnClick}>{t.click}</SC.MuscleButton>
				{/* <SC.MuscleButton onClick={reset}>reset</SC.MuscleButton> */}
			</SC.ButtonContainer>
		</SC.Container>
	);
};

export default GymClicker;

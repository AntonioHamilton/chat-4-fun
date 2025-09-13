import Image from "next/image";
import * as SC from "@styles/clicker.styled";
import { useState } from "react";

const GymClicker = () => {
	const [clicks, setClicks] = useState(0);
	const [money, setMoney] = useState(0);
	const [moneySpent, setMoneySpent] = useState(0);
	const [spread, setSpread] = useState(1);

	const handleClickControl = () => {
		setMoney(clicks + 1 * spread - moneySpent);
		setClicks((value: number) => value + 1);
	};

	return (
		<SC.Container>
			<SC.Logo>
				<h1>GYM CLICKER</h1>
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
			<SC.GainsCounter>Pump Coins: {money}</SC.GainsCounter>
			<SC.ButtonContainer>
				<SC.MuscleButton onClick={handleClickControl}>Click</SC.MuscleButton>
			</SC.ButtonContainer>
		</SC.Container>
	);
};

export default GymClicker;

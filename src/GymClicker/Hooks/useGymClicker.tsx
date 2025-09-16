import { useEffect, useState } from "react";
import { LifterGif } from "../Components/LifterGif/LifterGif";

export const useGymClicker = () => {
	const lifterPrice = [1, 2, 3, 4, 5, 6, 7];
	const liftersSpread = [2, 3, 4, 5, 6, 7, 8];
	const [money, setMoney] = useState(0);
	const [clicks, setClicks] = useState(0);
	const [lifters, setLifters] = useState([
		{ name: "first lifter", spread: 0, level: 0 },
		{ name: "second lifter", spread: 0, level: 0 },
		{ name: "third lifter", spread: 0, level: 0 }
	]);

	// setTimeout(() => {
	// 	const liftersSpreadSum =
	// 		lifters[0].spread + lifters[1].spread + lifters[2].spread;
	// 	setMoney((money) => money + liftersSpreadSum);
	// }, 1000);

	useEffect(() => {
		const handleBeforeUnload = (event: BeforeUnloadEvent) => {
			event.preventDefault();
			localStorage.setItem("lifters", JSON.stringify(lifters));
			localStorage.setItem("money", JSON.stringify({ money }));
			localStorage.setItem("clicks", JSON.stringify(clicks));
			localStorage.setItem(
				"spread",
				JSON.stringify(
					lifters[0].spread + lifters[1].spread + lifters[2].spread
				)
			);
		};

		window.addEventListener("beforeunload", handleBeforeUnload);

		return () => {
			window.removeEventListener("beforeunload", handleBeforeUnload);
		};
	}, []);

	const gifs = [
		<div key="image space" className="image-space" />,
		<LifterGif
			key="Gym Rat Gif"
			gif="/GymClicker/GymRat.gif"
			name="Gym Rat Gif"
			value={liftersSpread[0]}
		/>,
		<LifterGif
			key="Lego Lifting Gif"
			gif="/GymClicker/LegoLifting.gif"
			name="Lego Lifting Gif"
			value={liftersSpread[1]}
		/>,
		<LifterGif
			key="Muscle Mice Gif"
			gif="/GymClicker/MuscleMice.gif"
			name="Muscle Mice Gif"
			value={liftersSpread[2]}
		/>,
		<LifterGif
			key="Terry Crews Gif"
			gif="/GymClicker/TerryCrews.gif"
			name="Terry Crews Gif"
			value={liftersSpread[3]}
		/>,
		<LifterGif
			key="The Rock Gif"
			gif="/GymClicker/TheRock.gif"
			name="The Rock Gif"
			value={liftersSpread[4]}
		/>,
		<LifterGif
			key="Sponge Bob Gif"
			gif="/GymClicker/SpongeBob.gif"
			name="Sponge Bob Gif"
			value={liftersSpread[5]}
		/>,
		<LifterGif
			key="Mashle Lifting Gif"
			gif="/GymClicker/MashleLifting.gif"
			name="Mashle Lifting Gif"
			value={liftersSpread[6]}
		/>
	];

	return {
		lifters,
		lifterPrice,
		liftersSpread,
		gifs,
		clicks,
		money,
		setClicks,
		setMoney,
		setLifters
	};
};

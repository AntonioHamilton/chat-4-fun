import { useEffect, useState } from "react";
import {
	LOBBY_SLIDE_MS,
	lobbyBackgrounds
} from "@/LendasBrasileiras/Constants/lobby";
import * as SC from "./styled";

export const LobbyBackground = () => {
	const [index, setIndex] = useState(0);
	const total = lobbyBackgrounds.length;
	const previous = (index + total - 1) % total;

	useEffect(() => {
		const id = window.setInterval(
			() => setIndex((current) => (current + 1) % total),
			LOBBY_SLIDE_MS
		);
		return () => window.clearInterval(id);
	}, [total]);

	return (
		<SC.Stage aria-hidden="true">
			<SC.Slide
				key={`leaving-${previous}`}
				$image={lobbyBackgrounds[previous]}
				$leaving
			/>
			<SC.Slide key={`current-${index}`} $image={lobbyBackgrounds[index]} />
			<SC.Shade />
		</SC.Stage>
	);
};

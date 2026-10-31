import Image from "next/image";

export const LobbyEmblem = () => {
	return (
		<Image
			src="/BrasilianLegends/logos/emblema.webp"
			alt=""
			width={150}
			height={190}
			priority
		/>
	);
};

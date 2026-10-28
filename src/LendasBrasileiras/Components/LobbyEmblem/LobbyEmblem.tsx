import Image from "next/image";

export const LobbyEmblem = () => {
	return (
		<Image
			src="/lendas-brasileiras/logos/emblema.png"
			alt=""
			width={150}
			height={190}
			priority
		/>
	);
};

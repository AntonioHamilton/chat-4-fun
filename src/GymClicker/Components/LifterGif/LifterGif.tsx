import { ImageContainer } from "./styled";
import Image from "next/image";
import { useMemo } from "react";

type LifterGifProps = {
	gif: string;
	value: number;
	name: string;
};

export const LifterGif = ({ gif, value, name }: LifterGifProps) => {
	const particles = useMemo(
		() =>
			Array.from({ length: value }).map((_, i) => ({
				x: `${Math.random() * 60 - 30}px`,
				y: `${-70 - Math.random() * 70}px`,
				delay: `${Math.random() * 3}s`
			})),
		[value]
	);

	return (
		<ImageContainer>
			<Image
				unoptimized
				src={gif}
				width={200}
				height={200}
				alt={`${name} gif`}
			/>
			{particles.map((p, i) => (
				<p
					key={i}
					style={
						{
							"--x": p.x,
							"--y": p.y,
							animationDelay: p.delay
						} as React.CSSProperties
					}
				>
					+{value}🏋️
				</p>
			))}
		</ImageContainer>
	);
};

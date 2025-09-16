import React, { useEffect, useState } from "react";
import * as SC from "./styled";

const BackgroundAnimation = () => {
	const [shouldRender, setShouldRender] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => {
			setShouldRender(true);
		}, 100);

		return () => clearTimeout(timer);
	}, []);

	return (
		<SC.AnimationWrapper>
			<SC.StarsSmall $shouldRender={String(shouldRender)} />
			<SC.StarsMedium $shouldRender={String(shouldRender)} />
			<SC.StarsLarge $shouldRender={String(shouldRender)} />
		</SC.AnimationWrapper>
	);
};

export default BackgroundAnimation;

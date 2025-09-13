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
			<SC.StarsSmall shouldrender={String(shouldRender)} />
			<SC.StarsMedium shouldrender={String(shouldRender)} />
			<SC.StarsLarge shouldrender={String(shouldRender)} />
		</SC.AnimationWrapper>
	);
};

export default BackgroundAnimation;

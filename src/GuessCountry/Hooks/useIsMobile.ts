import { useEffect, useState } from "react";
import { breakpoints } from "@/styles/breakpoints";

const query = `(max-width: ${breakpoints.md})`;

export const useIsMobile = () => {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const media = window.matchMedia(query);
		const update = () => setIsMobile(media.matches);
		update();
		media.addEventListener("change", update);
		return () => media.removeEventListener("change", update);
	}, []);

	return isMobile;
};

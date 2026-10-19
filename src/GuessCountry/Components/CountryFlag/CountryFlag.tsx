import { COUNTRY_CODES } from "../../Constants/countryCodes";
import * as SC from "./styled";

type CountryFlagProps = { country: string };

export const CountryFlag = ({ country }: CountryFlagProps) => {
	const code = COUNTRY_CODES[country];
	if (!code) return null;
	return <SC.Flag className={`fi fi-${code}`} aria-hidden="true" />;
};

import React from "react";
import { LinkedinIcon } from "../Icons/LinkedinIcon";
import { GithubIcon } from "../Icons/GithubIcon";
import { EmailIcon } from "../Icons/EmailIcon";
import { useTranslation } from "@/hooks/useTranslation";
import { translations } from "@/Translations";
import * as SC from "./styled";

export const Footer = () => {
	const currentYear = new Date().getFullYear();
	const { language } = useTranslation();
	const t = translations[language];

	return (
		<SC.FooterContainer>
			<SC.Copyright>Chat 🤖 {currentYear}</SC.Copyright>
			<SC.PortfolioLink href="https://chat-hamilton.vercel.app/">
				← {t.portfolio_link}
			</SC.PortfolioLink>
			<SC.Socials>
				<a
					href="https://www.linkedin.com/in/antonio-hamilton/"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="LinkedIn"
				>
					<SC.Icon as={LinkedinIcon} />{" "}
					{/* Passa o componente de ícone como prop 'as' */}
				</a>
				<a
					href="https://github.com/AntonioHamilton"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="GitHub"
				>
					<SC.Icon as={GithubIcon} />
				</a>
				<a href="mailto:antoniohamilton.s.freitas@gmail.com" aria-label="Email">
					<SC.Icon as={EmailIcon} />
				</a>
			</SC.Socials>
		</SC.FooterContainer>
	);
};

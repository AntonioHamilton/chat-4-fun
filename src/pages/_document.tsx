import StyledComponentsRegistry from "@/lib/registry";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<meta name="description" content="Money Legends" />
				<link rel="icon" href="/favicon.ico" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="anonymous"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
					rel="stylesheet"
				/>
			</Head>
			<body>
				<StyledComponentsRegistry>
					<Main />
					<NextScript />
				</StyledComponentsRegistry>
			</body>
		</Html>
	);
}

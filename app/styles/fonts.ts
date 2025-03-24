import { Fira_Code } from "next/font/google";
import localFont from "next/font/local";

const firaCode = Fira_Code({
	variable: "--font-fira-code",
	subsets: ["latin"],
});

const symTextFont = localFont({
	src: [
		{
			path: "../../public/fonts/Symtext.ttf",
			weight: "700",
			style: "normal",
		},
	],
});

export { firaCode, symTextFont };

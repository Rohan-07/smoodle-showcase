import "./globals.css";
import Nav from "./components/Nav";
import "aos/dist/aos.css";
import { firaCode } from "./styles/fonts";

export const metadata = {
	title: "XO Showcase",
	description: "AI-Powered Innovation Hub",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={`${firaCode.className}`}>
				<Nav />
				{children}
			</body>
		</html>
	);
}

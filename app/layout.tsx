import "./globals.css";
import { Montserrat } from "next/font/google";
import Nav from "./components/Nav";
import "aos/dist/aos.css";

const montserrat = Montserrat({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
	title: "Smoodle Showcase",
	description: "AI-Powered Innovation Hub",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={montserrat.className}>
				<Nav />
				{children}
			</body>
		</html>
	);
}

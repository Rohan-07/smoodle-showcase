import Link from "next/link";
import { symTextFont } from "../styles/fonts";

export default function Nav() {
	return (
		<nav>
			<div className={`logo ${symTextFont.className}`}>XO Showcase</div>
			<div className="nav-links">
				<Link href="/">Home</Link>
				<Link href="/submit">Submit Project</Link>
			</div>
			<div className="nav-glow"></div>
		</nav>
	);
}

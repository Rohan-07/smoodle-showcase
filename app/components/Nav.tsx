import Link from "next/link";

export default function Nav() {
	return (
		<nav>
			<div className="logo">Smoodle Showcase</div>
			<div className="nav-links">
				<Link href="/">Home</Link>
				<Link href="/submit">Submit Project</Link>
			</div>
			<div className="nav-glow"></div>
		</nav>
	);
}

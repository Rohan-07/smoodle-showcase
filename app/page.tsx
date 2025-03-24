"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import ProjectCard from "./components/ProjectCard";
import { Project } from "../types";
import { symTextFont } from "./styles/fonts";

export default function Home() {
	const [projects, setProjects] = useState<Project[]>([]);

	useEffect(() => {
		AOS.init({
			duration: 1000,
			once: true,
			offset: 100,
		});

		// Fetch projects
		fetchProjects();
	}, []);

	const fetchProjects = async () => {
		try {
			const response = await fetch("/api/projects");
			const data = await response.json();
			setProjects(data);
		} catch (error) {
			console.error("Error fetching projects:", error);
		}
	};

	return (
		<>
			<header>
				<div className="header-content" data-aos="fade-up">
					<span className={`overline ${symTextFont.className}`}>
						Welcome to XO
					</span>
					<h1 className={`${symTextFont.className}`}>
						AI-Powered Innovation Hub ✨
					</h1>
					<p className="tagline">
						Where Human Creativity Meets AI Intelligence
					</p>
					<div className="header-cta">
						<p className="subtitle">
							Explore a collection of extraordinary projects crafted through the
							synergy of human ingenuity and AI assistance
						</p>
						<a href="/submit" className="cta-button">
							Share Your Creation
						</a>
					</div>
				</div>
			</header>

			<main>
				<div className="section-header" data-aos="fade-up">
					<h2>Featured Projects</h2>
					<p>Discover what others have built with XO</p>
				</div>
				<div className="projects-grid">
					{projects.map((project) => (
						<ProjectCard key={project.id} project={project} />
					))}
				</div>
			</main>

			<footer>
				<p>Powered by XO</p>
			</footer>
		</>
	);
}

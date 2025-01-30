"use client";

import { Project } from "../../types";

export default function ProjectCard({ project }: { project: Project }) {
	return (
		<div className="project-card" data-aos="fade-up">
			<div className="project-image">
				<img
					src={project.screenshotUrl}
					alt={project.projectName}
					style={{ width: "100%", height: "100%", objectFit: "cover" }}
				/>
			</div>
			<div className="project-content">
				<h3>{project.projectName}</h3>
				<p>Created by {project.creatorName}</p>
				<a
					href={project.projectUrl}
					className="view-project"
					target="_blank"
					rel="noopener noreferrer"
				>
					View Project
				</a>
			</div>
		</div>
	);
}

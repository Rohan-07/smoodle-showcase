import { Project } from "@/types";
import { db } from "../db";
import * as schema from "../db/schema";

export async function getProjects(): Promise<Project[] | null> {
	try {
		const projects = await db
			.select()
			.from(schema.projects)
			.orderBy(schema.projects.dateAdded);

		return projects;
	} catch (error) {
		console.error("Error fetching projects:", error);
		return null;
	}
}

export async function addProject(project: Omit<Project, "id" | "dateAdded">) {
	try {
		const newProject = await db
			.insert(schema.projects)
			.values([project])
			.returning();
		return newProject[0];
	} catch (error) {
		console.error("Error adding project:", error);
		return null;
	}
}

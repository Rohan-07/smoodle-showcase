import { NextResponse } from "next/server";
import { addProject, getProjects } from "../../lib/db";

export async function GET() {
	try {
		const projects = await getProjects();
		if (!projects)
			return NextResponse.json(
				{ error: "Failed to fetch projects" },
				{ status: 500 }
			);

		return NextResponse.json(projects);
	} catch (error) {
		console.error("GET /api/projects error:", error);
		return NextResponse.json(
			{ error: "Failed to fetch projects" },
			{ status: 500 }
		);
	}
}

export async function POST(request: Request) {
	try {
		const formData = await request.formData();
		const projectName = formData.get("projectName") as string;
		const creatorName = formData.get("creatorName") as string;
		const projectUrl = formData.get("projectUrl") as string;
		const screenshot = formData.get("screenshot") as File;

		if (!projectName || !creatorName || !projectUrl || !screenshot) {
			return NextResponse.json(
				{ error: "Missing required fields" },
				{ status: 400 }
			);
		}

		// Convert image to base64
		const bytes = await screenshot.arrayBuffer();
		const buffer = Buffer.from(bytes);
		const base64Image = `data:${screenshot.type};base64,${buffer.toString(
			"base64"
		)}`;

		// Save to database
		const newProject = await addProject({
			projectName,
			creatorName,
			projectUrl,
			screenshotUrl: base64Image,
		});

		if (!newProject)
			return NextResponse.json(
				{ error: "Failed to create project" },
				{ status: 500 }
			);

		console.log("Project added successfully:", newProject.id);
		return NextResponse.json({ success: true, project: newProject });
	} catch (error) {
		console.error("POST /api/projects error:", error);
		return NextResponse.json(
			{ error: "Failed to create project" },
			{ status: 500 }
		);
	}
}

import { Project } from '@/types'

// In-memory storage
let projects: Project[] = []
let nextId = 1

export async function getProjects(): Promise<Project[]> {
  return [...projects].reverse() // Return newest first
}

export async function addProject(project: Omit<Project, 'id' | 'dateAdded'>) {
  const newProject = {
    id: nextId++,
    dateAdded: new Date().toISOString(),
    ...project
  }
  
  projects.push(newProject)
  return newProject
}

// For development: Add some sample projects
if (projects.length === 0) {
  addProject({
    projectName: "Sample Project",
    creatorName: "John Doe",
    projectUrl: "https://example.com",
    screenshotUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='240' viewBox='0 0 400 240'%3E%3Crect width='400' height='240' fill='%23232323'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='16' fill='%23ffffff'%3ESample Project%3C/text%3E%3C/svg%3E"
  })
}

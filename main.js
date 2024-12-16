import AOS from 'aos';

AOS.init({
  duration: 1000,
  once: true,
  offset: 100
});

// Fetch and display projects
async function loadProjects() {
  try {
    const response = await fetch('http://localhost:3000/api/projects');
    const projects = await response.json();
    
    const projectsGrid = document.querySelector('.projects-grid');
    projectsGrid.innerHTML = projects.map(project => `
      <div class="project-card" data-aos="fade-up">
        <div class="project-image">
          <img src="http://localhost:3000${project.screenshotUrl}" alt="${project.projectName}">
        </div>
        <div class="project-content">
          <h3>${project.projectName}</h3>
          <p>Created by ${project.creatorName}</p>
          <a href="${project.projectUrl}" class="view-project" target="_blank">View Project</a>
        </div>
      </div>
    `).join('');
  } catch (error) {
    console.error('Error loading projects:', error);
  }
}

loadProjects();

import { Project } from '../../models/projects-models/Project';

export class ProjectService {
  private projectsKey: string = 'projects';

  saveProject(project: Project): void {
    const projects = this.getProjects();
    const existingIndex = projects.findIndex(p => p.id === project.id);
    if (existingIndex !== -1) {
      projects[existingIndex] = project;
    } else {
      projects.push(project);
    }
    localStorage.setItem(this.projectsKey, JSON.stringify(projects));
  }

  getProjects(): Project[] {
    const projectsJson = localStorage.getItem(this.projectsKey);
    return projectsJson ? JSON.parse(projectsJson) : [];
  }

  deleteProject(id: string): void {
    let projects = this.getProjects();
    projects = projects.filter(p => p.id !== id); // create a new array without the specifed project(exclude project that dosen't satisfy the condition)
    localStorage.setItem(this.projectsKey, JSON.stringify(projects));
  }
}

export const projectService = new ProjectService();

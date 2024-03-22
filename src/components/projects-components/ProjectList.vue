<template>
  <div>
    <h2>{{ selectedProject ? "Edit Project" : "Add Project" }}</h2>
    <ProjectForm @update="fetchProjects" : editProject="selectedProject" />
    <ul>
      <li v-for="project in projects" :key="project.id">
        {{ project.name }} - {{ project.description }}
        <button @click="deleteProject(project.id)">Delete</button>
        <button @click="selectProjectForEditing(project)">Edit</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import ProjectForm from './ProjectForm.vue';
import { projectService } from '../services/projects-services/ProjectService';
import { Project } from '../models/projects-models/project';

export default defineComponent({
  components: {
    ProjectForm
  },
  setup() {
    const projects = ref<Project[]>([]);
    const selectedProject = ref<Project | null>(null);

    const fetchProjects = () => {
      projects.value = projectService.getProjects();
    };

    const deleteProject = (id: string) => {
      projectService.deleteProject(id);
      fetchProjects(); // Refresh the list
    };

    const selectProjectForEditing = (project: Project) => {
      selectedProject.value = project; // Set the project for editing
    };

    // Reset form to "add new" mode after updating or adding a project
    const resetForm = () => {
      selectedProject.value = null;
    };

    onMounted(fetchProjects);

    return { projects, deleteProject, selectProjectForEditing, selectedProject, fetchProjects, resetForm };
  }
});
</script>

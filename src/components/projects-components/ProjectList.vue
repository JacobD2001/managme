<template>
  <ul>
    <li v-for="project in projects" :key="project.id">
      {{ project.name }} - {{ project.description }}
      <button @click="deleteProject(project.id)">Delete</button>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { projectService } from '../services/projects-services/ProjectService';
import { Project } from '../models/project-models/Project';

export default defineComponent({
  setup() {
    const projects = ref<Project[]>([]);

    const fetchProjects = () => {
      projects.value = projectService.getProjects();
    };

    const deleteProject = (id: string) => {
      projectService.deleteProject(id);
      fetchProjects(); // Refresh the list after deletion
    };

    onMounted(fetchProjects); // Load projects when component mounts

    return { projects, deleteProject };
  }
});
</script>

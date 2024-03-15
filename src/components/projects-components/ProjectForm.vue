<template>
  <div>
    <form @submit.prevent="submitForm">
      <div>
        <label for="name">Name:</label>
        <input v-model="project.name" id="name" type="text" required>
      </div>
      <div>
        <label for="description">Description:</label>
        <textarea v-model="project.description" id="description" required></textarea>
      </div>
      <button type="submit">Save Project</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { projectService } from '../services/projects-services/ProjectService';
import { Project } from '../models/project-models/Project';

export default defineComponent({
  setup() {
    const project = ref<Project>({ id: Date.now().toString(), name: '', description: '' });

    const submitForm = () => {
      projectService.saveProject(project.value);
      project.value = { id: Date.now().toString(), name: '', description: '' }; // Reset form
      // to do : add validation and error handling
    };

    return { project, submitForm };
  }
});
</script>

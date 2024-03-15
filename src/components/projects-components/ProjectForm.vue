to do: edit into 1 form 
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
import { defineComponent, PropType, ref, watch } from 'vue';
import { Project } from '../models/project-models/Project';
import { projectService } from '../services/projects-services/ProjectService';

export default defineComponent({
  props: {
    // Prop to receive a project for editing
    editProject: Object as PropType<Project>
  },
  setup(props, { emit }) {
    const project = ref<Project>({ id: '', name: '', description: '' });

    // Watch for changes on editProject prop
    watch(() => props.editProject, (newVal) => {
      if (newVal) {
        project.value = { ...newVal };
      }
    }, { immediate: true });

    const submitForm = () => {
      projectService.saveProject(project.value);
      emit('update'); // Emit an event to notify parent of update
      project.value = { id: Date.now().toString(), name: '', description: '' }; // Reset form
    };

    return { project, submitForm };
  }
});
</script>

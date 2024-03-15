<template>
  <div id="app">
    <ProjectForm />
    <ProjectList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ProjectForm from './components/projects-components/ProjectForm.vue';
import ProjectList from './components/projects-components/ProjectList.vue';

export default defineComponent({
  components: {
    ProjectForm,
    ProjectList
  }
});
</script>
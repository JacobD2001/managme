<template>
  <div id="app">
    <ProjectList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ProjectList from './components/projects-components/ProjectList.vue';

export default defineComponent({
  components: {
    ProjectList
  }
});
</script>
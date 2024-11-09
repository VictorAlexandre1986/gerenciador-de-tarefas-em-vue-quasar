<template>
    <div>
      <ul>
        <li v-for="task in tasks" :key="task.id">
          {{ task.title }} - Priority: {{ task.priority }}
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  defineProps(['tasks']);
  import { ref, onMounted } from 'vue';
  const { ipcRenderer } = require('electron');

  const tasks = ref([]);

  async function loadTasks() {
    tasks.value = await ipcRenderer.invoke('get-tasks');
  }

  onMounted(() => {
    loadTasks();
  });
  </script>
  
  <style scoped>
  li {
    margin: 5px 0;
  }
  </style>
  
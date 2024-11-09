<template>
    <div>
      <vue-cal
        style="height: 400px;"
        :events="calendarEvents"
        :editable="true"
        @event-change="updateTaskDueDate"
      />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import VueCal from 'vue-cal';
  import 'vue-cal/dist/vuecal.css';
  const { ipcRenderer } = require('electron');
  
  const calendarEvents = ref([]);
  
  async function loadTasks() {
    const tasks = await ipcRenderer.invoke('get-tasks');
    calendarEvents.value = tasks.map(task => ({
      id: task.id,
      title: task.title,
      start: task.due_date ? new Date(task.due_date) : new Date(),
      end: task.due_date ? new Date(task.due_date) : new Date(),
      content: task.priority,
    }));
  }
  
  function updateTaskDueDate(event) {
    ipcRenderer.invoke('update-task-due-date', {
      id: event.id,
      due_date: event.start,
    });
  }
  
  onMounted(() => {
    loadTasks();
  });
  </script>
  
  <style scoped>
  /* Estilo customizado para o calendário, se necessário */
  </style>
  
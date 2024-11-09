
<template>
  <div id="app">
    <TaskForm @addTask="addTask" />
    <TaskList :tasks="tasks" />
    <CalendarIntegration />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import TaskForm from './components/TaskForm.vue';
import TaskList from './components/TaskList.vue';
import CalendarIntegration from './components/CalendarIntegration.vue';

const tasks = ref([]);

function addTask(task) {
  tasks.value.push(task);
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}
</style>

<template>
  <form @submit.prevent="submitTask">
    <input v-model="title" placeholder="Task title" required />
    <select v-model="priority">
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select>
    <button type="submit">Add Task</button>
  </form>
</template>

<script setup>
import { ref } from 'vue';

const title = ref('');
const priority = ref('low');

function submitTask() {
  window.api.addTask({ title: title.value, priority: priority.value })
    .then(() => {
      title.value = '';
      priority.value = 'low';
    })
    .catch(err => console.error('Error adding task:', err));
}
</script>

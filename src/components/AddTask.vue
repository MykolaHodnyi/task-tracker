<template>
  <div class="add-task">
    <h2>Add New Task</h2>
    <form @submit.prevent="submitTask">
      <div>
        <label for="title">Title:</label>
        <input v-model="title" type="text" id="title" required />
      </div>
      <div>
        <label for="description">Description:</label>
        <textarea v-model="description" id="description" required></textarea>
      </div>
      <div>
        <label for="assignee">Assignee:</label>
        <input v-model="assignee" type="text" id="assignee" required />
      </div>
      <div>
        <label for="performers">Performers (comma separated):</label>
        <input v-model="performers" type="text" id="performers" />
      </div>
      <div>
        <label for="priority">Priority:</label>
        <select v-model="priority" id="priority">
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>
      <div>
        <label for="deadline">Deadline:</label>
        <input v-model="deadline" type="date" id="deadline"/>
      </div>
      <button type="submit">Add Task</button>
    </form>
    <h2>{{statusId}}</h2>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'AddTask',
  data () {
    return {
      title: '',
      description: '',
      assignee: '',
      performers: '',
      priority: 'High',
      deadline: ''
    }
  },
  props: {
    statusId: Number
  },
  methods: {
    ...mapActions(['addTask']),
    submitTask () {
      const newTask = {
        title: this.title,
        description: this.description,
        assignee: this.assignee,
        performers: this.performers.split(',').map(p => p.trim()),
        statusId: this.statusId,
        priority: this.priority,
        deadline: this.deadline
      }
      this.addTask(newTask)
      this.clearForm()
    },
    clearForm () {
      this.title = ''
      this.description = ''
      this.assignee = ''
      this.performers = ''
      this.priority = 'High'
      this.deadline = ''
    }
  }
}
</script>

<style>
</style>

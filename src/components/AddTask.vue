<template>
  <div class="add-task">
    <h3 class="add-task__title">Add New Task</h3>
    <form class="add-task__form" @submit.prevent="submitTask">
      <div class="add-task__input-group">
        <label for="title">Title:</label>
        <input class="input input-text" v-model="title" type="text" id="title" placeholder="Title" required />
      </div>
      <div class="add-task__input-group">
        <label for="description">Description:</label>
        <textarea class="input input-text" v-model="description" id="description" placeholder="Description" required></textarea>
      </div>
      <div class="add-task__input-group">
        <label for="assignee">Assignee:</label>
        <input class="input input-text" v-model="assignee" type="text" id="assignee" placeholder="Assignee" required />
      </div>
      <div class="add-task__input-group">
        <label for="performers">Performers (comma separated):</label>
        <input class="input input-text" v-model="performers" type="text" id="performers" placeholder="Performers" />
      </div>
      <div class="add-task__input-group">
        <label for="priority">Priority:</label>
        <select v-model="priority" id="priority">
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>
      <div class="add-task__input-group">
        <label for="deadline">Deadline:</label>
        <input class="input-text" v-model="deadline" type="date" id="deadline"/>
      </div>
      <button type="submit" class="btn">Add Task</button>
    </form>
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

<style lang="scss">
.add-task {
  &__form {
    width: 450px;
  }
  &__input-group {
    display: flex;
    flex-direction: column;
    &:not(:last-child) {
      margin-bottom: 8px;
    }
  }
}
</style>

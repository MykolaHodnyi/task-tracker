<template>
  <div class="edit-task">
    <h3 class="edit-task__title">Edit Task</h3>
    <form class="edit-task__form" @submit.prevent="saveTask">
      <div class="edit-task__input-group">
        <label for="title">Title:</label>
        <input class="input input-text"
               v-model="editedTask.title"
               type="text"
               id="title"
               placeholder="Title"
               required
        />
      </div>

      <div class="edit-task__input-group">
        <label for="description">Description:</label>
        <textarea class="input input-text"
                  v-model="editedTask.description"
                  id="description"
                  placeholder="Description"
                  required
        ></textarea>
      </div>

      <div class="edit-task__input-group">
        <label for="assignee">Assignee:</label>
        <input class="input input-text"
               v-model="editedTask.assignee"
               type="text"
               id="assignee"
               placeholder="Assignee"
               required
        />
      </div>

      <div class="edit-task__input-group">
        <label for="performers">Performers (comma separated):</label>
        <input
          class="input input-text"
          v-model="performersString"
          type="text"
          id="performers"
          placeholder="Performers"
        />
      </div>

      <div class="edit-task__input-group">
        <label for="priority">Priority:</label>
        <select v-model="editedTask.priority" id="priority">
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      <div class="edit-task__input-group">
        <label for="deadline">Deadline:</label>
        <input class="input-text"
               v-model="editedTask.deadline"
               type="date"
               id="deadline"
        />
      </div>

      <button @click="deleteTaskConfirm" class="btn btn-remove">Delete</button>
      <button type="submit" class="btn">Update Task</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'UpdateTask',
  data() {
    return {
      editedTask: null,
      performersString: ''
    }
  },
  props: {
    taskId: {
      type: Number,
      required: true
    }
  },
  emits: ['close-popup', 'task-updated'],
  computed: {
    task() {
      return this.$store.state.tasks.find(task => task.id === this.taskId)
    }
  },
  watch: {
    task: {
      immediate: true,
      handler(newTask) {
        if (newTask) {
          this.editedTask = { ...newTask }
          this.performersString = newTask.performers.join(', ')
        }
      }
    }
  },
  methods: {
    ...mapActions(['updateTask', 'deleteTask']),
    saveTask() {
      this.editedTask.performers = this.performersString
        .split(',')
        .map(performer => performer.trim())
      this.updateTask(this.editedTask)
      this.$emit('task-updated')
    },
    deleteTaskConfirm() {
      if (confirm('Are you sure you want to delete this task?')) {
        this.deleteTask(this.taskId)
        this.$emit('close-popup')
      }
    }
  }
}
</script>

<style lang="scss">
.edit-task {
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
.btn-remove {
  margin-bottom: 8px;
}
</style>

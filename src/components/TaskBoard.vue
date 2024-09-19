<template>
  <div class="task-board">
    <div class="columns">
      <div class="task-column"
           v-for="status in statuses" :key="status.id"
           @drop="onDrop($event, status.id)"
           @dragover.prevent
           @dragenter.prevent
      >
        <h3>{{ status.title }}</h3>
        <div v-for="task in getTasksByStatus(status.id)"
             :key="task.id"
             @dragstart="onDragStart($event, task)"
             class="task-card"
             draggable="true"
        >
          <h4>{{ task.title }}</h4>
          <p>{{ task.description }}</p>
          <p><strong>Assignee:</strong> {{ task.assignee }}</p>
          <p><strong>Performers:</strong> {{ task.performers.join(', ') }}</p>
          <p><strong>Priority:</strong> {{ task.priority }}</p>
          <button @click="editTask(task)">Edit</button>
          <button @click="deleteTask(task.id)">Delete</button>
        </div>
        <button class="btn-add" @click="isVisiblePopup = true; statusId = status.id">+</button>
      </div>
    </div>
  </div>
  <popup-task-create :data="statusId" :is-visible="isVisiblePopup" @close="closePopup"></popup-task-create>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import PopupTaskCreate from '@/components/PopupTaskCreate.vue'

export default {
  data() {
    return {
      isVisiblePopup: false,
      statusId: 0
    }
  },
  name: 'TaskBoard',
  components: { PopupTaskCreate },
  computed: {
    ...mapGetters(['getTasksByStatus']),
    statuses() {
      return this.$store.state.statuses
    }
  },
  methods: {
    ...mapActions(['deleteTask', 'changeTaskStatus']),
    onDragStart(e, task) {
      e.dataTransfer.dropEffect = 'move'
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.setData('taskId', task.id.toString())
    },
    onDrop(e, statusId) {
      const taskId = parseInt(e.dataTransfer.getData('taskId'))
      this.changeTaskStatus({ taskId, newStatusId: statusId })
    },
    closePopup() {
      this.isVisiblePopup = false
    }
  }
}
</script>

<style>
.task-board {
  display: flex;
  justify-content: space-around;
  flex-direction: column;
}
.task-column {
  width: 30%;
  background-color: #f3f3f3;
  padding: 10px;
  border-radius: 8px;
}
.columns {
  display: flex;
  justify-content: space-between;
}
.task-card {
  background-color: white;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.btn-add {
  background-color: green;
}
</style>

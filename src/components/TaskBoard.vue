<template>
  <div class="main task-board">
    <div class="task-board__columns">
      <div class="task-board__column"
           v-for="status in statuses" :key="status.id"
           @drop="onDrop($event, status.id)"
           @dragover.prevent
           @dragenter.prevent
      >
        <h3 class="task-board__column-title">{{ status.title }}</h3>

        <div class="cards-container">
          <div v-for="task in getTasksByStatus(status.id)"
               :key="task.id"
               @dragstart="onDragStart($event, task)"
               class="task-board__card"
               draggable="true"
               @click="isVisibleUpdatePopup = true; taskId = task.id"
          >
            <h4 class="task-board__card-title">{{ task.title }}</h4>
            <p class="task-board__card-priority"><strong>Priority:</strong> {{ task.priority }}</p>
          </div>
        </div>

        <button class="btn btn-add task-board__column-btn"
                @click="isVisibleCreatePopup = true; statusId = status.id"
        >
          Add Task
        </button>
      </div>
    </div>
  </div>

  <popup-task-create :data="statusId" :is-visible="isVisibleCreatePopup" @close="closeCreatePopup"></popup-task-create>
  <popup-task-update :taskId="taskId" :is-visible="isVisibleUpdatePopup" @close="closeUpdatePopup"></popup-task-update>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import PopupTaskCreate from '@/components/PopupTaskCreate.vue'
import PopupTaskUpdate from '@/components/PopupTaskUpdate.vue'

export default {
  data() {
    return {
      isVisibleCreatePopup: false,
      isVisibleUpdatePopup: false,
      statusId: 0,
      taskId: 0
    }
  },
  name: 'TaskBoard',
  components: { PopupTaskCreate, PopupTaskUpdate },
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
    closeUpdatePopup() {
      this.isVisibleUpdatePopup = false
    },
    closeCreatePopup() {
      this.isVisibleCreatePopup = false
    },
    updateTask(task) {

    }
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/variables';

.task-board {
  margin-top: 200px;
  &__columns {
    display: flex;
    justify-content: space-around;
  }
  &__column {
    width: 30%;
    padding: 10px;
    background-color: $secondary-light-grayish-red-color;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    min-height: 300px;
  }
  &__card {
    background-color: white;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid $primary-dark-gray-color;
    border-radius: 4px;
    &-title {}
    &-priority {}
  }
}

.cards-container {
  flex: 1 1 auto;
}
</style>

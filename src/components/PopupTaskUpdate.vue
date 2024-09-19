<template>
  <teleport to="body">
    <div v-if="isVisible" @click.self="closePopup" class="popup">
      <div class="popup__wrapper">
        <update-task :taskId="taskId" @task-updated="closePopup" @task-deleted="closePopup"></update-task>

        <button @click.stop="closePopup" class="popup__btn btn btn-close">Close</button>
      </div>
    </div>
  </teleport>
</template>

<script>
import UpdateTask from '@/components/UpdateTask.vue'

export default {
  name: 'PopupTaskCreate',
  components: { UpdateTask },
  emits: ['close'],
  props: {
    isVisible: {
      type: Boolean,
      required: true
    },
    taskId: {
      type: Number,
      required: true
    }
  },
  methods: {
    closePopup() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss">
.popup {
  &__wrapper {
    padding: 24px;
    position: absolute;
    border: 1px solid black;
  }
  &__btn {
    margin-top: 8px;
  }
}
</style>

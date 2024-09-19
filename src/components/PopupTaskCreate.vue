<template>
  <teleport to="body">
    <div v-if="isVisible" @click.self="closePopup" class="popup">
      <div class="popup__wrapper">
        <add-task :status-id="data"></add-task>
        <button @click.stop="closePopup" class="popup__btn btn btn-close">Close</button>
      </div>
    </div>
  </teleport>
</template>

<script>
import AddTask from '@/components/AddTask.vue'

export default {
  name: 'PopupTask',
  components: { AddTask },
  emits: ['close'],
  props: {
    isVisible: {
      type: Boolean,
      required: true
    },
    data: {
      type: Number,
      required: true
    }
  },
  computed: {
    // titlePopup() {
    //   return this.data.title
    // },
    // descriptionPopup() {
    //   return this.data.description
    // }
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

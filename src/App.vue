<template>
  <header-common></header-common>
  <main>
    <task-board></task-board>
  </main>
</template>

<script>
import HeaderCommon from '@/components/HeaderCommon.vue'
import TaskBoard from '@/components/TaskBoard.vue'

export default {
  name: 'App',
  components: {
    HeaderCommon,
    TaskBoard
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="scss">
</style>

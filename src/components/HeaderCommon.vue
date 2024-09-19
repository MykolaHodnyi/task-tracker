<template>
  <header class="header">
    <div class="header__logo"></div>
    <div class="header__menu"></div>
    <div class="header__actions"></div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'HeaderCommon',
  components: {},
  data() {
    return {
    }
  },
  props: {
    data: {
      type: Object,
      required: false
    }
  },
  computed: {
    ...mapGetters([])
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style lang="scss">
</style>

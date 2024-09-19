<template>
  <header class="header">
    <div class="header__logo">
      <h2>TaskTracker</h2>
    </div>
  </header>
</template>

<script>

export default {
  name: 'HeaderCommon'
}
</script>

<style lang="scss">
.header {
  position: fixed;
  top: 0;
  height: 100px;
  width: 100%;
  padding: 0 110px;
  z-index: 900;
  display: flex;
  background: #e0e0e0;
  box-shadow:  20px 20px 60px #c1c1c1,
               -20px -20px 60px #ffffff;
}
</style>

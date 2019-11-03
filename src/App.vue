<template>
  <div id="app">
    <header class="app-section">
      <Header></Header>
    </header>
    <div class="app-section">
      <router-view />
    </div>
  </div>
</template>
<script>
import Header from './components/Header'
export default {
  name: 'app',
  components: {Header}
}
</script>
<style lang="scss">
.app-section {
  max-width: 800px;
  margin: auto;
  padding: 2rem;
}
</style>

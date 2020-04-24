<template>
  <div id="app" class="relative">
    <div v-if="loading" class="mask">
      <div class="loader rounded shadow-lg p-6 bg-white flex items-center justify-center">
        <p>Loading...</p>
      </div>
    </div>
    <Nav />
    <main class="py-24 px-6 max-w-screen-xl mx-auto">
      <router-view :key="$route.fullPath"/>
    </main>
    <Footer />
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue'
import Footer from '@/components/Footer.vue'

import { mapState } from 'vuex'
export default {
  name: 'App',
  components: {
    Nav,
    Footer
  },
  computed: {
    ...mapState(['loading'])
  },
}
</script>


<style lang="scss">
  .mask {
    position: fixed;
    height: 100vh;
    width: 100vw;
    background-color: rgba(200, 200, 200, 0.5);
  }
  .loader {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 200px;
    height: 100px;
  }
</style>

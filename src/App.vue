<template>
  <div id="app">
    <div class="sidebar">
      <SideBar v-if="showSidebar" />
    </div>
    <router-view />
  </div>
</template>

<script>
import SideBar from "./components/SideBar.vue";



export default {
  name: "App",
  components: {
    SideBar,
  },
  computed: {
    showSidebar() {
      // Get the current route's meta field
      const currentRoute = this.$route;
      return currentRoute.meta.showSidebar !== false;
    },
  },
}
</script>

<style>
* {
  font-family: Noto Sans, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
  color: #323232;
}

body {
  background: #F4FAFF;
}

#app {
  display: flex;
  width: 100%;
  height: 100vh;
}

.sidebar {
  width: 20%;
}
</style>
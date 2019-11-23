<template>
  <div id="app">
    <main-page />
  </div>
</template>

<script>
import MainPage from "./views/MainPage";

export default {
  name: "app",
  components: {
    MainPage
  }
};
</script>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  font-size: 100%;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

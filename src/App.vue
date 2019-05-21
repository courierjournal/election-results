<template>
  <div id="app">
    <main>
      <ResultsContainer/>
    </main>
  </div>
</template>

<script>
import css from "./assets/main.css";
import ResultsContainer from "./components/ResultsContainer.vue";

export default {
  name: "app",
  components: {
    ResultsContainer
  }
};
</script>

<style>
:root {
  --republican: #c43d49;
  --democrat: #5286b4;
  --green: #688929;
  --libertarian: #ff9800;
  --independent: #9e9e9e;
  --other: #9575cd;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

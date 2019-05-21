<template>
  <div class="results-container" v-if="electionResults">
    <div class="search-container">
      <input type="text" placeholder="Search">
      <button v-on:click="getElectionData">Debug</button>
    </div>
    <div class="results">
      <div class="race-container-outer" v-for="(race,index) in electionResults.races" :key="index">
        <RaceContainer :race="race"/>
      </div>
    </div>
  </div>
</template>

<script>
import RaceContainer from "./RaceContainer.vue";
export default {
  name: "ResultsContainer",
  components: {
    RaceContainer
  },
  data() {
    return { electionResults: null };
  },
  created() {
    this.getElectionData();
  },
  methods: {
    getElectionData() {
      fetch("http://localhost:3000/results/static")
        .then(res => {
          return res.json();
        })
        .then(data => {
          this.electionResults = data;
          if (data.live === true) {
          }
        });
    },
    setTimer() {
      setInterval(this.getElectionData(), 60000);
    }
  }
};
</script>

<style>
.results-container {
  background-color: #eee;
}

.results {
  max-width: 1180px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
}

.race-container-outer {
  flex-basis: 50%;
  padding: 1em;
  box-sizing: border-box;
}
</style>
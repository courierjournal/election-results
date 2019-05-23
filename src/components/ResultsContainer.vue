<template>
  <div class="results-container" v-if="electionResults">
    <div class="search-container" v-if="false">
      <input type="text" placeholder="Search" v-model="searchQuery">
    </div>
    <div class="debug-container" v-if="isDev()">
      <button v-on:click="getElectionData">Fetch New</button>
    </div>
    <div class="results">
      <div class="race-container-outer" v-for="(race,index) in electionResults.races" :key="index">
        <RaceContainer :race="race"/>
      </div>
    </div>
    <div class="timestamp-container" v-if="electionResults.live">
      <div>Status: Live</div>
      <div>Last Fetch: {{lastFetch}}</div>
      <div>Last Update: {{electionResults.lastUpdate}}</div>
    </div>
  </div>
</template>

<script>
import RaceContainer from "./RaceContainer.vue";
import { clearInterval } from 'timers';
export default {
  name: "ResultsContainer",
  components: {
    RaceContainer
  },
  data() {
    return {
      resultsEndpoint: this.getResultsEndpoint(),
      electionResults: null,
      searchQuery: "",
      lastFetch: null,
      fetchInterval: 60000,
      timer: null
    };
  },
  created() {
    this.getElectionData();
    this.timer = setInterval(()=>{this.getElectionData()}, this.fetchInterval);
  },
  methods: {
    getElectionData() {
      fetch(`${this.resultsEndpoint}?t=` + new Date().getTime())
        .then(res => {
          return res.json();
        })
        .then(data => {
          this.electionResults = data;
          this.lastFetch = this.getTimeStamp();
          if (data.live === false) {
            window.clearInterval(this.timer);
          }
        });
    },
    getTimeStamp() {
      return new Date().getTime();
    },
    isDev() {
      return process.env.NODE_ENV === "development" ? true : false;
    },
    getResultsEndpoint() {
      return this.isDev()
        ? "http://localhost:3000/results/static"
        : "data/results.json";
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

.timestamp-container {
  max-width: 1180px;
  margin: 0 auto;
  text-align: right;
  font-size: 10px;
}

.search-container {
  padding: 1em;
}

.debug-container {
  position: fixed;
  right: 0;
  top: 0;
  z-index: 99999;
}

@media only screen and (max-width: 720px) {
.race-container-outer{
  flex-basis: 100%;
}
}
</style>
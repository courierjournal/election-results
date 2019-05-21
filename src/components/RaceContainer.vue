<template>
  <div class="race-container">
    <h3 class="race-label">{{race.label}}</h3>
    <transition-group name="flip-list" tag="div">
    <CandidateContainer
      v-for="candidate in sortedCandidates"
      :key="candidate.id"
      :candidate="candidate"
    />
    </transition-group>
    <div class="precincts-reporting"><CountUp :endVal="this.race.precincts.percent" :options="countUpOptionsPercent"/> reporting</div>
  </div>
</template>

<script>
import CandidateContainer from "./CandidateContainer.vue";
import CountUp from "vue-countup-v2";
export default {
  name: "RaceContainer",
  components: { CandidateContainer, CountUp },
  props: {
    race: Object
  },
  data() {
    return {
      countUpOptionsPercent: {
        useEasing: true,
        useGrouping: true,
        decimal: ".",
        prefix: "",
        suffix: "%",
        duration: 1
      }
    };
  },
  computed: {
    sortedCandidates() {
      function compare(a, b) {
        if (a.votes > b.votes) return -1;
        if (a.votes < b.votes) return 1;
        return 0;
      }

      return this.race.candidates.sort(compare);
    }
  }
};
</script>


<style>
.flip-list-move {
  transition: transform 1.2s;
  transition-delay:1s;
}

.race-container {
  background-color: #fff;
  box-sizing: border-box;
  padding: 1em;
  padding-top: 1px;
  border-radius: 2px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
}

.race-label {
  text-transform: uppercase;
  font-weight: bold;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
  font-size: 1em;
}

.precincts-reporting {
  text-align: right;
  font-size: 0.7em;
}
</style>
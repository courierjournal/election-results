<template>
  <div class="candidate-container">
    <div class="candidate-name">{{formattedName}}</div>
    <div class="candidate-bar-container">
      <div class="candidate-bar-outer">
        <div
          class="candidate-bar-inner"
          :class="this.candidate.party"
          :style="{width: formattedPercent}"
        ></div>
        <div class="candidate-bar-percent">
          <CountUp :endVal="this.candidate.votePct" :options="countUpOptionsPercent"/>
        </div>
      </div>
    </div>
    <div class="candidate-total-votes">
      <CountUp :endVal="this.candidate.votes" :options="countUpOptionsVote"/>
    </div>
  </div>
</template>

<script>
import CountUp from "vue-countup-v2";
export default {
  name: "CandidateContainer",
  components: { CountUp },
  data() {
    return {
      countUpOptionsVote: {
        useEasing: true,
        useGrouping: true,
        separator: ",",
        decimal: ".",
        prefix: "",
        suffix: "",
        duration: .8
      },
      countUpOptionsPercent: {
        useEasing: true,
        useGrouping: false,
        decimalPlaces: 1,
        decimal: ".",
        prefix: "",
        suffix: "%",
        duration: 1
      }
    };
  },
  props: {
    candidate: Object
  },
  computed: {
    formattedName() {
      let candidateParty = this.candidate.party
        ? `(${this.candidate.party.toUpperCase()})`
        : "";
      let candidateName = `${this.candidate.firstName} ${
        this.candidate.middleName
      } ${this.candidate.lastName} ${
        this.candidate.suffix
      } ${candidateParty}`.replace(/ +(?= )/g, "");
      return candidateName.trim();
    },
    formattedPercent() {
      return `${this.candidate.votePct}%`;
    }
  }
};
</script>


<style>
.candidate-container {
  display: flex;
  flex-direction: row;
  margin: 6px 0;
  font-size: 0.9em;
}

.candidate-name {
  flex-basis: 40%;
  text-align: left;
  font-weight: bold;
}

.candidate-bar-container {
  flex-basis: 40%;
  text-align: center;
}

.candidate-bar-outer {
  text-align: center;
  position: relative;
  background-color: #ccc;
  border-radius: 2px;
  overflow: hidden;
}

.candidate-bar-inner {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background-color: var(--independent);
  transition: 0.4s width;
}

.candidate-bar-percent {
  font-weight: bold;
  position: relative;
}

.candidate-bar-inner.r {
  background-color: #c43d49;
  background-color: var(--republican);
}

.candidate-bar-inner.d {
  background-color: #5286b4;
  background-color: var(--democrat);
}

.candidate-bar-inner.g {
  background-color: #688929;
  background-color: var(--green);
}

.candidate-bar-inner.l {
  background-color: #ff9800;
  background-color: var(--libertarian);
}

.candidate-total-votes {
  flex-basis: 20%;
  text-align: right;
}
</style>
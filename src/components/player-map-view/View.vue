<script setup lang="ts">
import { computed } from "vue";
import RelayConnection from "@RelayCon";
import Player from "../player-info-view/Player.vue";

const props = defineProps<{
  relayConnection: RelayConnection;
}>();

const relayData = props.relayConnection.getData();
const mapImage = computed(
  () =>
    `https://eu.cdn.beatsaver.com/${relayData.mapPoolMap.value.hash.toLowerCase()}.jpg`
);
</script>

<template>
  <div class="player-map-info-view">
    <div class="map">
      <img :src="mapImage" alt="" />
      <h1>{{ relayData.mapPoolMap.value.name }}</h1>
      <div class="grid">
        <div class="right secondary">Mapper</div>
        <div class="left secondary">Thyspoon</div>
        <div class="right secondary">Diff</div>
        <div class="left secondary">Expert+</div>
        <div class="right secondary">Category</div>
        <div class="left secondary">Mid-Speed</div>
      </div>
    </div>
    <div class="players">
      <Player
        :relayConnection="relayConnection"
        :profilePic="relayData.leftProfilePic.value"
        :seed="relayData.leftSeed.value"
        :playerName="relayData.leftname.value"
        :globalRank="relayData.leftRank.value"
        :localRank="relayData.leftlocalrank.value"
        direction="left"
      />
      <Player
        :relayConnection="relayConnection"
        :profilePic="relayData.rightProfilePic.value"
        :seed="relayData.rightSeed.value"
        :playerName="relayData.rightname.value"
        :globalRank="relayData.rightRank.value"
        :localRank="relayData.rightlocalrank.value"
        direction="right"
      />
    </div>
  </div>
</template>

<style scoped>
.player-map-info-view {
  width: 70vw;
  height: calc(10rem + 12px);
  margin: auto;
  margin-top: 30%;
}

.map {
  position: absolute;
  top: 12%;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  text-transform: uppercase;
  font-size: 1.5rem;
}

.map img {
  width: 10rem;
}

.players {
  display: flex;
  justify-content: space-between;
  width: 100%;
  transform: translateY(100%);
}

.grid {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 0 1rem;
  grid-template-areas:
    "Mapper Mapper"
    "Diff Diff"
    "Category Category";
}

.right {
  text-align: right;
  font-size: 75%;
  line-height: 225%;
}

h1 {
  margin-bottom: 1rem;
}

.left {
  text-align: left;
}
</style>

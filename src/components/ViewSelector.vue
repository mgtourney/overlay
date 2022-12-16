<script setup lang="ts">
import { computed } from "vue";
import InMapView from "./in-map-view/View.vue";
import PlayerInfoView from "./player-info-view/View.vue";
import RelayConnection from "../helpers/RelayConnection";
import MapPoolView from "./map-pool-view/View.vue";
import WarmupsPoolView from "./warmups-pool-view/View.vue";
import PlayerMapInfoView from "./player-map-view/View.vue";
import StartingEndingView from "./starting-ending-view/View.vue";
import { ViewType } from "../types/general";

const props = defineProps<{
  relayConnection: RelayConnection;
  view: ViewType;
}>();

const relayData = props.relayConnection.getData();
const showInMapView = computed(() => props.view === "in-map-view");
const showPlayerInfoView = computed(() => props.view === "player-info-view");
const showMapPoolView = computed(() => props.view === "map-pool-view");
const showWarumupsPoolView = computed(() => props.view === "warmups-pool-view");
const showPlayerMapInfoView = computed(() => props.view === "player-map-view");
const showStartingView = computed(() => props.view === "starting-view");
const showEndingView = computed(() => props.view === "ending-view");
</script>

<template>
  <div>
    <video
      class="background play"
      muted
      autoplay
      loop
      onloadstart="this.playbackRate = 0.8"
    >
      <source src="../assets/videos/Ink2.mp4" type="video/mp4" />
    </video>
    <div class="blur"></div>
  </div>
  <InMapView :relayConnection="relayConnection" v-show="showInMapView" />
  <PlayerInfoView :relayConnection="relayConnection" v-show="showPlayerInfoView" />
  <MapPoolView
    :relayConnection="relayConnection"
    :name="relayData.mapPool.value.poolName"
    v-show="showMapPoolView"
    :group1Maps="relayData.mapPool.value.poolMapsGroup1"
    :group2Maps="relayData.mapPool.value.poolMapsGroup2"
    :group3Maps="relayData.mapPool.value.poolMapsGroup3"
  />
  <WarmupsPoolView :relayConnection="relayConnection" v-show="showWarumupsPoolView" />
  <PlayerMapInfoView :relayConnection="relayConnection" v-show="showPlayerMapInfoView" />
  <StartingEndingView :starting="true" v-show="showStartingView"  />
  <StartingEndingView :starting="false" v-show="showEndingView"  />
</template>

<style scoped>
.background {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.blur {
  position: fixed;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
  background-color: #121f2588;
  z-index: -1;
  backdrop-filter: blur(8px);
}

.play {
  display: block;
}
</style>

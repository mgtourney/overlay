<script setup lang="ts">
import { computed } from "vue";
import InMapView from "./in-map-view/View.vue";
import PlayerInfoView from "./player-info-view/View.vue";
import RelayConnection from "../helpers/RelayConnection";
import MapPoolView from "./map-pool-view/View.vue";
import WarmupsPoolView from "./warmups-pool-view/View.vue";

const relayConnection = new RelayConnection();
const relayData = relayConnection.getData();
const showInMapView = computed(() => relayData.viewMode.value === "in-map-view");
const showPlayerInfoView = computed(
  () => relayData.viewMode.value === "player-info-view"
);
const showMapPoolView = computed(() => relayData.viewMode.value === "map-pool-view");
const showWarumupsPoolView = computed(
  () => relayData.viewMode.value === "warmups-pool-view"
);
</script>

<template>
  <div id="background">
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
</template>

<style scoped>
.background {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
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

<script setup lang="ts">
import Player from "../player-info-view/Player.vue";
import RelayConnection from "../../helpers/RelayConnection";

const props = defineProps<{
  relayConnection: RelayConnection;
}>();

const relayData = props.relayConnection.getData();
</script>

<template>
  <div class="player-map-info-view">
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
</template>

<style scoped>
.player-map-info-view {
  width: 70vw;
  height: calc(10rem + 12px);
  margin: auto;
  display: flex;
  justify-content: space-between;
}
</style>

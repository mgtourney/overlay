<script setup lang="ts">
import MapPoolView from "./../map-pool-view/View.vue";
import RelayConnection from "../../helpers/RelayConnection";

const props = defineProps<{
  relayConnection: RelayConnection;
}>();

const relayData = props.relayConnection.getData();
</script>

<template>
  <div class="warmups-pool-view">
    <MapPoolView
      :relayConnection="relayConnection"
      :name="relayData.mapPool.value.warmupPoolName"
      :group1Maps="relayData.mapPool.value.poolWarmupMapsGroup1"
      :group2Maps="relayData.mapPool.value.poolWarmupMapsGroup2"
      :group3Maps="relayData.mapPool.value.poolWarmupMapsGroup3"
    />
  </div>
</template>

<style scoped>
.warmups-pool-view {
}
</style>

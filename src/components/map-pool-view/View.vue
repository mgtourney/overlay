<script setup lang="ts">
import RelayConnection from "../../helpers/RelayConnection";

const props = defineProps<{
  relayConnection: RelayConnection;
}>();

const relayData = props.relayConnection.getData();
</script>

<template>
  <div class="map-pool-view-root"></div>
</template>

<style scoped>
.map-pool-view-root {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
</style>

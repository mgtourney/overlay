<script setup lang="ts">
import RelayConnection from "../../helpers/RelayConnection";
import MPVMap from "./Map.vue";

const props = defineProps<{
  relayConnection: RelayConnection;
}>();

const relayData = props.relayConnection.getData();
</script>

<template>
  <div class="map-pool-view-root">
    <div>
      <div class="mpv-header primary">{{ relayData.mapPool.value.poolName }}</div>
      <div class="mpv-body grid">
        <div class="mpv-title primary">Balanced</div>
        <div class="mpv-title primary">Tech</div>
        <div class="mpv-title primary">Speed</div>
        <MPVMap
          v-for="map in relayData.mapPool.value.poolMapsGroup1"
          :map="map"
          :key="map.hash"
          :relayConnection="relayConnection"
        />
        <MPVMap
          v-for="map in relayData.mapPool.value.poolMapsGroup2"
          :map="map"
          :key="map.hash"
          :relayConnection="relayConnection"
        />
        <MPVMap
          v-for="map in relayData.mapPool.value.poolMapsGroup3"
          :map="map"
          :key="map.hash"
          :relayConnection="relayConnection"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.map-pool-view-root {
  display: flex;
  flex-direction: column;
  height: 100vh;
  text-transform: uppercase;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 4rem 4rem;
  padding: 1rem;
}

.mpv-title,
.mpv-header {
  text-align: center;
}

.mpv-header {
  margin-bottom: 2rem;
}

.map-pool-view-root {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
}

.mpv-title {
  line-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>

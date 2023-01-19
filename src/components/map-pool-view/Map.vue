<script setup lang="ts">
import { computed } from 'vue'
import RelayConnection from '@RelayCon';
import { PoolMap } from '@GenTypes';

const props = defineProps<{
  relayConnection: RelayConnection;
  map: PoolMap;
}>();

const { mapPool } = props.relayConnection.getData();
const mapImage = computed(() => `https://eu.cdn.beatsaver.com/${props.map.hash.toLowerCase()}.jpg`);
</script>

<template>
  <div class="mpv-map">
    <img :src="mapImage" />
    <div class="flex">
      <div class="mapname">{{ map.name }}</div>
      <div class="mapdiff">Expert+</div>
      <div class="mapper">By Slimyblob</div>
    </div>
  </div>
</template>

<style scoped>
.mpv-map {
  display: flex;
  width: 25vw;
  height: 8rem;
  gap: 2rem;
}

.mapname {
  font-size: 2rem;
  font-weight: bold;
  flex: 3;
  overflow: hidden;
  display: block;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
}

.mapdiff {
  font-size: 1.25rem;
  font-weight: bold;
  color: #999;
  flex: 1;
}

.mapper {
  color: #999;
  flex: 1;
}

.flex {
  display: flex;
  flex-direction: column;
  width: calc(100% - 11rem);
}

</style>

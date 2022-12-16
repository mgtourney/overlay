<script setup lang="ts">
import PlayersInfoEdit from "./PlayersInfoEdit.vue";
import WarmupsPoolEdit from "./WarmupsPoolEdit.vue";
import MapPoolEdit from "./MapPoolEdit.vue";
import PlayerMapEdit from "./PlayerMapEdit.vue";
import { ViewType } from "../../types/general";
import { computed } from "vue";
import RelayConnection from "../../helpers/RelayConnection";

const props = defineProps<{
  selected: ViewType
  relayConnection: RelayConnection
}>();

const relayData = props.relayConnection.getData();
const canSwitch = computed(() => {
  switch(props.selected) {
    case "player-info-view": return relayData.lpid.value && relayData.rpid.value;
    case "warmups-pool-view": return true;
    case "map-pool-view": return true;
    case "player-map-view": return true;
  }
  return false;
});
const canSwitchMessage = computed(() => {
  switch(props.selected) {
    case "player-info-view": return "Players need to join the game first";
    case "warmups-pool-view": return "";
    case "map-pool-view": return "";
    case "player-map-view": return "";
  }
  return "";
});

defineExpose({
  canSwitch,
})

</script>

<template>
  <div v-if="canSwitch">
    <PlayersInfoEdit v-if="selected === 'player-info-view'" />
    <WarmupsPoolEdit v-if="selected === 'warmups-pool-view'" />
    <MapPoolEdit v-if="selected === 'map-pool-view'" />
    <PlayerMapEdit v-if="selected === 'player-map-view'" />
  </div>
  <div v-else class="can-switch-message">
    {{ canSwitchMessage }}
  </div>
</template>

<style scoped>
.can-switch-message {
  margin-top: 5rem;
}
</style>

<script setup lang="ts">
import { computed } from "vue";
import RelayConnection from "@RelayCon";
import { ViewType } from "@GenTypes";
import PlayersInfoEdit from "./PlayersInfoEdit.vue";
import InMapEdit from "./InMapEdit.vue";
import StartingEndingEdit from "./StartingEndingEdit.vue";
import WarmupsPoolEdit from "./WarmupsPoolEdit.vue";
import MapPoolEdit from "./MapPoolEdit.vue";
import PlayerMapEdit from "./PlayerMapEdit.vue";

const props = defineProps<{
  selected: ViewType
  relayConnection: RelayConnection
}>();

const relayData = props.relayConnection.getData();
const canSwitch = computed(() => {
  switch(props.selected) {
    case "player-info-view": return relayData.lpid.value && relayData.rpid.value;
    // case "player-info-view": return true; /* Temp toggle for allowing switching - I left it here, because I'm too lazy to write it every time - Hawk ^^ */
    case "warmups-pool-view": return true;
    case "map-pool-view": return true;
    case "player-map-view": return true;
    case "in-map-view": return true;
    case "starting-view": return true;
    case "ending-view": return true;
  }
  return false;
});
const canSwitchMessage = computed(() => {
  switch(props.selected) {
    case "player-info-view": return "";
    case "warmups-pool-view": return "";
    case "map-pool-view": return "";
    case "player-map-view": return "";
    case "in-map-view": return "";
    case "starting-view": return "";
    case "ending-view": return "";
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
    <InMapEdit v-if="selected === 'in-map-view'" />
    <StartingEndingEdit v-if="selected === 'starting-view'" />
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

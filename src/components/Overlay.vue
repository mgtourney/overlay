<script setup lang="ts">
import RelayConnection from "@RelayCon";
import ViewSelector from "./ViewSelector.vue";

const relayConnection = new RelayConnection();
const relayData = relayConnection.getData();
</script>

<template>
  <ViewSelector :relayConnection="relayConnection" :view="relayData.viewMode.value" />
</template>

<style scoped></style>

<script setup lang="ts">
import { computed } from "vue";
import RelayConnection from "../helpers/RelayConnection";
import ViewSelector from "./ViewSelector.vue";

const relayConnection = new RelayConnection();
const relayData = relayConnection.getData();
</script>

<template>
  <ViewSelector :relayConnection="relayConnection" :view="relayData.viewMode.value" />
</template>

<style scoped></style>

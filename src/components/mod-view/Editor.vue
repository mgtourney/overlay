<script setup lang="ts">

import { ModEditorConfig } from "@GenTypes"

const props = defineProps<{
  config: ModEditorConfig[],
}>();

</script>

<template>
  <div class="warumup-pool-edit">
    <div v-for="config in props.config" :key="config.elementId">
      
    </div>
  </div>
</template>

<style scoped>

</style>

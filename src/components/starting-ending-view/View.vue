<script setup lang="ts">
const props = defineProps<{
  starting: boolean,
}>();
</script>

<template>
  <div class="starting-ending-view">
    {{ starting ? "Starting" : "Ending" }}
  </div>
</template>

<style scoped>
.starting-ending-view {
  font-size: 4rem;
}
</style>

<script setup lang="ts">
import { ref } from 'vue'


</script>

<template>
	<div class="main">
		<div class="main-left"></div>
		<div class="main-right"></div>
	</div>
</template>

<style scoped>
.main {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex: 1;
  display: flex;
  justify-content: space-between;
}

.main-left,
.main-right {
  flex: 1;
  aspect-ratio: 16 / 9;
  outline: 6px solid var(--border);
  transform: translate(2rem);
  border-radius: 2rem;
  background: #1d1d1d88;
}

.main-left {
  transform: translate(-2rem);
}
</style>

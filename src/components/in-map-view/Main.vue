<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  leftTwitch: string
  rightTwitch: string
}>()

const leftSource = computed(() => `https://player.twitch.tv/?channel=${props.leftTwitch}&height=1080&parent=127.0.0.1:5173&scrolling&width=1920`);
const rightSource = computed(() => `https://player.twitch.tv/?channel=${props.rightTwitch}&height=1080&parent=127.0.0.1:5173&scrolling&width=1920`);

</script>

<template>
	<div class="main">
		<div class="main-left">
      <iframe :src="leftSource" frameborder="0" :invisible="!props.leftTwitch"></iframe>
    </div>
		<div class="main-right">
      <iframe :src="rightSource" frameborder="0" :invisible="!props.rightTwitch"></iframe>
    </div>
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

iframe {
  width: 100%;
  height: 100%;
}
</style>

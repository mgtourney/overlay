<script setup lang="ts">
import { ref, computed } from 'vue'
import Overlay from './components/Overlay.vue'
import Login from './components/Login.vue'
import ModView from './components/ModView.vue'

const routes = {
  '': Overlay,
  login: Login,
  modview: ModView,
}
const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const currentView = computed(() => routes[currentPath.value.slice(1) || ''])
</script>

<template>
  <component :is="currentView" />
</template>

<style scoped></style>

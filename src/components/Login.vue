<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue'
const { loginWithRedirect } = useAuth0()
</script>

<template>
  <div class="root">
    <button @click="() => loginWithRedirect()">Log in</button>
  </div>
</template>

<style scoped>

.root {
  width: 100vw;
  height: 100vh;
  background-color: #2e2f30;
}

button {
  display: block;
  width: 8rem;
  height: 3rem;
  margin-top: 1rem;
  background-color: #008b8b;
  color: white;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 2rem;
}
</style>

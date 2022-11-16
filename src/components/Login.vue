<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue';
const { loginWithRedirect } = useAuth0();

</script>

<template>
    <button @click="() => loginWithRedirect()">Log in</button>
</template>

<style scoped>


</style>

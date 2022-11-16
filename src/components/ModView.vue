<script setup lang="ts">
import Login from './Login.vue';
import { useAuth0 } from "@auth0/auth0-vue";
const { user, isAuthenticated } = useAuth0();

/**
 * For some reason, the url hash gets lost when the user is redirected back to the app after logging in.
 */
setTimeout(() => {
    window.location.hash = '#modview';
}, 1000);
</script>

<template>
    <div v-if="isAuthenticated">
        <h1>Logged in as {{ user.name }}</h1>
        

    </div>
    <Login v-else />
</template>

<style scoped>
* {
  color: black;
}
</style>

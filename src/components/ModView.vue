<script setup lang="ts">
import Login from './Login.vue';
import { useAuth0 } from "@auth0/auth0-vue";
import { ref } from 'vue';
const { user, isAuthenticated } = useAuth0();

const relaySocket = new WebSocket("ws://localhost:2223");
relaySocket.onopen = () => {
    console.log("Relay connected");
    updateLead(0, 0);
};

let left = ref(0);
let right = ref(0);

function updateLead(l: number, r: number) {
    left.value = l;
    right.value = r;

    relaySocket.send(JSON.stringify({
        command: "update-lead",
        leftLead: left.value,
        rightLead: right.value,
    }));
}

/**
 * For some reason, the url hash gets lost when the user is redirected back to the app after logging in.
 */
setTimeout(() => {
    window.location.hash = '#modview';
}, 1000);
</script>

<template>
    <div class="modroot" v-if="isAuthenticated">
        <h1>Logged in as {{ user.name }}</h1>
        <div class="lead-buttons">
            <div>
                <button @click="updateLead(left + 1, right)">+</button>
                <h1>{{ left }}</h1>
                <button @click="updateLead(left - 1, right)">-</button>
            </div>
            <div>
                <button @click="updateLead(left, right + 1)">+</button>
                <h1>{{ right }}</h1>
                <button @click="updateLead(left, right - 1)">-</button>
            </div>
        </div>
    </div>
    <Login v-else />
</template>

<style scoped>
* {
  color: black;
}

.modroot {
    width: 50%;
    margin: 0 auto;
    text-align: center;
}

.lead-buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
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

button:hover {
    background-color: #00a1a1;
}

</style>

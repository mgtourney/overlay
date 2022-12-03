<script setup lang="ts">
import Login from "./Login.vue";
import { useAuth0 } from "@auth0/auth0-vue";
import { ref } from "vue";
const { user, isAuthenticated } = useAuth0();

const relaySocket = new WebSocket("ws://localhost:2223");
relaySocket.onopen = () => {
  console.log("Relay connected");
  updateLead(0, 0);
};

const left = ref(0);
const right = ref(0);
const lefttwitch = ref("");
const righttwitch = ref("");

function updateLead(l: number, r: number) {
  left.value = l;
  right.value = r;

  relaySocket.send(
    JSON.stringify({
      command: "update-lead",
      leftLead: left.value,
      rightLead: right.value,
    })
  );
}

function updateTwitch() {
  relaySocket.send(
    JSON.stringify({
      command: "update-twitch",
      leftTwitch: lefttwitch.value,
      rightTwitch: righttwitch.value,
    })
  );
}

/**
 * For some reason, the url hash gets lost when the user is redirected back to the app after logging in.
 */
setTimeout(() => {
  window.location.hash = "#modview";
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
        <input
          class="ut-input"
          type="text"
          v-model="lefttwitch"
          placeholder="checksum__"
        />
        <button class="ut-button" @click="updateTwitch()">Update Twitch</button>
      </div>
      <div>
        <button @click="updateLead(left, right + 1)">+</button>
        <h1>{{ right }}</h1>
        <button @click="updateLead(left, right - 1)">-</button>
        <input
          class="ut-input"
          type="text"
          v-model="righttwitch"
          placeholder="goosychan"
        />
        <button class="ut-button" @click="updateTwitch()">Update Twitch</button>
      </div>
    </div>
  </div>
  <Login v-else />
</template>

<style scoped>
* {
  color: black;
  box-sizing: border-box;
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

.ut-input {
  margin-top: 5rem;
  width: 8rem;
  height: 1.5rem;
  font-size: 1rem;
  outline: none;
  border: 2px solid #008b8b;
  padding: 1rem 0.8rem;
  color: #008b8bbd;
}

.ut-button {
  font-size: 1rem;
}

input::placeholder {
  color: #999;
}
</style>

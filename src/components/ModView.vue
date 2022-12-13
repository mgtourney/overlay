<script setup lang="ts">
import Login from "./Login.vue";
import { useAuth0 } from "@auth0/auth0-vue";
import { ref } from "vue";
import RelayConnection from "../helpers/RelayConnection";
import ViewSelector from "./ViewSelector.vue";
import { ViewType } from "../types/general";

const { user, isAuthenticated } = useAuth0();

const relayConnection = new RelayConnection();
const relayData = relayConnection.getData();

/*
const left = ref(0);
const right = ref(0);

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
}*/

/**
 * For some reason, the url hash gets lost when the user is redirected back to the app after logging in.
 */
setTimeout(() => window.location.hash = "#modview", 1000);


const TRANSITIONS: Record<ViewType, ViewType[]> = {
  "player-info-view": ["map-pool-view", "warmups-pool-view"],
  "warmups-pool-view": ["player-info-view", "warmups-pool-view", "player-map-view"],
  "map-pool-view": ["warmups-pool-view", "player-map-view", "player-info-view"],
  "player-map-view": ["in-map-view", "map-pool-view", "warmups-pool-view"],
  "in-map-view": ["map-pool-view", "player-map-view"],
};
const VIEW_TYPE_TITLES = {
  "player-info-view": "Players Info",
  "warmups-pool-view": "Warmup Pool",
  "map-pool-view": "Map Pool",
  "player-map-view": "Players & Map Info",
  "in-map-view": "1v1 Stream",
}
const currentView = ref<ViewType>("player-map-view");
const selectedView = ref<ViewType>("in-map-view");



</script>

<template>
  <div class="modroot" v-if="isAuthenticated">
    <section>
      <div class="view-selector-wrapper">
        <div class="view-selector">
          <div class="last-view">
            <div class="view">
              <ViewSelector :relayConnection="relayConnection" :view="'map-pool-view'" />
            </div>
          </div>
          <div class="current-view">
            <div class="view">
              <ViewSelector :relayConnection="relayConnection" :view="'player-map-view'" />
            </div>
          </div>
          <div class="next-views">
            <div class="view">
              <ViewSelector :relayConnection="relayConnection" :view="'map-pool-view'" />
            </div>
            <div class="view">
              <ViewSelector :relayConnection="relayConnection" :view="'in-map-view'" />
            </div>
            <div class="view">
              <ViewSelector :relayConnection="relayConnection" :view="'warmups-pool-view'" />
            </div>
          </div>
        </div>
      </div>
      <div class="config-wrapper">
        <div class="edit-config" v-if="selectedView === currentView">
          <h1>Edit</h1>
          <h2>{{ VIEW_TYPE_TITLES[currentView] }}</h2>
          <div>
          
          </div>
        </div>
        <div class="switch-config" v-else>
          <h1>Switch To</h1>
          <h2>{{ VIEW_TYPE_TITLES[selectedView] }}</h2>
          <div>
          
          </div>
          <button>Switch</button>
        </div>
      </div>
    </section>
    <section>
      <iframe src="http://127.0.0.1:5173/" frameborder="0"></iframe>
    </section>
  </div>
  <Login v-else />
</template>

<style scoped>
* {
  color: white;
}

.modroot {
  background-color: #2e2f30;
  width: 100vw;
  height: 100vh;
  text-align: center;
  display: flex;
  text-transform: uppercase;
}

.view {
  position: absolute;
  width: 100vw;
  height: calc(100vw / 1.7778);
  scale: 0.15;
  overflow: hidden;
  user-select: none;
}

.last-view .view:hover,
.next-views .view:hover {
  scale: 0.16;
  cursor: pointer;
  filter: drop-shadow(0px 0px 1rem rgba(132, 188, 255, 0.25));
}

button {
  background-color: transparent;
  border: 1px solid #4D555F;
  padding: 1rem 2rem;
  cursor: pointer;
  text-transform: uppercase;
  font-size: large;
}

button:hover {
  background-color: #393b3c;
}

.last-view .view,
.current-view .view {
  right: -50%;
}

.next-views .view:nth-child(1) {
  scale: 0.12;
  right: -80%;
}

.next-views .view:nth-child(2) {
  scale: 0.12;
  right: -50%;
}

.next-views .view:nth-child(3) {
  scale: 0.12;
  right: -20%;
}

.next-views .view:hover {
  scale: 0.13;
}

.view {
  transition: scale 0.1s ease-in-out;
  top: -150%;
  border: 3px solid #4D555F;
}

section {
  flex: 1;
  justify-content: center;
  align-items: center;
}

.modroot > section:nth-child(1) {
  border-right: 1px solid #4D555F;
  flex: 1;
}

.config-wrapper {
  border-top: 1px solid #4D555F;
}

.config-wrapper h1,
.config-wrapper h2 {
}

.modroot > section:nth-child(2) {
  display: flex;
}

.view-selector-wrapper {
  width: 100%;
  height: 60%;
}

iframe {
  position: absolute;
  width: 100vw;
  height: calc(100vw / 1.7778);
  scale: 0.4;
  border: 3px solid #4D555F;
}

.view-selector {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.view-selector > * {
  flex: 1;
  width: 100%;
  position: relative;
}

</style>

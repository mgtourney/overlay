<script setup lang="ts">
import { ref } from "vue";
import RelayConnection from "@RelayCon";
import { ViewType, Countdown } from "@GenTypes";
import { useAuth0 } from "@auth0/auth0-vue";
import Login from "./Login.vue";
import ViewSelector from "./ViewSelector.vue";
import SwitchEdit from "./mod-view/SwitchEdit.vue";

const { user, isAuthenticated } = useAuth0();

const relayConnection = new RelayConnection();
const relayData = relayConnection.getData();
let timeoutId: any;

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
setTimeout(() => (window.location.hash = "#modview"), 1000);

const TRANSITIONS: Record<
  ViewType,
  {
    left?: ViewType;
    middle?: ViewType;
    right?: ViewType;
  }
> = {
  "starting-view": {
    left: undefined,
    middle: "player-info-view",
    right: "ending-view",
  },
  "player-info-view": {
    left: "map-pool-view",
    middle: "starting-view",
    right: "warmups-pool-view",
  },
  "warmups-pool-view": {
    left: "player-info-view",
    middle: "warmups-pool-view",
    right: "player-map-view",
  },
  "map-pool-view": {
    left: "warmups-pool-view",
    middle: "player-map-view",
    right: "player-info-view",
  },
  "player-map-view": {
    left: "map-pool-view",
    middle: "in-map-view",
    right: "warmups-pool-view",
  },
  "in-map-view": {
    left: "map-pool-view",
    middle: undefined,
    right: "player-map-view",
  },
  "ending-view": {
    left: undefined,
    middle: undefined,
    right: undefined,
  },
};
const VIEW_TYPE_TITLES: Record<ViewType, string> = {
  "starting-view": "Starting",
  "player-info-view": "Players Info",
  "warmups-pool-view": "Warmup Pool",
  "map-pool-view": "Map Pool",
  "player-map-view": "Players & Map Info",
  "in-map-view": "1v1 Stream",
  "ending-view": "Ending",
};

const countdownStarted = ref<Countdown>(false);
const lastView = ref<ViewType | undefined>(undefined);
const currentView = ref<ViewType>("starting-view");
const nextViews = ref<{
  left?: ViewType;
  middle?: ViewType;
  right?: ViewType;
}>(TRANSITIONS[currentView.value]);
const selectedView = ref<ViewType>(currentView.value);
const switchEditElement = ref<typeof SwitchEdit | null>(null);

function onSwitch() {
  lastView.value = currentView.value;
  currentView.value = selectedView.value;
  nextViews.value = TRANSITIONS[currentView.value];

  relayConnection.send({
    command: "view-update",
    viewMode: currentView.value,
  });
}
function startCountdown() {
  countdownStarted.value = !countdownStarted.value;
  relayConnection.send({
    command: "update-countdown",
    status: countdownStarted.value,
  });
}

function debounce(fn: any, delay: number) {
  return (...args: any) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn(...args);
    }, 250);
  }
}
function countdownChange() {
  const countdownInput = document.getElementById("countdownInput") as HTMLInputElement;
  console.log(countdownInput.value);
  relayConnection.send({
    command: "update-time-left",
    timeLeft: countdownInput.value,
  });
}
const debouncedCountdownChange = debounce(countdownChange, 1000);
</script>

<template>
  <div class="modroot" v-if="isAuthenticated">
    <section>
      <div class="view-selector-wrapper">
        <div class="view-selector">
          <div class="last-view">
            <div class="view middle-view" v-if="lastView != null" :selected="selectedView === lastView"
              @click="() => (selectedView = lastView as ViewType)">
              <ViewSelector :relayConnection="relayConnection" :view="(lastView as ViewType)" />
            </div>
          </div>
          <div class="current-view">
            <div class="view middle-view" :selected="selectedView === currentView"
              @click="() => (selectedView = currentView)">
              <ViewSelector :relayConnection="relayConnection" :view="currentView" />
            </div>
          </div>
          <div class="next-views">
            <div class="view left-view" v-if="nextViews.left" :selected="selectedView === nextViews.left"
              @click="() => (selectedView = nextViews.left as ViewType)">
              <ViewSelector :relayConnection="relayConnection" :view="(nextViews.left as ViewType)" />
            </div>
            <div class="view middle-view" v-if="nextViews.middle" :selected="selectedView === nextViews.middle"
              @click="() => (selectedView = nextViews.middle as ViewType)">
              <ViewSelector :relayConnection="relayConnection" :view="(nextViews.middle as ViewType)" />
            </div>
            <div class="view right-view" v-if="nextViews.right" :selected="selectedView === nextViews.right"
              @click="() => (selectedView = nextViews.right as ViewType)">
              <ViewSelector :relayConnection="relayConnection" :view="(nextViews.right as ViewType)" />
            </div>
          </div>
        </div>
      </div>
      <div class="config-wrapper">
        <div class="edit-config" v-if="selectedView === currentView">
          <h2>Edit</h2>
          <h1>{{ VIEW_TYPE_TITLES[currentView] }}</h1>
          <div>
            <div class="options" v-if="selectedView === 'starting-view'">
              <button @click="startCountdown()">Countdown: {{ countdownStarted? "Started": "Paused" }}</button>
              <div v-if="!countdownStarted" class="options">
                <label for="countdownInput" class="countdownInputLabel">Countdown Time in seconds</label>
                <input class="countdownInput" id="countdownInput" type="range" min="60" max="600"
                  placeholder="Seconds left" @input="debouncedCountdownChange"
                  oninput="this.nextElementSibling.value = this.value">
                <output for="countdownInput" id="countdownOutput">60</output>
              </div>
            </div>
          </div>
        </div>
        <div class="switch-config" v-else>
          <h2>Switch To</h2>
          <h1>{{ VIEW_TYPE_TITLES[selectedView] }}</h1>
          <div>
            <SwitchEdit :relayConnection="relayConnection" :selected="selectedView" ref="switchEditElement" />
          </div>
          <button @click="onSwitch" v-if="switchEditElement?.canSwitch">Switch</button>
        </div>
      </div>
    </section>
    <section>
      <iframe src="http://localhost:5173/" frameborder="0"></iframe>
    </section>
  </div>
  <Login v-else />
</template>

<style scoped>
* {
  color: white;
  box-sizing: border-box;
}

.options {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
}

.countdownInputLabel {
  margin-top: 25px;
  margin-bottom: 10px;
}

.countdownInput {
  color: black;
  margin-top: 5px;
  margin-bottom: 5px;
  text-transform: uppercase;
  text-align: center;
}

.modroot {
  background-color: #2e2f30;
  width: 100vw;
  height: 100vh;
  text-align: center;
  display: flex;
  text-transform: uppercase;
}

.view-selector-wrapper {
  width: 100%;
  height: 60%;
}

.view-selector {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 100%;
}

[disabled] {
  opacity: 0.5;
  pointer-events: none;
  cursor: not-allowed;
}

.view-selector>* {
  width: 100%;
  position: relative;
  flex: 0 0 calc(100vh * var(--scale));
}

.last-view,
.next-views {
  --scale: 0.12;
}

.current-view {
  --scale: 0.15;
}

.view {
  --aspect-ratio: 16 / 9;
  --scale: 0.12;
  position: absolute;
  height: 100vh;
  width: calc(100vh * var(--aspect-ratio));
  overflow: hidden;
  user-select: none;
  border: 4px solid #4d555f;
  transition: all 0.1s ease-in-out;
  scale: var(--scale);
  --start: calc(25vw / var(--scale));
  --view-translate: calc(var(--start) - 50%);
  transform: translate(var(--view-translate));
  transform-origin: top left;
  cursor: pointer;
}

.current-view .view {
  border-color: #760000;
  border-width: 2rem;
}

.view[selected="true"] {
  border-width: 2.5rem;
}

.current-view .view[selected="true"] {
  border-width: 3rem;
}

.left-view {
  --view-translate: calc(var(--start) - 175%);
}

.right-view {
  --view-translate: calc(var(--start) + 75%);
}

.current-view .view {
  --scale: 0.15;
}

.view:not(.current-view .view):hover {
  border: 2.5rem solid #4d555f;
}

button {
  background-color: transparent;
  border: 1px solid #4d555f;
  padding: 1rem 2rem;
  cursor: pointer;
  text-transform: uppercase;
  font-size: large;
  margin-top: 1.5rem;
}

button:hover {
  background-color: #393b3c;
}

section {
  flex: 1;
  justify-content: center;
  align-items: center;
}

.modroot>section:nth-child(1) {
  border-right: 1px solid #4d555f;
  flex: 1;
}

.config-wrapper {
  border-top: 1px solid #4d555f;
}

.config-wrapper h1 {
  font-size: 2rem;
  margin-top: 0.5rem;
}

.config-wrapper h2 {
  font-size: 1.5rem;
  color: #768ca6;
  margin-bottom: 0;
}

.modroot>section:nth-child(2) {
  display: flex;
}

iframe {
  --scale: calc(16 / 9);
  position: absolute;
  width: 100vw;
  height: calc(100vw / var(--scale));
  scale: 0.4;
  border: 3px solid #4d555f;
}
</style>

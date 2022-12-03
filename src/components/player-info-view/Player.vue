<script setup lang="ts">
import RelayConnection from "../../helpers/RelayConnection";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faGlobe, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { computed } from "vue";

library.add(faGlobe, faLocationDot);

const props = defineProps<{
  profilePic: string;
  seed: number;
  playerName: string;
  globalRank: number;
  localRank: number;
  direction: "left" | "right";
}>();

const flexDirection = computed(() =>
  props.direction === "left" ? "row" : "row-reverse"
);
const cssdirction = computed(() => (props.direction === "left" ? "ltr" : "rtl"));
</script>

<template>
  <div class="player-info" :style="{ flexDirection }">
    <div class="secondary seed">
      Seed <span>{{ seed }}</span>
    </div>
    <div class="player-image">
      <img :src="profilePic" />
    </div>
    <div class="grid infos">
      <div
        class="primary player-name"
        :style="{ textAlign: direction, direction: cssdirction }"
      >
        {{ playerName }}
      </div>
      <div
        class="secondary icon-rank"
        :style="{ justifyContent: direction, flexDirection }"
      >
        <div class="icon" :style="{ textAlign: direction }">
          <FontAwesomeIcon icon="fa-solid fa-globe" />
        </div>
        <div>{{ globalRank }}</div>
      </div>
      <div
        class="secondary icon-rank"
        :style="{ justifyContent: direction, flexDirection }"
      >
        <div class="icon" :style="{ textAlign: direction }">
          <FontAwesomeIcon icon="fa-solid fa-location-dot" />
        </div>
        <div>{{ localRank }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.player-info {
  flex: 0 0 33vw;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  height: calc(10rem + 12px);
  margin: auto;
}

.grid {
  display: grid;
  grid-gap: 0.7rem;
}

.infos {
  flex: 1;
}

.player-info > * {
  margin: auto;
}

.player-name {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.player-image > img {
  width: 10rem;
  height: 10rem;
  margin: 0 3rem;
}

.seed {
  flex: 0 0 8rem;
  text-transform: uppercase;
}

.icon-rank {
  display: flex;
}

.icon-rank .icon {
  flex: 0 0 3rem;
}
</style>

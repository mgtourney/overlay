<script setup lang="ts">
import InMapView from './in-map-view/View.vue'
</script>

<template>
  <div id="background">
    <video
      class="background play"
      muted
      autoplay
      loop
      onloadstart="this.playbackRate = 0.8"
    >
      <source src="../assets/videos/Ink2.mp4" type="video/mp4" />
    </video>
    <div class="blur"></div>
  </div>
  <InMapView />
</template>

<style scoped>
.background {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
  z-index: -1;
}

.blur {
  position: fixed;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
  background-color: #121f2588;
  z-index: -1;
  backdrop-filter: blur(8px);
}

.play {
  display: block;
}
</style>

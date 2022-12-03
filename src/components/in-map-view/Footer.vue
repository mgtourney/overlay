<script setup lang="ts">

// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGlobe, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faGlobe, faLocationDot)

const props = defineProps<{
  leftrank: number
  rightrank: number
  leftlocalrank: number
  rightlocalrank: number
  leftname: string
  rightname: string
  leftpicture: string
  rightpicture: string
  mapname: string
  mapdiffname: string
  leftCountry: string
  rightCountry: string
  leftPlayerShown: boolean
  rightPlayerShown: boolean
  leftCountryPath: string
  rightCountryPath: string
}>()

</script>

<template>
  <div class="footer">
    <div class="footer-left">
      <div class="grid" :invisible="!leftPlayerShown">
        <div class="ppic"><img :src="leftpicture" /></div>

        <div class="pflag primary"><img :src="leftCountryPath" /></div>
        <div class="pname primary">{{ leftname }}</div>

        <div class="prankicon secondary">
          <FontAwesomeIcon icon="fa-solid fa-globe" />
        </div>
        <div class="prank secondary">{{ leftrank }}</div>

        <div class="playerlocalrankicon secondary">
          <FontAwesomeIcon icon="fa-solid fa-location-dot" />
        </div>
        <div class="plocalrank secondary">{{ leftlocalrank }}</div>
      </div>
    </div>
    <div class="footer-right">
      <div class="grid" :invisible="!rightPlayerShown">
        <div class="pname primary">{{ rightname }}</div>
        <div class="pflag primary"><img :src="rightCountryPath" /></div>

        <div class="ppic"><img :src="rightpicture" /></div>

        <div class="prank secondary">{{ rightrank }}</div>
        <div class="prankicon secondary">
          <FontAwesomeIcon icon="fa-solid fa-globe" />
        </div>

        <div class="plocalrank secondary">{{ rightlocalrank }}</div>
        <div class="playerlocalrankicon secondary">
          <FontAwesomeIcon icon="fa-solid fa-location-dot" />
        </div>
      </div>
    </div>
    <div class="footer-map primary">
      <span>{{ mapname }}</span>
      <small class="secondary">{{ mapdiffname }}</small>
    </div>
  </div>
</template>

<style scoped>
.footer-map {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: 2rem;
  text-transform: uppercase;
}

.footer-map span {
  clear: both;
  display: inline-block;
  overflow: hidden;
  max-width: 40vw;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-right: 1rem;
}

.footer-map small {
  font-size: 1.25rem;
}

.footer-right .grid {
  display: grid;
  grid-template-columns: 15fr 3fr 5fr;
}

.footer-left .grid {
  display: grid;
  grid-template-columns: 5fr 3fr 15fr;
}

.footer-right .ppic {
  grid-row-start: 1;
  grid-row-end: 4;
  grid-column: 3;
}

.footer-left .ppic {
  grid-row-start: 1;
  grid-row-end: 4;
  grid-column: 1;
}

.footer {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 0 0 25vh;
  position: relative;
}

.footer-left,
.footer-right {
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
}

.footer-right .grid {
  margin-right: 4rem;
  text-align: right;
}

.footer-left .grid {
  margin-left: 4rem;
}

.prankicon,
.playerlocalrankicon {
  text-align: center;
}

.footer-right {
  flex-direction: row-reverse;
}

.ppic img {
  width: 12vh;
  height: 12vh;
  opacity: 0.75;
}

.footer-right .ppic img {
  margin-right: 1rem;
}

.footer-left .ppic img {
  margin-left: 1rem;
}

.pflag {
  display: flex;
}

.pflag > img {
  height: 2rem;
  width: 2rem;
  margin: 10px auto;
  display: inline;
  border: none;
  line-height: 3rem;
}

.pname {
  line-height: 3rem;
}
</style>

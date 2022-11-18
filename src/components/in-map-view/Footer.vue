<script setup lang="ts">
import { ref } from 'vue';

// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGlobe, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faGlobe, faLocationDot);

defineProps<{ 
  leftrank: number,
  rightrank: number,
  leftname: string,
  rightname: string,
  leftflag: string,
  rightflag: string,
  leftpicture: string,
  rightpicture: string
}>();


const leftDefaultProfilePicture = "https://cdn.scoresaber.com/avatars/76561198436848521.jpg";
const rightDefaultProfilePicture = "https://cdn.scoresaber.com/avatars/76561198347791418.jpg";

</script>

<template>
    <div class="footer">
        <div class="footer-left">
            <div class="grid">
                <div class="ppic"><img :src="leftpicture || leftDefaultProfilePicture" /></div>

                <div class="pflag primary"></div>
                <div class="pname primary">{{ leftname ?? "GoosyChan" }}</div>

                <div class="prankicon secondary"><FontAwesomeIcon icon="fa-solid fa-globe" /></div>
                <div class="prank secondary">{{ leftrank ?? 456 }}</div>

                <div class="playerlocalrankicon secondary"><FontAwesomeIcon icon="fa-solid fa-location-dot" /></div>
                <div class="plocalrank secondary">{{ 23 }}</div>
            </div>
        </div>
        <div class="footer-right">
            <div class="grid">
                <div class="pname primary">{{ rightname ?? "Checksum" }}</div>
                <div class="pflag primary"></div>

                <div class="ppic"><img :src="rightpicture || rightDefaultProfilePicture" /></div>

                <div class="prank secondary">{{ rightrank ?? 456 }}</div>
                <div class="prankicon secondary"><FontAwesomeIcon icon="fa-solid fa-globe" /></div>

                <div class="plocalrank secondary">{{ 23 }}</div>
                <div class="playerlocalrankicon secondary"><FontAwesomeIcon icon="fa-solid fa-location-dot" /></div>
            </div>
        </div>
    </div>
</template>

<style scoped>

.footer-right .grid {
    display: grid;
    grid-template-columns: 15fr 2fr 5fr;
}

.footer-left .grid {
    display: grid;
    grid-template-columns: 5fr 2fr 15fr;
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
    height: 15%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 0 0 20vh;
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
}

</style>

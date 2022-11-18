<script setup lang="ts">
import { ref, computed } from 'vue';

// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGlobe, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faGlobe, faLocationDot);

const props = defineProps<{ 
    leftrank: number,
    rightrank: number,
    leftlocalrank: number,
    rightlocalrank: number,
    leftname: string,
    rightname: string,
    leftpicture: string,
    rightpicture: string,
    mapname: string,
    mapdiffname: string,
    leftCountry: string,
    rightCountry: string,
}>();

const leftCountryPath = computed(() => props.leftCountry ? 
    `https://flagcdn.com/h40/${props.leftCountry.toLowerCase()}.png` : 
    `https://flagcdn.com/h40/de.png`
);
const rightCountryPath = computed(() => props.rightCountry ? 
    `https://flagcdn.com/h40/${props.rightCountry.toLowerCase()}.png` : 
    `https://flagcdn.com/h40/us.png`
);

const leftDefaultProfilePicture = "https://cdn.scoresaber.com/avatars/76561198436848521.jpg";
const rightDefaultProfilePicture = "https://cdn.scoresaber.com/avatars/76561198347791418.jpg";

</script>

<template>
    <div class="footer">
        <div class="footer-left">
            <div class="grid">
                <div class="ppic"><img :src="leftpicture || leftDefaultProfilePicture" /></div>

                <div class="pflag primary"><img :src="leftCountryPath" /></div>
                <div class="pname primary">{{ leftname ?? "GoosyChan" }}</div>

                <div class="prankicon secondary"><FontAwesomeIcon icon="fa-solid fa-globe" /></div>
                <div class="prank secondary">{{ leftrank ?? 456 }}</div>

                <div class="playerlocalrankicon secondary"><FontAwesomeIcon icon="fa-solid fa-location-dot" /></div>
                <div class="plocalrank secondary">{{ leftlocalrank ?? 23 }}</div>
            </div>
        </div>
        <div class="footer-right">
            <div class="grid">
                <div class="pname primary">{{ rightname ?? "Checksum" }}</div>
                <div class="pflag primary"><img :src="rightCountryPath" /></div>

                <div class="ppic"><img :src="rightpicture || rightDefaultProfilePicture" /></div>

                <div class="prank secondary">{{ rightrank ?? 456 }}</div>
                <div class="prankicon secondary"><FontAwesomeIcon icon="fa-solid fa-globe" /></div>

                <div class="plocalrank secondary">{{ rightlocalrank ?? 23 }}</div>
                <div class="playerlocalrankicon secondary"><FontAwesomeIcon icon="fa-solid fa-location-dot" /></div>
            </div>
        </div>
        <div class="footer-map primary">
            <span>{{ mapname ?? "Extra Credit on the Extratone Test! VICTORY ROYALE!!!"}}</span><small class="secondary">{{ mapdiffname ?? "Expert+" }}</small>
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
    height: 15%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 0 0 20vh;
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

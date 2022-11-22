<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import Header from './in-map-view/Header.vue';
import Main from './in-map-view/Main.vue';
import Footer from './in-map-view/Footer.vue';
import RelayConnection from '../helpers/RelayConnection';

const relayConnection = new RelayConnection();
const {
    lpid, rpid, leftmisses, rightmisses, leftscore, rightscore, leftaccuracy, rightaccuracy, leftlead, rightlead, 
    leftScoreShown, rightScoreShown, leftProfilePic, rightProfilePic, leftRank, rightRank, leftlocalrank, rightlocalrank,
    leftCountry, rightCountry, leftname, rightname, mapname, mapdiffname, leftPlayerShown, rightPlayerShown
} = relayConnection.getData();

</script>

<template>
    <div id="background">
        <video class="background play" muted autoplay loop onloadstart="this.playbackRate = 0.8">
            <source src="videos/Ink2.mp4" type="video/mp4" />
        </video>
        <div class="blur"></div>
    </div>
    <Header 
        :leftmisses="leftmisses"
        :rightmisses="rightmisses"
        :leftscore="leftscore"
        :rightscore="rightscore"
        :leftaccuracy="leftaccuracy"
        :rightaccuracy="rightaccuracy"
        :leftlead="leftlead"
        :rightlead="rightlead"
        :leftScoreShown="leftScoreShown"
        :rightScoreShown="rightScoreShown"
    />
    <Main />
    <Footer
        :leftrank="leftRank"
        :rightrank="rightRank"
        :leftlocalrank="leftlocalrank"
        :rightlocalrank="rightlocalrank"
        :leftname="leftname"
        :rightname="rightname"
        :leftpicture="leftProfilePic"
        :rightpicture="rightProfilePic"
        :leftCountry="leftCountry"
        :rightCountry="rightCountry"
        :mapname="mapname"
        :mapdiffname="mapdiffname"
        :leftPlayerShown="leftPlayerShown"
        :rightPlayerShown="rightPlayerShown"
    />
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

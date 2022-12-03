<script setup lang="ts">
import Header from './Header.vue'
import Main from './Main.vue'
import Footer from './Footer.vue'
import RelayConnection from '../../helpers/RelayConnection'

const relayConnection = new RelayConnection()
const relayData = relayConnection.getData()
</script>

<template>
  <Header
    :leftmisses="relayData.leftmisses.value"
    :rightmisses="relayData.rightmisses.value"
    :leftscore="relayData.leftscore.value"
    :rightscore="relayData.rightscore.value"
    :leftaccuracy="relayData.leftaccuracy.value"
    :rightaccuracy="relayData.rightaccuracy.value"
    :leftlead="relayData.leftlead.value"
    :rightlead="relayData.rightlead.value"
    :leftScoreShown="relayData.leftScoreShown.value"
    :rightScoreShown="relayData.rightScoreShown.value"
  />
  <Main :leftTwitch="relayData.leftTwitch.value" :rightTwitch="relayData.rightTwitch.value" />
  <Footer
    :leftrank="relayData.leftRank.value"
    :rightrank="relayData.rightRank.value"
    :leftlocalrank="relayData.leftlocalrank.value"
    :rightlocalrank="relayData.rightlocalrank.value"
    :leftname="relayData.leftname.value"
    :rightname="relayData.rightname.value"
    :leftpicture="relayData.leftProfilePic.value"
    :rightpicture="relayData.rightProfilePic.value"
    :leftCountry="relayData.leftCountry.value"
    :rightCountry="relayData.rightCountry.value"
    :mapname="relayData.mapname.value"
    :mapdiffname="relayData.mapdiffname.value"
    :leftPlayerShown="relayData.leftPlayerShown.value"
    :rightPlayerShown="relayData.rightPlayerShown.value"
  />
</template>

<style scoped></style>

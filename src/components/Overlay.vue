<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Header from './in-map-view/Header.vue';
import Main from './in-map-view/Main.vue';
import Footer from './in-map-view/Footer.vue';

const players = ref([] as any[]);
const matches = ref({});
const scores = ref({});
const scoresabers = ref({});

onMounted(() => {
    const relaySocket = new WebSocket("ws://localhost:2223");
    relaySocket.onmessage = message => {
        const data = JSON.parse(message.data);
        switch (data.Type) {
            case 0: return console.log("Relay connected to TA");
            case 1: return onHeartBeat(data);
            case 3: return onMatchUpdate(data);
            case 4: return onScoreUpdate(data);
            case 6: return onUsersUpdate(data);
            default:
                console.log("Unknown message", data);
                return;
        }
    };
    relaySocket.onopen = () => console.log("Connected to Relay");
});

function onHeartBeat(data) {
    console.log("Heartbeat");
    onUsersUpdate(data);
    onMatchUpdate(data);
}

function onMatchUpdate(ms) {
    console.log("Matches Update", matches);
    matches.value = ms.matches;
}

function onScoreUpdate(scs) {
    console.log("Scores Update", scs);
    scores.value[scs.user_id] = scs;
}

function onUsersUpdate(pls) {
    console.log("Players Update", pls);
    players.value = [...new Map(pls.players.map(item => [item["user_id"], item])).values()];
    updateScoresabers();
}

async function updateScoresabers() {
    for (const player of players.value) {
        if (scoresabers[player.user_id] == null) {
            const scoresaber = await getScoresaber(player.user_id);
            scoresabers[player.user_id] = scoresaber;
        }
    }
}

async function getScoresaber(playerId: string): Promise<any> {
    try {
        const response = await fetch(`https://scoresaber.com/api/player/${playerId}/full`);
        const result = await response.json();
        result.countryFlag = `https://flagcdn.com/h240/${result.country.toLowerCase()}.png`;
        return result;
    } catch (e) {
        console.error(e);
        new Promise((resolve) => setTimeout(resolve, 1000));
        return getScoresaber(playerId);
    }
}

const leftFlag = scoresabers[players[0]?.user_id]?.countryFlag;
const rightFlag = scoresabers[players[1]?.user_id]?.countryFlag;
const leftProfilePic = scoresabers[players[0]?.user_id]?.profilePicture;
const rightProfilePic = scoresabers[players[1]?.user_id]?.profilePicture;
const leftRank = scoresabers[players[0]?.user_id]?.rank;
const rightRank = scoresabers[players[1]?.user_id]?.rank;
</script>

<template>
    <div id="background">
        <video class="background play" muted autoplay loop onloadstart="this.playbackRate = 0.8">
            <source src="videos/Ink2.mp4" type="video/mp4" />
        </video>
        <div class="blur"></div>
    </div>
    <Header />
    <Main />
    <Footer
        :leftrank="leftRank"
        :rightrank="rightRank"
        :leftname="players?.[0]?.name"
        :rightname="players?.[1]?.name"
        :leftpicture="leftProfilePic"
        :rightpicture="rightProfilePic"
        :leftflag="leftFlag"
        :rightflag="rightFlag"
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
  background-color: #1d1d1d88;
  z-index: -1;
  backdrop-filter: blur(8px);
}

.play {
  display: block;
}

</style>

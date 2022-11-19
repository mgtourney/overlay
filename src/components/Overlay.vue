<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import Header from './in-map-view/Header.vue';
import Main from './in-map-view/Main.vue';
import Footer from './in-map-view/Footer.vue';

const players = ref([] as any[]);
const matches = ref({});
const scores = ref({});
const scoresabers = ref({});
const lead = ref({
    left: 0,
    right: 0,
});

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
        }

        switch (data.command) {
            case "update_lead":
                return lead.value = {
                    left: data.leftLead,
                    right: data.rightLead,
                };
        }
    };
    relaySocket.onopen = () => console.log("Relay connected");
});

function onHeartBeat(data) {
    //console.log("Heartbeat");
    onUsersUpdate(data, true);
    onMatchUpdate(data, true);
}

function onMatchUpdate(ms, heartbeat = false) {
    if (!heartbeat) console.log("Matches Update", ms);
    matches.value = ms.matches;
}

function onScoreUpdate(scs) {
    console.log("Scores Update", scs);
    scores.value[scs.user_id] = scs;
}

function onUsersUpdate(pls, heartbeat = false) {
    if (!heartbeat) console.log("Players Update", pls);
    players.value = [...new Map(pls.players.map(item => [item["user_id"], item])).values()];
    updateScoresabers();
}

async function updateScoresabers() {
    for (const player of players.value) {
        if (scoresabers.value[player.user_id] == null) {
            const scoresaber = await getScoresaber(player.user_id);
            scoresabers.value[player.user_id] = scoresaber;
        }
    }
}

async function getScoresaber(playerId: string): Promise<any> {
    try {
        const response = await fetch(`https://scoresaber.com/api/player/${playerId}/full`);
        return await response.json();
    } catch (e) {
        console.error(e);
        new Promise((resolve) => setTimeout(resolve, 1000));
        return getScoresaber(playerId);
    }
}

const lpid = computed(() => players.value[0]?.user_id);
const rpid = computed(() => players.value[1]?.user_id);
const leftProfilePic = computed(() => scoresabers.value[lpid.value]?.profilePicture ?? "https://randomuser.me/api/portraits/men/1.jpg");
const rightProfilePic = computed(() => scoresabers.value[rpid.value]?.profilePicture ?? "https://randomuser.me/api/portraits/women/1.jpg");
const leftRank = computed(() => scoresabers.value[lpid.value]?.rank ?? 0);
const rightRank = computed(() => scoresabers.value[rpid.value]?.rank ?? 0);
const leftlocalrank = computed(() => scoresabers.value[lpid.value]?.countryRank ?? 0);
const rightlocalrank = computed(() => scoresabers.value[rpid.value]?.countryRank ?? 0);
const leftCountry = computed(() => scoresabers.value[lpid.value]?.country?.toLowerCase?.() ?? "us");
const rightCountry = computed(() => scoresabers.value[rpid.value]?.country?.toLowerCase?.() ?? "us");
const leftname = computed(() => players.value?.[0]?.name ?? "Player 1");
const rightname = computed(() => players.value?.[1]?.name ?? "Player 2");
const mapname = computed(() => matches.value?.[0]?.selected_level?.name ?? "Map Name");
const mapdiffname = computed(() => matches.value?.[0]?.selected_difficulty ?? "Map Difficulty");

const leftmisses = computed(() => scores.value[lpid.value]?.totalMisses ?? (players.value?.[0] ? 0 : "Waiting for player 1"));
const rightmisses = computed(() => scores.value[rpid.value]?.totalMisses ?? (players.value?.[1] ? 0 : "Waiting for player 2"));
const leftscore = computed(() => scores.value[lpid.value]?.score ?? 0);
const rightscore = computed(() => scores.value[rpid.value]?.score ?? 0);
const leftaccuracy = computed(() => scores.value[lpid.value]?.accuracy ?? "00.00");
const rightaccuracy = computed(() => scores.value[rpid.value]?.accuracy ?? "00.00");
const leftlead = computed(() => lead.value.left);
const rightlead = computed(() => lead.value.right);

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

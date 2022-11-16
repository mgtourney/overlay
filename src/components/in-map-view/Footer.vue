<script setup lang="ts">
import { ref } from 'vue'

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
            <div class="footer-left-image">
                <img :src="leftpicture || leftDefaultProfilePicture" />
            </div>
            <div class="footer-left-name">
                <div class="footer-left-name-text primary">{{ leftname ?? "Goosy" }}</div>
                <div class="footer-left-name-rank secondary"><small>#</small>{{ leftrank ?? 42 }}</div>
            </div>
        </div>
        <div class="footer-right">
            <div class="footer-right-image">
                <img :src="rightpicture || rightDefaultProfilePicture" />
            </div>
            <div class="footer-right-name">
                <div class="footer-right-name-text primary">{{ rightname ?? "Checksum" }}</div>
                <div class="footer-right-name-rank secondary"><small>#</small>{{ rightrank ?? 69 }}</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
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
    display: flex;
}

.footer-right-image {
    margin-right: 4rem;
}

.footer-left-image {
    margin-left: 4rem;
}

.footer-right {
  flex-direction: row-reverse;
}

.footer-left-image img,
.footer-right-image img {
  width: 12vh;
  height: 12vh;
}

.footer-right-name {
  text-align: right;
  margin: auto;
  margin-right: 2rem;
  height: fit-content;
}

.footer-left-name {
  margin: auto;
  margin-left: 2rem;
  height: fit-content;
}
</style>

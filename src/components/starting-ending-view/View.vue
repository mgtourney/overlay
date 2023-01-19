<script setup lang="ts">
import { onMounted, ref, Ref, watch, computed } from 'vue'
import RelayConnection from '@RelayCon'

const props = defineProps<{
  starting: boolean,
  relayConnection: RelayConnection;
}>();

const relayData = props.relayConnection.getData();
const relayDataCountingValue = ref(relayData.counting.value)
let timer: any;
const timeLeft: Ref<number> = ref(relayData.timeLeft.value)

const formattedTimeLeft = computed(() => {
  const minutes = Math.floor(timeLeft.value / 60)
  const seconds = timeLeft.value % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
})

onMounted(() => {
  timeLeft.value = relayData.timeLeft.value;
  setInterval(() => {
    relayDataCountingValue.value = relayData.counting.value
  }, 1000)
})

watch(() => relayData.timeLeft.value, (newVal) => {
  timeLeft.value = newVal
})

watch(() => relayDataCountingValue.value, (newVal) => {
  if (newVal === true) {
    startTimer()
  } else {
    pauseTimer()
  }
})

function startTimer() {
  timer = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--
    } else {
      clearInterval(timer)
    }
  }, 1000)
}

function pauseTimer() {
  clearInterval(timer)
}
</script>

<template>
  <div class="starting-ending-view">
    {{ starting? "Stream starting": "Ending" }}
    <div class="countdown" v-if="starting">
      <div class="counter">{{formattedTimeLeft }}</div>
    </div>
    <div class="countdown" v-else>
      <div class="">Thanks for watching!</div>
  </div>
  </div> 
</template>

<style scoped>
.starting-ending-view {
  font-size: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  text-transform: uppercase;
}

.counter { 
  text-align: center;
  font-size: 8rem;
  min-width: 250px;
  font-family: Heebo, monospace;
}
</style>

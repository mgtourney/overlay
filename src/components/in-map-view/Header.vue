<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  leftmisses: number
  rightmisses: number
  leftscore: number
  rightscore: number
  leftaccuracy: number
  rightaccuracy: number
  leftlead: number
  rightlead: number
}>()

const leftscoreformatted = computed(() =>
  props.leftscore?.toLocaleString?.()?.replace?.(/,/g, ' '),
)
const rightscoreformatted = computed(() =>
  props.rightscore?.toLocaleString?.()?.replace?.(/,/g, ' '),
)
</script>

<template>
  <div class="header">
    <div class="header-left">
      <div class="lead">
        <div :active="leftlead >= 3"></div>
        <div :active="leftlead >= 2"></div>
        <div :active="leftlead >= 1"></div>
      </div>
      <div class="misses">
        <div class="misses-count primary-huge">{{ leftmisses ?? 0 }}</div>
        <div class="misses-text secondary">MISSES</div>
      </div>
      <div class="scores">
        <div class="acc primary-huge">{{ leftaccuracy ?? '00.00' }}</div>
        <div class="score secondary">{{ leftscoreformatted ?? '0' }}</div>
      </div>
    </div>
    <div class="header-right">
      <div class="scores">
        <div class="acc primary-huge">{{ rightaccuracy ?? '00.00' }}</div>
        <div class="score secondary">{{ rightscoreformatted ?? '0' }}</div>
      </div>
      <div class="misses">
        <div class="misses-count primary-huge">{{ rightmisses ?? 0 }}</div>
        <div class="misses-text secondary">MISSES</div>
      </div>
      <div class="lead">
        <div :active="rightlead >= 3"></div>
        <div :active="rightlead >= 2"></div>
        <div :active="rightlead >= 1"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  width: 100%;
  gap: 4rem;
  flex: 0 0 20vh;
}

.header-left,
.header-right {
  position: relative;
  display: flex;
  height: 100%;
  flex: 1;
  justify-content: space-between;
}

.lead {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 8rem;
  height: 60%;
  gap: 1rem;
  align-self: center;
}

.lead div {
  width: 0.75rem;
  flex: 1;
  border-radius: 0.5rem;
  background-color: var(--border);
}

.lead div[active='true'] {
  background-color: var(--white);
}

.scores {
  flex: 1;
}

.misses,
.scores {
  align-self: center;
}

.misses-text,
.score {
  margin-top: 1rem;
}

.header-left .scores,
.header-right .misses {
  text-align: right;
}

.header-left::before,
.header-right::before {
  position: absolute;
  content: '';
  display: block;
  width: 100%;
  height: 0.5rem;
  background: var(--border);
  backdrop-filter: blur(20px);
}

.header-left::after,
.header-right::after {
  position: absolute;
  content: '';
  display: block;
  width: 0%;
  height: 0.5rem;
  background: var(--white);
}

.header-left::after {
  right: 0;
}
</style>

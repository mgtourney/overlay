<script setup lang="ts">
import { ref } from 'vue'


</script>

<template>
    <div class="header">
        <div class="header-left">
            <div class="misses">
                <div class="misses-count primary-huge">0</div>
                <div class="misses-text secondary">MISSES</div>
            </div>
            <div class="scores">
                <div class="acc primary-huge">96.67%</div>
                <div class="score secondary">2 571 602</div>
            </div>
        </div>
        <div class="header-right">
            <div class="scores">
                <div class="acc primary-huge">93.50%</div>
                <div class="score secondary">2 305 643</div>
            </div>
            <div class="misses">
                <div class="misses-count primary-huge">3</div>
                <div class="misses-text secondary">MISSES</div>
            </div>
        </div>
    </div>
</template>

<style scoped>


.header {
    display: flex;
    width: 100%;
    gap: 4rem;
}

.header-left,
.header-right {
    position: relative;
    display: flex;
    height: 100%;
    flex: 1;
    justify-content: space-between;
}

.misses,
.scores {
    margin-top: 2rem;
    margin-bottom: 2rem;
}

.header-left .misses {
    margin-left: 4rem;
}

.header-right .misses {
    margin-right: 4rem;
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

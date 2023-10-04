<script setup>
import {ref} from 'vue'
import 'lazysizes'
import Carousel from '@/components/Carousel.vue'
</script>

<template>
    <div class="grid">
    <div v-for="n in 1000" :key="n" class="gridItems">
    <img :data-src="'https://picsum.photos/1024/600?random='+n" class="lazyload"/>
    </div>
    </div>
</template>

<style scoped>
.grid {
    display: grid;
    grid-template-columns: repeat(4,minmax(100px,1fr));
    grid-auto-rows:max-content;
    grid-auto-flow: dense;
    gap: 10px;
}
.gridItem{
    width: auto;
}
.gridItem img {
    width: 100%;
    height: 100%;
    min-height: 180px;
    object-fit: cover;
    background-color: rgba(0,0,0,.375);
    cursor: pointer;
}
</style>
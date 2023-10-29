<template>
    <Swiper :slides-per-view="1" :space-between="50" :modules="[Navigation, Pagination, Ally, Lazy]" navigation
    :pagination="{clickable: true, dynamicBullets: true}" grap-cursor :preload-images="false" lazy>
    <SwiperSlide v-for="n in 1000" :key="n" class="customSlide">
    <img :data-src="'https://picsum.photos/1024/600?random='+n" class="swiper-lazy"/>
    <div class="swiper-lazy-preloader"></div>
    </SwiperSlide>
    </Swiper>
</template>

<script setup>
import {Navigation, Pagination, Ally, Lazy} from 'swiper'
import {Swiper, SwiperSlide} from 'swiper/vue'

import 'swiper/css'
import 'swiper/css/bundle'
</script>

<style scoped>
.customSlide {
    display: grid;
    place-items: center;
    height: 100vh;
}
</style>
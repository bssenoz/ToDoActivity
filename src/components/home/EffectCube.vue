<template>
  <swiper
    :effect="'cube'"
    :grabCursor="true"
    :cubeEffect="{
      shadow: true,
      slideShadows: true,
      shadowOffset: 20,
      shadowScale: 0.94,
    }"
    :pagination="true"
    :modules="modules"
    class="mySwiper"
  >
    <swiper-slide>
      <img src="https://www.yasantipsikoloji.com/upload/images/sayfalar/2020/nasil-hobi-edinebilirim-hobi-edinmek-icin-7-ipucu-43952-9245552315.jpg" />
    </swiper-slide>
    <swiper-slide>
      <img src="https://pasajblog.turkcell.com.tr/wp-content/uploads/2021/11/IB_API_P_1208201_19222829-e6bf-4025-836e-d2c3cfe0fa0a.jpg" />
    </swiper-slide>
    <swiper-slide>
      <img src="https://bloglabs.net/storage/2022/05/sakinlestirici-hobi-tavsiyeleri-bloglabs-net.jpg" />
    </swiper-slide>
    <swiper-slide>
      <img src="https://h4y7j9p5.rocketcdn.me/wp-content/uploads/2022/04/tas-boyama-nasil-yapilir.jpg" />
    </swiper-slide>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';
import { EffectCube, Pagination } from 'swiper/modules';

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [EffectCube, Pagination],
    };
  },
};
</script>

<style scoped>
.swiper {
  width: 300px;
  height: 200px;
}

.swiper-slide {
  background-position: center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
}
</style>

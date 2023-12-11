<template>
  <swiper
    :effect="'flip'"
    :grabCursor="true"
    :navigation="true"
    :modules="modules"
    :initialSlide="initialSlide"
    class="mySwiper"
    @swiper="onSwiper"
  >
    <swiper-slide v-for="(image, index) in images" :key="index">
      <v-img
        :src="'data:' + image.contentType + ';base64,' + image.imageData"
        aspect-ratio="1"
        contain
      ></v-img>
    </swiper-slide>
  </swiper>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/effect-flip';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { EffectFlip, Pagination, Navigation } from 'swiper/modules';

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    selectedImage: Object,
    initialSlide: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const modules = ref([EffectFlip, Pagination, Navigation]);
    const images = ref([]);
    const token = localStorage.getItem("x-access-token");
    const swiperInstance = ref(null);

    const fetchData = async () => {
      try {
        const response = await axios.get('/api/Image/GetUserAllImages', {
          headers: {
            'Authorization': `Bearer ${token}`
          },
        });
        images.value = response.data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const initializeSlider = async () => {
      console.log("init: ",props.initialSlide)
      await fetchData();
      if (swiperInstance.value) {
        swiperInstance.value.slideTo(props.initialSlide); 
      }
    };

    const onSwiper = (swiper) => {
      swiperInstance.value = swiper;
      initializeSlider();
    };

    return {
      modules,
      images,
      swiperInstance,
      onSwiper,
    };
  },
};
</script>

<style scoped>
.swiper {
  width: 700px;
  height: 600px;
}

.swiper-slide {
  background-position: center;
  background-size: cover;
  width: 700px;
  height: 600px;
}

.swiper-slide img {
  display: block;
  width: 100%;
}

::v-deep(.swiper-button-next) {
  margin-right: -13rem;
}
::v-deep(.swiper-button-prev) {
  margin-left: -13rem;
}
</style>

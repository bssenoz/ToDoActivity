<template>
  <div>
    <swiper :navigation="true" :modules="modules" class="textSwiper" @slideChange="onFirstSliderChange">
      <swiper-slide v-for="(slide, index) in firstSliderData" :key="index">
        {{ slide.title }}
      </swiper-slide>
    </swiper>

    <swiper
      :effect="'coverflow'"
      :grabCursor="true"
      :centeredSlides="true"
      :slidesPerView="'auto'"
      :coverflowEffect="{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }"
      :pagination="true"
      :modules="modules"
      :initialSlide="1"
      class="imgSwiper"
      ref="imgSwiper"
    >
      <swiper-slide v-for="(slide, index) in secondSliderData.images" :key="index">
        <img :src="slide" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import { ref } from 'vue';

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const modules = [EffectCoverflow, Pagination, Navigation];

    const firstSliderData = [
      { title: 'Slide 1', images: ['https://swiperjs.com/demos/images/nature-1.jpg', 'https://swiperjs.com/demos/images/nature-4.jpg','https://swiperjs.com/demos/images/nature-6.jpg','https://swiperjs.com/demos/images/nature-2.jpg', 'https://swiperjs.com/demos/images/nature-3.jpg'] },
      { title: 'Slide 2', images: ['https://swiperjs.com/demos/images/nature-4.jpg', 'https://swiperjs.com/demos/images/nature-5.jpg', 'https://swiperjs.com/demos/images/nature-6.jpg','https://swiperjs.com/demos/images/nature-7.jpg', 'https://swiperjs.com/demos/images/nature-8.jpg'] },
      { title: 'Slide 3', images: ['https://swiperjs.com/demos/images/nature-7.jpg', 'https://swiperjs.com/demos/images/nature-1.jpg','https://swiperjs.com/demos/images/nature-8.jpg', 'https://swiperjs.com/demos/images/nature-1.jpg'] },
    ];

    const secondSliderData = ref(firstSliderData[0]);

    const onFirstSliderChange = (swiper) => {
      const index = swiper.activeIndex;
      if (index >= 0 && index < firstSliderData.length) {
        secondSliderData.value = firstSliderData[index];
        const imgSwiper = this.$refs.imgSwiper.swiper;
        imgSwiper.slideTo(index, 500, false);
      }
    };

    return {
      modules,
      firstSliderData,
      secondSliderData,
      onFirstSliderChange,
    };
  },
};
</script>

<style scoped lang="scss">
.textSwiper {
  .swiper {
    width: 100%;
  }

  .swiper-slide {
    width: 100px;
    text-align: center;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
  ::v-deep(.swiper-button-prev) {
    left: 30%;
  }
  ::v-deep(.swiper-button-next) {
    right: 30%;
  }
}

.imgSwiper {
  margin-top: 1.5rem;
  .swiper {
    width: 100%;
    padding-top: 50px;
    padding-bottom: 50px;
  }

  .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 300px;
    height: 300px;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
  }
}
</style>

<template>
    <swiper
      :effect="'cards'"
      :grabCursor="true"
      :modules="modules"
      class="mySwiper"
    >
    <swiper-slide v-for="(plan, index) in plans" :key="index">{{ plan.title }}</swiper-slide>
    </swiper>
  </template>


    <script>
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import 'swiper/css';
    import 'swiper/css/effect-cards';
    import { EffectCards } from 'swiper/modules';
    import axios from 'axios';
    import { ref, onMounted } from 'vue';

    export default {
      components: {
        Swiper,
        SwiperSlide,
      },
      setup() {

const plans = ref([]);

        const GetUserActivitiesNotDone = async () => {
      try {
        const token = localStorage.getItem("x-access-token");
   
        const response = await axios.get('/api/Activity/GetUserActivitiesNotDone', {
          headers: {
            'Authorization': `Bearer ${token}`         
          },
        });

        if (response.status === 200) {
          plans.value = response.data; 
          
        }
      } catch (error) {
        console.log(error);
      }
    };
    onMounted(() => {
      GetUserActivitiesNotDone()
    })

        return {
          GetUserActivitiesNotDone,
          modules: [EffectCards],
          plans
        };
      },
    };
  </script>

  <style scoped>
  .swiper {
  width: 240px;
  height: 320px;
}

.swiper-slide {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 18px;
  font-size: 22px;
  font-weight: bold;
  color: #fff;
}

.swiper-slide:nth-child(1n) {
  background-color: rgb(206, 17, 17);
}

.swiper-slide:nth-child(2n) {
  background-color: rgb(0, 140, 255);
}

.swiper-slide:nth-child(3n) {
  background-color: rgb(10, 184, 111);
}

.swiper-slide:nth-child(4n) {
  background-color: rgb(211, 122, 7);
}

.swiper-slide:nth-child(5n) {
  background-color: rgb(118, 163, 12);
}

.swiper-slide:nth-child(6n) {
  background-color: rgb(180, 10, 47);
}

.swiper-slide:nth-child(7n) {
  background-color: rgb(35, 99, 19);
}

.swiper-slide:nth-child(8n) {
  background-color: rgb(0, 68, 255);
}

.swiper-slide:nth-child(9n) {
  background-color: rgb(218, 12, 218);
}

.swiper-slide:nth-child(10n) {
  background-color: rgb(54, 94, 77);
}

  </style>
  
<template>
  <div>
    <SideBar />
    <v-container style="" >
      <v-row >
       <v-col class="ml-8">
        <v-card class="ml-8">
          <div style="background-color: aqua;height:250px">
            <div style="float:right;margin-top:15%;margin-right:.9rem">
              <v-img src="https://www.befunky.com/images/wp/wp-2021-01-linkedin-profile-picture-after.jpg?auto=avif,webp&format=jpg&width=944" 
              width="200px" style="border-radius:50%;"/>
              <div class="user text-center my-2">
                <div class="text-h5">Buse Şenöz</div>
                <div class="text-body-1">Antalya</div>
              </div>
            </div>
          </div>
          <v-row>
            <v-col>
               <v-row class="mt-4 mb-4">
                <v-col>
                    <v-tooltip text="ResimLer" location="bottom">
                  <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" color="primary" prepend-icon="mdi-image-marker-outline" class="mr-2">56</v-btn>
                  </template>
                </v-tooltip>
                    <v-tooltip text="Bekleyen Etkinlikler" location="bottom">
                  <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" color="primary" prepend-icon="mdi-airplane-plus" class="mr-2">56</v-btn>
                  </template>
                </v-tooltip>
                    <v-tooltip text="Tamamlanan Etkinlikler" location="bottom">
                  <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" color="primary" prepend-icon="mdi-airplane-check" class="mr-2">56</v-btn>
                  </template>
                </v-tooltip>
                    <v-tooltip text="En Çok Seyahat Edilen Şehir" location="bottom">
                  <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" color="primary" prepend-icon="mdi-airplane-marker" class="mr-2">İstanbul</v-btn>
                  </template>
                </v-tooltip>
                  <v-tooltip text="Arkadaş Sayısı" location="bottom">
                  <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" color="primary" prepend-icon="mdi-account">11</v-btn>
                  </template>
                </v-tooltip>
              </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
       </v-col>
      </v-row>

<v-row class="ml-16 mr-1">

        <v-card>
    <v-tabs
      v-model="tab"
      color="deep-purple-accent-4"
      align-tabs="center"
    >
      <v-tab value="one">Etkinlikler</v-tab>
      <v-tab value="two">Resimler</v-tab>

    </v-tabs>

    <v-card-text>
      <v-window v-model="tab" >
        <v-window-item value="one">
         
        <v-row class="ml-8 py-8" >
          <v-col>
          <v-row>
          <v-col>
            <EffectCards />
          </v-col>
          <v-col class="text-h5 d-flex align-center text-center">
            <div class="mb-7" >
              Planlarının hepsine bak ya da yeni plan oluştur
              <v-btn a href="/profile/open" class="mt-5">Planlarım</v-btn>
            </div>
          </v-col>
          </v-row>

      </v-col>

        </v-row>
      <v-row class="py-6">
          <v-col>
 
            <EffectCoverflow />
          </v-col>
        </v-row>
        </v-window-item>

        <v-window-item value="two">
          <GalleryProfile style="width:900px;"/>

        </v-window-item>

       
      </v-window>
    </v-card-text>
  </v-card>
</v-row>



      <!-- Düğmeyi sağ alt köşeye sabitle -->
      <div class="suggestion-button">
        <v-row>
          <v-col cols="12" style="margin-top:1rem">
            <img src="@/assets/ok-4.png" style="width:60px;margin-left:1.5rem;"/>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <SuggestionTask />
          </v-col>
        </v-row>

      </div>
    </v-container>

    <v-container class="mt-6">
      
 
    </v-container>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import SideBar from "@/components/SideBar.vue";
import SuggestionTask from "@/components/SuggestionTask.vue";
import GalleryProfile from "@/components/profile/GalleryProfile.vue";
import EffectCoverflow from "@/components/EffectCoverflow.vue";
import EffectCards from "@/components/EffectCards.vue";
import SliderImage from '@/components/SliderImage'

import { useStore } from 'vuex';

export default {
  components: {
    SideBar,
    SuggestionTask,
    EffectCoverflow,
    EffectCards,
    GalleryProfile,
    SliderImage
  },
  setup() {
    const store = useStore();
    const open = ref(3);
    const done = ref(5);
    const imageCount = ref(15);
    const user = ref(store.getters.user);
    const tab = ref(null);

    const fetchUser = async () => {
          await store.dispatch('getUser');
          user.value = store.getters.user;
        };

    onMounted(() => {
      fetchUser();
    });
    
    return {
      open,
      done,
      imageCount,
      user,
      fetchUser,
      tab,
    };
  },
};
</script>


<style scoped>
.user-info {
  margin-top: 0;
  margin-bottom: 10px;
}

.suggestion-button {
  position: fixed;
  bottom: 10px;
  right: 10px;
  font-size: 14px;
  padding: 5px 10px; 
}
</style>

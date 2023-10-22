<template>
  <div>
    <SideBar />
    <v-container style="margin-left: 10rem;background-color:rgb(250, 197, 160)">
      <v-row>
        <v-col cols="4">
          <v-img src="https://www.befunky.com/images/wp/wp-2021-01-linkedin-profile-picture-after.jpg?auto=avif,webp&format=jpg&width=944" width="200px" style="float:right"/>
        </v-col>
        <v-col cols="8">
          <v-row>
            <v-col>
              <div class="user-info">
                <h2 class="display-1">{{ user.name }} {{ user.surname }}</h2>
                <p class="subtitle-1">{{ user.mail }}</p>
                <p class="subtitle-2">{{ user.date }}</p>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <div>Yapılmayı bekleyen etkinlik: {{ open }}</div>
              <div>Tamamlanan etkinlik: {{ done }}</div>
              <div class="mt-3">Toplam resim: {{ imageCount }}</div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <!-- Düğmeyi sağ alt köşeye sabitle -->
      <div class="suggestion-button">
        <v-row>
          <v-col cols="12">
            <img src="@/assets/ok-4.png" style="width:120px;"/>
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
      <v-row>
          <v-col>
            <!-- <div class="text-h6 text-center mb-7" >Yapılmayı bekleyen planların var !</div> -->
            <EffectCards />
          </v-col>
          <v-col class="text-h5 d-flex align-center text-center">
            <div class="mb-7" >
              Planlarının hepsine bak ya da yeni plan oluştur
              <v-btn a href="/profile/open" class="mt-5">Planlarım</v-btn>
            </div>
          </v-col>
        </v-row>
      <v-row>
          <v-col>
            <div class="text-h5 text-center mt-6" >Bazı Anıların</div>
            <EffectCoverflow />
          </v-col>
        </v-row>
      <!-- <v-row>
        <v-col>
          <div class="text-h5 my-3">Bazı anılar</div>
          <ComplexGridImage />
        </v-col>
        <v-col >
          <Timeline style="float:right"/>
        </v-col>
      </v-row> -->
 
   

    </v-container>
  </div>
</template>

<script>
import { ref } from 'vue';
import SideBar from "@/components/SideBar.vue";
import SuggestionTask from "@/components/SuggestionTask.vue";
import Timeline from "@/components/Timeline.vue";
import ComplexGridImage from "@/components/ComplexGridImage.vue";
import EffectCoverflow from "@/components/EffectCoverflow.vue";
import EffectCards from "@/components/EffectCards.vue";

export default {
  components: {
    SideBar,
    SuggestionTask,
    Timeline,
    ComplexGridImage,
    EffectCoverflow,
    EffectCards
  },
  setup() {
    const open = ref(3);
    const done = ref(5);
    const imageCount = ref(15);
    const user = {
      name: "Name",
      surname: "Surname",
      mail: "mail@gmail.com",
      date: "01.01.2000"
    };

    return {
      open,
      done,
      imageCount,
      user
    };
  },
};
</script>


<style scoped>
.user-info {
  margin-top: 0;
  margin-bottom: 10px;
}

/* Düğmeyi sağ alt köşeye sabitleyin ve boyutunu küçültün */
.suggestion-button {
  position: fixed;
  bottom: 10px;
  right: 10px;
  font-size: 14px; /* Düğme metin boyutunu küçültün */
  padding: 5px 10px; /* Düğme içeriğini ayarlayın */
}
</style>

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
                <p class="subtitle-1">{{ user.email }}</p>
                <p class="subtitle-2">{{ user.birthDate }}</p>
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
 
    </v-container>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import SideBar from "@/components/SideBar.vue";
import SuggestionTask from "@/components/SuggestionTask.vue";
import EffectCoverflow from "@/components/EffectCoverflow.vue";
import EffectCards from "@/components/EffectCards.vue";
import axios from 'axios';

export default {
  components: {
    SideBar,
    SuggestionTask,
    EffectCoverflow,
    EffectCards
  },
  setup() {
    const open = ref(3);
    const done = ref(5);
    const imageCount = ref(15);
    const user = ref({
      name: '',
      surname: '',
      email: '',
      birthDate: ''
    });

    const GetUser = async () => {
      const token = localStorage.getItem("x-access-token");
      try {
        const response = await axios.get('/api/Users/GetUser', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          console.log(response.data);
          const birthDate = new Date(response.data.birthDate);
          const formattedBirthDate = birthDate.toLocaleDateString();

          user.value.name = response.data.name
          user.value.surname = response.data.surname
          user.value.email = response.data.email
          user.value.birthDate = formattedBirthDate
        } 
      } catch (error) {
        console.error(error);
      }
    };

    onMounted(() => {
      GetUser()
    })

    return {
      open,
      done,
      imageCount,
      user,
      GetUser
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

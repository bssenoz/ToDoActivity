<template>
  <div>
    <SideBar />
    <v-container style="margin-left: 10rem;background-color:rgb(230, 230, 165)">
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
  </div>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import SuggestionTask from "@/components/SuggestionTask.vue";

export default {
  components: {
    SideBar,
    SuggestionTask
  },
  data: () => ({
    open: 3,
    done: 5,
    imageCount: 15,
    user: {
      name: "Name",
      surname: "Surname",
      mail: "mail@gmail.com",
      date: "01.01.2000"
    }
  }),
  methods: {}
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

<template>

•	Yapılacak ekle
•	Yapılacak sil
•	İletişim işlemleri 
•	Kullanıcı Görüntüle
•	İstatistik Görüntüle
<SideBarAdmin/>

  <v-card>
    <v-tabs
      v-model="tab"
      bg-color="primary"
    >
      <v-tab value="one">Etkinlikler</v-tab>
      <v-tab value="two">Kullanıcılar</v-tab>
      <v-tab value="three">Item Three</v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="one">
          One
        </v-window-item>

        <v-window-item value="two">
          Two
        </v-window-item>

        <v-window-item value="three">
          Three
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>

  </template>
  
  <script>
import { ref } from 'vue';
import SideBarAdmin from "@/components/SideBarAdmin.vue";

export default {
  components: {
    SideBarAdmin,
  },
  setup() {
    const tab = ref(null);

    return {
      tab,
    };
  },
}
</script>

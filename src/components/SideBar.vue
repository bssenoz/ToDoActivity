<template>
  <v-card class="sidebar">
    <v-layout>
      <v-navigation-drawer
        expand-on-hover
        ref="drawer"
      >
      <v-list style="padding-top: 2rem; display: flex; flex-direction: column;">
          <v-list-item style="flex-direction: column; display: flex;text-align:center">
          <v-avatar size="120">
              <v-img src="https://randomuser.me/api/portraits/women/85.jpg" alt="User Avatar"></v-img>
          </v-avatar>
          <div class="mt-5" style="font-size:1.3rem">{{ user.name }} {{ user.surname }}</div>
          </v-list-item>
</v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav style="height:57vh" lines="two">
          <a href="/"><v-list-item prepend-icon="mdi-home-outline" title="Anasayfa" value="myfiles"></v-list-item></a>
          <a href="/profile"><v-list-item prepend-icon="mdi-account" title="Profil" value="myfiles"></v-list-item></a>
          <a href="/profile/activities"><v-list-item prepend-icon="mdi-airplane-plus" title="Etkinlikler" value="myfiles"></v-list-item></a>
          <a href="/profile/activities-done"><v-list-item prepend-icon="mdi-airplane-check" title="Tamamlanan Etkinlikler" value="shared"></v-list-item></a>
          <a href="/profile/gallery"><v-list-item prepend-icon="mdi-image-marker-outline" title="Galeri" value="starred"></v-list-item></a>
          <a href="/profile/settings"><v-list-item prepend-icon="mdi-account-cog" title="Ayarlar" value="starred"></v-list-item></a>

        </v-list>
        <v-list-item prepend-icon="mdi-logout" title="Logout" value="starred" @click="logout"></v-list-item>
        
      </v-navigation-drawer>

      <v-main style="height:100vh"></v-main>
    </v-layout>
  </v-card>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';


export default {
  setup () {
    const router = useRouter();
    const store = useStore();
    const user = ref(store.getters.user);

    const fetchUser = async () => {
          await store.dispatch('getUser');
          user.value = store.getters.user;
        };

    onMounted(() => {
      fetchUser();
    });
    const logout = async() => {
        const tokenNull = ref('')
        localStorage.setItem("x-access-token",tokenNull);
        router.push('/login');
      };

  
    return {
      logout,
      user,
    }
  }   
    
};
</script>

<style scoped lang="scss">
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 230px; 
  background-color: #d21e1e; 
  z-index: 1; 
  overflow-y: auto; 
}
.v-card--variant-elevated {
  box-shadow: none;
}
a {
  text-decoration: none;
  color:black;
}
::v-deep(.v-list-item__prepend) {
  // margin-bottom: 1rem;

}
    ::v-deep(.v-list-item__content) {
      margin-left:-1rem;
    }
::v-deep(.v-list-item--nav) {
  .v-list-item-title {
      font-size:.85rem;
  }
}
</style>

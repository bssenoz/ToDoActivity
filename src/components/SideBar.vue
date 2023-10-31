<template>
  <v-card class="sidebar">
    <v-layout>
      <v-navigation-drawer
        expand-on-hover
        rail
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
        ref="drawer"
      >
        <v-list>
          <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
            title="Sandra Adams"
            subtitle="sandra_a88@gmailcom"
          ></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav style="height:85vh">
          <a href="/profile"><v-list-item prepend-icon="mdi-home-outline" title="Anasayfa" value="myfiles"></v-list-item></a>
          <a href="/profile/activities"><v-list-item prepend-icon="mdi-checkbox-marked-circle-plus-outline" title="Etkinlikler" value="myfiles"></v-list-item></a>
          <a href="/profile/activities-done"><v-list-item prepend-icon="mdi-checkbox-marked-circle-outline" title="Tamamlanmış Etkinlikler" value="shared"></v-list-item></a>
          <a href="/profile/gallery"><v-list-item prepend-icon="mdi-view-gallery" title="Galeri" value="starred"></v-list-item></a>
        </v-list>
        <v-list-item prepend-icon="mdi-logout" title="Logout" value="starred" @click="logout"></v-list-item>
        
      </v-navigation-drawer>

      <v-main style="height: 100vh"></v-main>
    </v-layout>
  </v-card>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup () {
    const router = useRouter();

    const logout = async() => {
        const tokenNull = ref('')
        localStorage.setItem("x-access-token",tokenNull);
        router.push('/login');
      };
   const handleMouseEnter = () => {
      setSidebarWidth(250);
    };
    const handleMouseLeave = () => {
      setSidebarWidth(100);
    };
    const setSidebarWidth = (width) => {
      const sidebar = document.querySelector('.sidebar');
      if (sidebar) {
        sidebar.style.width = `${width}px`;
      }
    };
    return {
      handleMouseEnter,
      handleMouseLeave,
      setSidebarWidth,
      logout
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
  width: 100px; 
  background-color: #fff; 
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
</style>

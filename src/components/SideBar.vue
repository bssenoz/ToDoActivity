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
          <a href="/profile/open"><v-list-item prepend-icon="mdi-checkbox-marked-circle-plus-outline" title="Planlar" value="myfiles"></v-list-item></a>
          <a href="/profile/done"><v-list-item prepend-icon="mdi-checkbox-marked-circle-outline" title="Tamamlananlar" value="shared"></v-list-item></a>
          <a href="/profile/gallery"><v-list-item prepend-icon="mdi-view-gallery" title="Galeri" value="starred"></v-list-item></a>
        </v-list>
        <v-list-item prepend-icon="mdi-logout" title="Logout" value="starred" ></v-list-item>
        
      </v-navigation-drawer>

      <v-main style="height: 100vh"></v-main>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  methods: {
    handleMouseEnter() {
      // Yan menü üzerine gelindiğinde sidebar genişliğini 300px olarak ayarlayın
      this.setSidebarWidth(250);
    },
    handleMouseLeave() {
      // Yan menü üzerinden çekildiğinde sidebar genişliğini 100px olarak ayarlayın
      this.setSidebarWidth(100);
    },
    setSidebarWidth(width) {
      // .sidebar sınıfının genişliğini ayarlayın
      const sidebar = document.querySelector('.sidebar');
      if (sidebar) {
        sidebar.style.width = `${width}px`;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%; /* Yan menünün ekranın tamamını kaplayacak şekilde ayarlayın */
  width: 100px; /* Yan menünün başlangıç genişliği 100px */
  background-color: #fff; /* Yan menünün arka plan rengini ayarlayın */
  z-index: 1; /* Diğer içeriklerin üstünde olduğundan emin olun */
  overflow-y: auto; /* İçerik ekranın yüksekliğini aşıyorsa kaydırma ekleyin */
}
.v-card--variant-elevated {
  box-shadow: none;
}
a {
  text-decoration: none;
  color:black;
}
</style>

<template>
<v-navigation-drawer :width="200">
  <v-list-item title="ADMIN" subtitle="Panel" href="/admin"></v-list-item>
  <v-divider></v-divider>
  <v-list-item link title="Etkinlik" href="/admin/activity"></v-list-item>
  <v-list-item link title="Kullanıcı" href="/admin/user"></v-list-item>
  <v-list-item link title="İstatik"></v-list-item>
  <v-list-item link title="Mesajlar" href="/admin/message"></v-list-item>
</v-navigation-drawer>
</template>

<script>
export default {
  
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

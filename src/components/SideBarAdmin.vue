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
  setup () {
  }
}
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

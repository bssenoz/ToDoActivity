<template>
  <v-app-bar flat>
    <v-app-bar-title>
      <v-icon icon="mdi-circle-slice-4" />

      ActivityApp
    </v-app-bar-title>
    <v-container>
      <div class="float-right">
        <a href="/">Home</a> | <a href="/profile">Profile</a> | <a href="/admin">Admin</a> | <a href="/login">Login</a> |<a href="/register"> Register</a> |

          <v-menu
            open-on-hover
          >
       
            <template v-slot:activator="{ props }">
              <v-avatar size="32" style="cursor:pointer">
                <v-img
                  src="https://www.befunky.com/images/wp/wp-2021-01-linkedin-profile-picture-after.jpg?auto=avif,webp&format=jpg&width=944"
                  v-bind="props"
                />
              </v-avatar>
            </template>
      
            <v-list>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <div> User Profile</div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="4" >
                    <v-img src="https://www.befunky.com/images/wp/wp-2021-01-linkedin-profile-picture-after.jpg?auto=avif,webp&format=jpg&width=944" />
                    <!-- <v-avatar icon="$vuetify" color="secondary" size="x-large"></v-avatar> -->
                  </v-col>
                  <v-col cols="8" >
                    <div>Name Username</div>
                    <div>name@gmail.com</div>
                  </v-col>
                </v-row>
                <div class="border-top-light my-4"></div>
                <v-row>
                  <v-col cols="12">
                    <a href="/profile/settings">Kullanıcı Ayarları</a>
                  </v-col>
                  <v-col cols="12" >
                    Sayfa ?
                  </v-col>
                  <v-col cols="12" >
                    Sayfa ?
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-btn @click="logout">Logout</v-btn>
                  </v-col>
                </v-row>

              </v-container>
   
            </v-list>
          </v-menu>
        </div>
     </v-container>
  </v-app-bar>
</template>


<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

  export default {
    setup() {
      const router = useRouter();

      const logout = async() => {
        const tokenNull = ref('')
        localStorage.setItem("x-access-token",tokenNull);
        router.push('/login');
      }
      return {
        logout,
        useRouter
      }
    }
  }
</script>

<style scoped lang="scss">
.border-top-light {
  border-top: 1px solid #DDDDDD;
}
a {
  color:black;
  text-decoration: none;
}
a:hover {
  color: black;
}
</style>
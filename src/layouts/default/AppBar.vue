<template>
  <v-app-bar flat>
    <v-app-bar-title>
      <v-icon icon="mdi-circle-slice-4" />
      ActivityApp
    </v-app-bar-title>
    <v-container>
      <div class="float-right">
        <router-link to="/">Home</router-link> |
        <router-link to="/profile">Profile</router-link> |
        <router-link to="/admin">Admin</router-link> |
        <router-link to="/login">Login</router-link> |
        <router-link to="/register">Register</router-link> |

        <v-menu open-on-hover>
          <template v-slot:activator="{ props }">
            <v-avatar size="32" style="cursor:pointer">
              <v-img
                v-if="user && user.profileImage"
                :src="user.profileImage"
                v-bind="props"
              />
              <!-- Placeholder image if user or user.profileImage is not available -->
              <v-img
                v-else
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
                <v-col cols="4">
                  <v-img :src="user && user.profileImage ? user.profileImage : 'https://www.befunky.com/images/wp/wp-2021-01-linkedin-profile-picture-after.jpg?auto=avif,webp&format=jpg&width=944'" />
                </v-col>
                <v-col cols="8">
                  <div>{{ user.name }} {{ user.surname }}</div>
                  <div>{{ user.email }}</div>
                </v-col>
              </v-row>
              <div class="border-top-light my-4"></div>
              <v-row>
                <v-col cols="12">
                  <router-link to="/profile/settings">Kullanıcı Ayarları</router-link>
                </v-col>
                <v-col cols="12">
                  Sayfa ?
                </v-col>
                <v-col cols="12">
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
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
  setup() {
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
    const logout = async () => {

      store.commit('clearTokens');
      router.push('/login');
    };

    return {
      user,
      logout,
    };
  },
};
</script>

<style scoped lang="scss">
.border-top-light {
  border-top: 1px solid #DDDDDD;
}
a {
  color: black;
  text-decoration: none;
}
a:hover {
  color: black;
}
</style>

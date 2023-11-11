<template>
    <v-container>
      <v-row>
        <v-col>
      <v-text-field
      v-model="user.name"
      label="Ad"
      variant="solo" outlined
    >
    </v-text-field>
        <v-text-field
      v-model="user.surname" outlined
      label="Soyad"
      variant="solo"
    >
    </v-text-field>
    <v-text-field
      v-model="user.email"
      label="Email"
      variant="solo" outlined
    >
    </v-text-field>
        <v-text-field type="date"
      v-model="user.birthDate" outlined
      label="Doğum Tarihi"
      variant="solo"
    >
    </v-text-field>

    <v-text-field
      v-model="user.location"
      label="Konum"
      variant="solo" outlined
    >
    </v-text-field>

        <v-btn @click="UpdateUser">Güncelle</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
import { ref,onMounted } from "vue";
  import Swal from 'sweetalert2';
  import axios from 'axios';
  import { useStore } from 'vuex';

  export default {
    setup() {
      const store = useStore();
      const user = ref(store.getters.user);

    const fetchUser = async () => {
          await store.dispatch('getUser');
          user.value = store.getters.user;
        };
    const UpdateUser = async () => {
  try {
    const token = localStorage.getItem("x-access-token");
    console.log(token)
    console.log(user.value.surname)
    console.log(user.value.birthDate)
    
    const response = await axios.put('/api/Users/UpdateUser', {
      name: user.value.name,
      surname: user.value.surname,
      birthDate: user.value.birthDate,
      location: user.value.location,
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });

    if (response.status === 200) {
      // Mutasyon çağrısı
      store.commit('setUser', {
        name: user.value.name,
        surname: user.value.surname,
        email: user.value.email,
        birthDate: user.value.birthDate,
        location: user.value.location,
      });

      await Swal.fire({
        title: 'Bilgilerini güncelledin!',
        icon: 'success',
        confirmButtonText: 'Tamam',
      });
      window.location.reload();
    }
  } catch (error) {
    await Swal.fire({
      title: 'Hata!',
      text: 'Bilgilerini güncelleyemedik :(',
      icon: 'error',
      confirmButtonText: 'Tamam',
    });
    console.log(error);
  }
};

      onMounted(() => {
      fetchUser();
    });
      return {
       UpdateUser,fetchUser,user
      };
    },
  };
  </script>
  
  <style scoped>
.v-list-item--density-default {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}
.v-row {
  cursor: pointer;
}
</style>
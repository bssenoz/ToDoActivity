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

  export default {
    setup() {
      const user = ref({
        name: '',
        surname: '',
        email: '',
        birthDate: '',
        location: ''
      });

      const getUser = async () => {
      const token = localStorage.getItem("x-access-token");
      try {
        const response = await axios.get('/api/Users/GetUser', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          const userData = response.data;
        user.value.name = userData.name;
        user.value.surname = userData.surname;
        user.value.email = userData.email;
        user.value.birthDate = userData.birthDate;
        user.value.location = userData.location;
       } 
      } catch (error) {
        console.error(error);
      }
    };
      const UpdateUser = async() => {
        try {
        const token = localStorage.getItem("x-access-token");
        const response = await axios.update('/api/Users/UpdateUsers',
        {
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
          await Swal.fire({
                title: 'Bilgilerini güncelledin!',
                icon: 'success',
                confirmButtonText: 'Tamam',
              });
              window.location.reload
          
        }
      } catch (error) {
        console.log(error);
      }
      }
      onMounted(() => {
      getUser()
    })
      return {
       UpdateUser,getUser,user
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
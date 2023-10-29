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
    import Swal from 'sweetalert2';
    import axios from 'axios';

  export default {
    props: {
      user: Object,
    },
    setup(props) {

      const UpdateUser = async() => {
        try {
        const token = localStorage.getItem("x-access-token");
        const response = await axios.update('',
        {
          name: props.user.name,
          surname: props.user.surname,
          email: props.user.email,
          birthDate: props.user.birthDate,
          location: props.user.location,
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
  
      return {
       UpdateUser
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
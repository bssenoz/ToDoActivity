<template>
    <v-container>
      <v-row>
        <v-col cols="12" sm="6" >
          <v-card>
            <v-card-title>Şifre Değiştir</v-card-title>
            <v-card-text>
              <v-form @submit="changePassword">
                <v-text-field
                  v-model="email"
                  label="Email"
                  required variant="solo"
                ></v-text-field>
                <v-text-field
                  v-model="newPassword"
                  label="Yeni Şifre"
                  type="password"
                  required variant="solo"
                ></v-text-field>
                <v-text-field
                  v-model="confirmPassword"
                  label="Yeni Şifre Tekrar"
                  type="password"
                  required variant="solo"
                ></v-text-field>
                <v-btn color="primary" @click="changePassword">Şifre Değiştir</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import axios from 'axios';
  import { ref } from 'vue';
  import Swal from 'sweetalert2';

  export default {
    setup() {
      const email = ref('');
      const newPassword = ref('');
      const confirmPassword = ref('');

      const changePassword = async() => {
        
        const token = localStorage.getItem("x-access-token");
            axios.post('/api/Authentication/ResetPassword', {
              Email: email.value,
              NewPassword: newPassword.value,
              ConfirmPassword: confirmPassword.value
            }, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
            }
        })
            .then((res) => {
            if(res.status === 200) {
              Swal.fire({
                title: 'Şifre başarıyla değiştirildi',
                icon: 'success',
                confirmButtonText: 'Tamam',
              });
            } else {
              Swal.fire({
                title: 'Şifre değiştirilemedi!',
                text: 'Girdiğin şifrelerin aynı olmasına dikkat et.',
                icon: 'error',
                confirmButtonText: 'Tamam',
              });
            }
            })
            .catch((err) => {
              Swal.fire({
                title: 'Error',
                text: err,
                icon: 'error',
                confirmButtonText: 'Tamam',
              });
            })
  
        email.value = "";
        newPassword.value = "";
        confirmPassword.value = "";
      };

      return {
        changePassword,
        confirmPassword,
        newPassword,
        email
      }
    }

  };
  </script>
  
  <style scoped>

  </style>
  
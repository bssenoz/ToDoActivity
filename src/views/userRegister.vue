<template>
    <v-container fluid class="registration-container" :style="{ backgroundImage: backgroundImage }">
      <v-row>
        <v-col cols="7"></v-col>
        <v-col cols="5">
          <div class="form-container">
            <v-row class="mt-2">
                <v-col>
                    <v-btn color="blue-darken-1" variant="text" href="/login">Giriş</v-btn>
                    <v-btn color="green-darken-1" variant="text" href="/register">Kayıt</v-btn>
                </v-col>
            </v-row>
   <v-row>
    <v-col>
        <v-text-field label="Ad" outlined variant="solo" v-model="firstName"></v-text-field>
        <v-text-field label="Soyad" outlined variant="solo" v-model="lastName"></v-text-field>
        <v-text-field label="Mail" outlined variant="solo" v-model="email"></v-text-field>
        <v-text-field label="Doğum Tarihi" type="date" outlined variant="solo" v-model="birthDate"></v-text-field>
        <v-text-field label="Şehir" outlined variant="solo" v-model="location"></v-text-field>
        

        
        <v-text-field v-model="password" label="Şifre" type="password" required variant="solo" class="mt-8"></v-text-field>
        <v-text-field v-model="confirmPassword" label="Şifre Tekrar" type="password" required variant="solo"></v-text-field>
        <v-btn color="green-darken-1" variant="text" @click="register" style="width:100%">Kayıt Ol</v-btn>

    </v-col>
   </v-row>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';

  export default {
    name: "UserRegister",
    setup() {
      const router = useRouter();
      const backgroundImage = ref('');
      const firstName = ref('');
        const lastName = ref('');
        const email = ref('');
        const birthDate = ref('');
        const location = ref('');
        const password = ref('');
        const confirmPassword = ref('');

      const setRandomBackground = () => {
        const backgrounds = [
        'url("https://www.tavsiyelist.com/wp-content/uploads/2018/07/Yemek.jpg")',
          'url("https://www.tavsiyelist.com/wp-content/uploads/2018/07/Yemek.jpg")',
          'url("https://www.tavsiyelist.com/wp-content/uploads/2018/07/Yemek.jpg")',
        ];
        const randomIndex = Math.floor(Math.random() * backgrounds.length);
        backgroundImage.value = backgrounds[randomIndex];
      };
  
      const register = () => {
        if (password.value === confirmPassword.value) {
          axios.post('/api/Authentication/Register', {
            name: firstName.value,
              surname: lastName.value,
              email: email.value,
              location: location.value,
              birthDate: birthDate.value,
              password: password.value,
              confirmPassword: confirmPassword.value
          }).then((response) => {
            if(response.status===200) {
              console.log(response.data)
              router.push('/login');
            } else console.log("nooo")
          }).catch((err) => {
            console.log(err)
          })
        } else {
          console.log('şifreler uyuşmuyor');
        }
      };
  
      onMounted(() => {
        setRandomBackground();
      });
  
      return {
        backgroundImage,
        register,
        firstName,
        lastName,
        email,
        birthDate,
        password,
        confirmPassword
      };
    },
  };
  </script>
  
  <style scoped>
  .registration-container {
    background-size: cover;
    height: 100vh;
    position: relative;
  }
  .form-container{
     text-align: center;
     padding-left: 10rem;
     padding-right: 8rem;
  }
  .form-container::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 60%;
    background: rgba(0, 0, 0, 0.5);
  }
  </style>
  
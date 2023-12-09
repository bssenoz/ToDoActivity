<template>
    <SideBar />
    <v-container>
      <v-row>
       <v-col cols="4">
        <ChangeProfileImage/>
       </v-col>
       <v-col cols="8">
          <FormProfile/>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
            <ChangePassword/>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn @click="DeleteUser">Hesabımı sil</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import { ref,onMounted } from "vue";
  import Swal from 'sweetalert2';
  import axios from 'axios';
  import { useRouter } from "vue-router";
  import SideBar from "@/components/SideBar.vue";
  import ChangeProfileImage from "@/components/ChangeProfileImage";
  import ChangePassword from "@/components/ChangePassword.vue";
  import FormProfile from "@/components/profile/FormProfile.vue";

  export default {
    components: {
      SideBar,
      FormProfile,
      ChangeProfileImage,
      ChangePassword
    },
    name: "UserSettings",
    setup() {
      const user = ref();
      const router = useRouter();

      const token = localStorage.getItem("x-access-token");
      
      const GetUser = async () => {
        try {
          const response = await axios.get('/api/Users/GetUser', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.status === 200) {
            console.log(response.data);
            user.value = response.data
        } 
        } catch (error) {
          console.error(error);
        }
    };

      const DeleteUser = async() => {
        try {
        const response = await axios.delete('/api/Users/DeleteUser', {
          headers: {
            Authorization: `Bearer ${token}`           
          },
        });
        if(response.status === 200) {
          const tokenNull = ref('')
          localStorage.setItem("x-access-token",tokenNull);
            Swal.fire({
              title: 'Hesabın silindi',
              text: 'Hoşçakal, seni özleyeceğiz :(',
              icon: 'success',
              confirmButtonText: 'Tamam',
            });
            router.push('/login')
        }
      } catch (error) {
        console.error(error);
      }
      }
     onMounted(() => {
      GetUser()
    })

      return { user, GetUser, DeleteUser };
    }
  };
  </script>
  
  <style scoped>
.user-info {
  margin-top: 0;
  margin-bottom: 10px;
}
</style>
<template>
    <SideBar />
    <v-container style="margin-left: 10rem">
      <v-row>
       <v-col cols="4">
        <ChangeProfileImage/>
       </v-col>
       <v-col cols="8">
          <FormProfile :user="user"/>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
            <ChangePassword/>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import { ref } from "vue";
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
      const user = ref({
        name: "Lorem",
        surname: "Ipsum",
        email: "lorem@gmail.com",
        birthDate: "01.01.2000",
        location: "İstanbul",
        image:
          "https://www.befunky.com/images/wp/wp-2021-01-linkedin-profile-picture-after.jpg?auto=avif,webp&format=jpg&width=944"
      });
  
      return { user };
    }
  };
  </script>
  
  <style scoped>
.user-info {
  margin-top: 0;
  margin-bottom: 10px;
}
</style>
<template>
    <SideBar />
    <v-container style="margin-left: 10rem">
      <v-row>
       <v-col cols="4">
        <ChangeProfileImage/>
       </v-col>
       <v-col cols="8">
          <FormProfile :task="user"/>
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
    setup() {
      const user = ref({
        name: "Name",
        surname: "Surname",
        mail: "mail@gmail.com",
        date: "01.01.2000",
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
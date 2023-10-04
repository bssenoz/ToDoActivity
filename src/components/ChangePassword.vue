<template>
    <v-container>
      <v-row>
        <v-col cols="12" sm="6" >
          <v-card>
            <v-card-title class="headline">Şifre Değiştir</v-card-title>
            <v-card-text>
              <v-form @submit="changePassword">
                <v-text-field
                  v-model="currentPassword"
                  label="Mevcut Şifre"
                  type="password"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="newPassword"
                  label="Yeni Şifre"
                  type="password"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="confirmPassword"
                  label="Yeni Şifre Tekrar"
                  type="password"
                  required
                ></v-text-field>
                <v-btn type="submit" color="primary">Şifre Değiştir</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      };
    },
    methods: {
      changePassword() {
        // Burada şifre değiştirme işlemini gerçekleştirin
        if (this.newPassword !== this.confirmPassword) {
          // Yeni şifreler eşleşmiyorsa hata mesajı gösterin veya işlemi iptal edin.
          console.error("Yeni şifreler eşleşmiyor.");
          return;
        }
        

        // axios.post("/api/change-password", {
        //   currentPassword: this.currentPassword,
        //   newPassword: this.newPassword,
        // })
        // .then(response => {
        //   console.log("Şifre değiştirildi.");
        // })
        // .catch(error => {
        //   console.error("Şifre değiştirme işlemi başarısız oldu.", error);
        // });
  
        // Şifre değiştirme işlemi tamamlandıktan sonra formu sıfırlayın veya kullanıcıyı başka bir sayfaya yönlendirin.
        this.currentPassword = "";
        this.newPassword = "";
        this.confirmPassword = "";
      },
    },
  };
  </script>
  
  <style scoped>

  </style>
  
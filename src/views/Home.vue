<template>
  <div class="overlay">
    <div class="text">
      Lorem Ipsum
    </div>
  </div>
  <v-container class="mt-4" >
    <v-row>
      <v-col>
        <v-card>
          <v-card-title class="headline">{{ texts[0].title }}</v-card-title>
          <v-card-text>
            {{ texts[0].text }}
          </v-card-text>
        
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="(text, index) in shiftedTexts" :key="index" cols="12" sm="6">
        <v-card>
          <v-card-title class="headline">{{ text.title }}</v-card-title>
          <v-card-text>
            {{ text.text }}
          </v-card-text>
          <v-btn class="ml-2 mb-2" v-if=text.urlText style="background-color: brown; color: #fff" :href="text.url">
            {{ text.urlText }}
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-container>
    <v-row class="d-flex justify-center align-center mt-8">
    <v-col class="text-center">
      <EffectCube />
      <v-dialog
            v-model="dialogSuggestion"
            persistent
            width="auto"
          >
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                class="mx-auto mt-8" style="background-color: coral;">Etkinlik Öner</v-btn>
            </template>
            
            <v-card class="mx-auto" max-width="400">
              <v-img
                class="align-end text-white"
                width="400"
                :src="activity.image"
                cover
              >
                <v-card-title>{{activity.title}}</v-card-title>
              </v-img>

              <v-card-text>
                <div>{{activity.text}}</div>
                <div>{{activity.day}}gün | {{ activity.budget }}tl</div>
              </v-card-text>
              <v-card-actions>
                  <v-btn color="primary" block @click="dialogSuggestion = false">Kapat</v-btn>
              </v-card-actions>

              </v-card>
     </v-dialog>
    </v-col>
  </v-row>
  </v-container>
<v-container>
  <v-row>
    <v-col>
      <div class="text-h6 mb-4 mt-8">Bizimle iletişime geçmek ister misiniz?</div>
      <v-form >
        <v-text-field
        v-model="username"
        label="Ad Soyad"
        type=""
        required variant="solo"
        ></v-text-field>
        <v-text-field
          v-model="mail"
          label="Mail Adresi"
          required variant="solo"
        ></v-text-field>
                <v-textarea v-model="text" label="Mesajınız" variant="solo"></v-textarea>
                <v-btn type="submit" color="primary">Gönder</v-btn>
              </v-form>
    </v-col>
  </v-row>
</v-container>
</template>

<script>
import { ref } from "vue";
import EffectCube from '@/components/home/EffectCube.vue'

export default {
  components: {
    EffectCube
  },
  setup() {
    const dialogSuggestion = ref(false)
    const activity = {
      title: "Lorem ipsum",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lorem erat, mollis sit amet velit ac, porttitor vulputate tortor.",
      day: 1,
      budget: 100,
      image: "https://www.sukelalist.com/wp-content/uploads/2017/07/1965432.jpg"
    }
    const texts = [
      {
        title: "Hoş geldiniz!",
        text: "Sitemize Hoş Geldiniz! Bu platform, size hayatınıza heyecan katan, özel anılar biriktirmenize yardımcı olan etkinliklerinizi keşfetme ve paylaşma fırsatı sunuyor.",
        urlText: "",
        url: "",
      },
      {
        title: "Sıkılmak Yok",
        text: "Yapacak bir şey bulamıyor, sıkılıyorsanız etkinlik öner seçeneği ile hemen bunun önüne geçin.",
        urlText: "",
        url: "",
      },
      {
        title: "Kendi Etkinliklerinizi Oluşturun",
        text: "Özgün etkinliklerinizi yaratmak için kendi etkinliklerinizi ekleyin. Hangi türden etkinlikler düzenlemeyi düşlüyorsanız, bu platformda paylaşarak başkalarının da katılmasını sağlayabilirsiniz.",
        urlText: "",
        url: "",
      },
      {
        title: "Harika Anıları Kaydedin",
        text: "Etkinliklerinizi tamamladığınızda, harika anıları bu platformda paylaşın. Fotoğraf ve açıklamalarınızla etkinliklerinizi renklendirin.",
        urlText: "",
        url: "",
      },
      {
        title: "Konum Bilgisi ile Kolaylık",
        text: "Etkinliklerinizi gerçekleştirirken nerede olduğunuzu belirtmek artık daha kolay. Konum bilgisi ekleyerek, etkinliklerinizi harita üzerinde görüntüleyin.",
        urlText: "",
        url: "/",
      },
      {
        title: "Fotoğraf Galerisi",
        text: "Etkinlikleriniz sırasında çektiğiniz tüm fotoğrafları galeride bulabilirsiniz. Her anının tadını çıkarmak ve paylaşmak için buradayız.",
        urlText: "",
        url: "",
      },
      {
        title: "En Beğendiğiniz Fotoğrafları Kaydedin",
        text: "Etkinliklerinizde çekilen harika fotoğrafları beğenin ve en beğendiklerinizi kaydedin. İhtiyacınız olduğunda kolayca ulaşın.",
        urlText: "",
        url: "/",
      },
      {
        title: "Ücretsiz Hesap Oluşturun",
        text: "Hemen bir hesap oluşturun ve Yapılacak Etkinlikler dünyasına katılın. Harika etkinlikleri keşfedin, kendi etkinliklerinizi paylaşın ve daha fazlasını yapın.",
        urlText: "Hesap Oluştur",
        url: "/register",
      },
    ];
    const shiftedTexts = texts.slice(1);
    return { texts,shiftedTexts,dialogSuggestion,activity };
  },
};
</script>

<style scoped>
.overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  background:
    linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url("@/assets/home.png") no-repeat center center fixed;
  background-size: cover;
  height: 100vh;
}

.text {
  text-align: center;
  color: white;
  font-size: 24px;
  padding: 20px;
}
</style>

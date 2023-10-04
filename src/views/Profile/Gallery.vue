<template>
  <div>
    <SideBar />
    
    <v-container style="width:1200px">
      <v-row>
        <v-col cols="12">
          <v-tabs v-model="selectedTab">
            <v-tab :key="1">Tüm Resimler</v-tab>
            <v-tab :key="2">Beğenilen Resimler</v-tab>
          </v-tabs>

          <v-tab-item :key="1">
            <v-card v-if="selectedTab === 0">
              <v-card-text>
                <v-container class="pa-1">
                  <v-row>
                    <v-col v-for="(image, index) in images" :key="index" class="d-flex child-flex" cols="3">
                      <v-img
                        :src="image.src"
                        aspect-ratio="1"
                        cover
                        class="bg-grey-lighten-2"
                        @click="showImageInSlider(image)"
                      >
                        <v-btn :icon="image.liked ? 'mdi-heart' : 'mdi-heart-outline'" @click="toggleHeart(image)"></v-btn>
                      </v-img>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
            </v-card>
          </v-tab-item>

          <v-tab-item :key="2">
            <v-card v-if="selectedTab === 1">
              <v-card-text>
                <v-container class="pa-1">
                  <v-row>
                    <v-col v-for="(image, index) in likedImages" :key="index" class="d-flex child-flex" cols="3">
                      <v-img
                        :src="image.src"
                        aspect-ratio="1"
                        cover
                        class="bg-grey-lighten-2"
                        @click="showImageInSlider(image)"
                      >
                        <v-btn :icon="!image.liked ? 'mdi-heart-outline' : 'mdi-heart'" @click="toggleHeart(image)"></v-btn>
                      </v-img>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <div>
                <v-btn @click="showHearts">Kalpleri Uçur</v-btn>
                <div v-for="(heart, index) in hearts" :key="index" class="heart"></div>
              </div>
            </v-card>
          </v-tab-item>
        </v-col>
      </v-row>
      <div class="suggestion-button">
        <v-row>
          <v-col cols="12">
            <SuggestionTask />
          </v-col>
        </v-row>
      </div>
    </v-container>

    <!-- Büyük resim gösterme diyalog penceresi -->
    <v-dialog v-model="showImageDialog" max-width="800px">
      <v-card>
        <v-img :src="selectedImage.src" aspect-ratio="16/9" cover></v-img>
        <v-card-actions>
          <v-btn @click="showImageDialog = false">Kapat</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import SideBar from '@/components/SideBar.vue';
import SuggestionTask from "@/components/SuggestionTask.vue";

export default {
  components: {
    SideBar,
    SuggestionTask
  },
  data() {
    return {
      hearts: [],
      selection: [],
      clickHeart: 0,
      images: [
        { src: "https://www.oggusto.com/_next/image?url=https%3A%2F%2Fwp.oggusto.com%2Fwp-content%2Fuploads%2F2023%2F03%2Fistanbul-dogaya-kacis.webp&w=3840&q=75",
      liked: false },
        { src: "https://3.bp.blogspot.com/-0VR7eRsN86I/T0Syt_XA6tI/AAAAAAAAAsg/foS_sFVYzQ4/s280/31877333XFeUKbSmnr_ph.jpg",
        liked: false },
        { src: "https://avatars.mds.yandex.net/i?id=bf421a6a2369d73abc9ac6b617b9bf5345158b31-8963933-images-thumbs&n=13",
        liked: false },
        { src: 'https://picsum.photos/500/300?image=15',
      liked: true},
        { src: "https://image.posta.com.tr/i/posta/75/750x0/620737e945d2a0c0140d03f5.jpg" ,
      liked: false},
        { src: "https://bigumigu.com/wp-content/uploads/2017/09/66257165859c37e7d497246.21327404.jpg",
      liked: false },
        { src: 'https://picsum.photos/500/300?image=16',
      liked: true},
      ],
      selectedTab: 0,
      likedImages: [],
      showImageDialog: false, // Resim gösterme diyalog penceresini kontrol etmek için
      selectedImage: 0, // Büyük gösterilecek resim
    };
  },
  methods: {
    toggleHeart(image) {
      console.log("tt")
      image.liked = !image.liked;
      this.clickHeart = 1;
      if (image.liked) {
        this.likedImages.push(image);
      } else {
        const index = this.likedImages.findIndex(likedImage => likedImage.src === image.src);
        if (index !== -1) {
          this.likedImages.splice(index, 1);
        }
      }
    
    },
    showImageInSlider(image) {
      console.log("ss")
      console.log(this.clickHeart)
      if(this.clickHeart==0) {
        this.selectedImage = image;
        this.showImageDialog = true;
      }
      this.clickHeart = 0
    },
    showHearts() {
      for (let i = 0; i < 10; i++) {
        const size = Math.floor(Math.random() * 101) + 50;
        const left = Math.random() * window.innerWidth;
        const animationDuration = Math.random() * 4 + 2;
        this.hearts.push({ size, left, animationDuration });
        setTimeout(() => {
          this.hearts.shift();
        }, animationDuration * 1000);
      }
    },
  },
};
</script>

<style>
.heart-container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.heart {
  position: absolute;
  width: 100px;
  height: 100px;
  background-image: url('@/assets/heart.svg');
  background-size: contain;
  background-repeat: no-repeat;
  animation: float 2s ease-in-out infinite;
}

@keyframes float {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(-100vh);
    opacity: 0;
  }
}
.v-responsive {
  max-height: 600px;
}
.suggestion-button {
  position: fixed;
  bottom: 10px;
  right: 10px;
  font-size: 14px; /* Düğme metin boyutunu küçültün */
  padding: 5px 10px; /* Düğme içeriğini ayarlayın */
}

</style>

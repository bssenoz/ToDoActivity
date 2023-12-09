<template>
  <div>
    <SideBar />
    
    <v-container style="margin-left:4rem">
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
                      v-bind:src="'data:' + image.contentType + ';base64,' + image.imageData"
                        aspect-ratio="1"
                        cover
                        class="bg-grey-lighten-2"
                        @click="showImageInSlider(image)"
                      >
                        <v-btn :icon="image.isFavorite ? 'mdi-heart' : 'mdi-heart-outline'" @click="PatchImageFavorite(image)"></v-btn>
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
                      v-bind:src="'data:' + image.contentType + ';base64,' + image.imageData"
                        aspect-ratio="1"
                        cover
                        class="bg-grey-lighten-2"
                        @click="showImageInSlider(image)"
                      >
                        <v-btn :icon="!image.isFavorite ? 'mdi-heart-outline' : 'mdi-heart'" @click="PatchImageFavorite(image)"></v-btn>
                      </v-img>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <div>
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
        <v-img 
        v-bind:src="'data:' + image.contentType + ';base64,' + image.imageData"
        aspect-ratio="16/9" cover></v-img>
        <v-card-actions>
          <v-btn @click="showImageDialog = false">Kapat</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { ref, watch, onMounted  } from 'vue';
import SideBar from '@/components/SideBar.vue';
import SuggestionTask from "@/components/SuggestionTask.vue";
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  components: {
    SideBar,
    SuggestionTask
  },
  setup() {
    const hearts = ref([]);
    const selection = ref([]);
    const clickHeart = ref(0);

    const images = ref([]);
    const likedImages = ref([]);

    const selectedTab = ref(0);
    const showImageDialog = ref(false);
    const selectedImage = ref(0);

    const token = localStorage.getItem("x-access-token");

    const GetUserAllImages = async () => {
  try {
    const response = await axios.get('/api/Image/GetUserAllImages', {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });

    if (response.status === 200) {
      console.log("Başarılı yanıt:", response.data);
      images.value = response.data;
    }
  } catch (error) {
    console.error('Hata:', error);
  }
};

const GetUserAllFavoriteImages = async () => {
  try {
    const response = await axios.get('/api/Image/GetUserAllFavoriteImages', {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });

    if (response.status === 200) {
      console.log("Başarılı yanıt2:", response.data);
      likedImages.value = response.data;
    }
  } catch (error) {
    console.error('Hata:', error);
  }
};

const PatchImageFavorite = async(image) => {
  if(image.isFavorite) {
    try {
            const res = await axios.patch(`/api/Image/ImageMakeNotFavorite/${image.imageId}`, null, {
              headers: {
                'Authorization': `Bearer ${token}`
              },
            });

            if (res.status === 200) {
              console.log("not fav")
            }
          } catch (err) {
            await Swal.fire({
                title: 'Hata!',
                text: err,
                icon: 'error',
                confirmButtonText: 'Tamam',
              });
          }
  }
  else if(!image.isFavorite) {
    try {
            const res = await axios.patch(`/api/Image/ImageMakeFavorite/${image.imageId}`, null, {
              headers: {
                'Authorization': `Bearer ${token}`
              },
            });

            if (res.status === 200) {
              console.log("fav")
            }
          } catch (err) {
            await Swal.fire({
                title: 'Hata!',
                text: err,
                icon: 'error',
                confirmButtonText: 'Tamam',
              });
          }
  } else {
    console.log("hataaa")
  }
      
};
    const toggleHeart = (image) => {
      image.liked = !image.liked;
      clickHeart.value = 1;
      if (image.liked) {
        likedImages.value.push(image);
      } else {
        const index = likedImages.value.findIndex(likedImage => likedImage.src === image.src);
        if (index !== -1) {
          likedImages.value.splice(index, 1);
        }
      }
    };

    const showImageInSlider = (image) => {
      console.log("showImageSlider")
      console.log(image)
      if (clickHeart.value == 0) {
        console.log("click: 0")
        console.log("selected: ",selectedImage.value)
        // selectedImage.value = image;
        showImageDialog.value = true;
      }
      clickHeart.value = 0;
    };

    const showHearts = () => {
      const heartCount = 10;
      const animationDuration = 2;

      for (let i = 0; i < heartCount; i++) {
        setTimeout(() => {
          const size = Math.floor(Math.random() * 101) + 50;
          const left = Math.random() * window.innerWidth;
          hearts.value.push({ size, left, animationDuration });

          setTimeout(() => {
            hearts.value.shift();
          }, animationDuration * 1000);
        }, i * (animationDuration * 200));
      }
  };


    watch(selectedTab, (newCounter) => {
      if(newCounter === 1) {
        showHearts()
      } 
    });

    onMounted(async () => {
      await GetUserAllImages();
      await GetUserAllFavoriteImages();
    });

    return {
      hearts,
      selection,
      clickHeart,
      images,
      selectedTab,
      likedImages,
      showImageDialog,
      selectedImage,
      toggleHeart,
      showImageInSlider,
      showHearts,
      GetUserAllImages,
      PatchImageFavorite
    };
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

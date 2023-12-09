<template>
    <v-container fluid>
        <v-row>
        </v-row>
      <v-row>
        

        <v-col v-for="(image, index) in images" :key="index" class="d-flex child-flex" cols="3">
          <v-card class="elevation-10" style="width:200px;border-radius: 1.5rem;">
            <v-img
              v-bind:src="'data:' + image.contentType + ';base64,' + image.imageData"
              aspect-ratio="1"
              cover
              @click="showImageInSlider(image, index)"
            ></v-img>
            <v-row>
              <v-col>
                <v-btn :icon="image.isFavorite ? 'mdi-heart' : 'mdi-heart-outline'" class="elevation-0"></v-btn>10
                <v-btn icon="mdi-map-marker" class="elevation-0"></v-btn>Balıkesir
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
  
        <v-dialog v-model="showImageDialog">
            <v-btn icon="mdi-window-close" @click="showImageDialog = false" style="position: absolute;right:1rem;"></v-btn>
        <SliderImage :selectedImage="selectedImage" :initialSlide="selectedImageIndex"/>
    </v-dialog>
        
      
    </v-container>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import SliderImage from '@/components/SliderImage'
  import axios from 'axios';
  
  export default {
    components: {
        SliderImage
    },
    setup() {
      const images = ref([]);
      const showImageDialog = ref(false);
      const selectedImage = ref(null);
      const selectedImageIndex = ref(0);
  
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
  
      const showImageInSlider = (image, index) => {
      selectedImage.value = image;
      selectedImageIndex.value = index; 
      showImageDialog.value = true;
    };
  
      onMounted(async () => {
        await GetUserAllImages();
      });
  
      return {
        images,
      showImageDialog,
      selectedImage,
      showImageInSlider,
      GetUserAllImages,
      selectedImageIndex,
      };
    },
  };
  </script>
<style scoped>
::v-deep(.v-overlay__scrim) {
    opacity: .8;
}
::v-deep(.v-img__img--cover) {
  object-fit: contain;
}
::v-deep(.v-btn--icon) {
      width: 2rem;
      height: 2rem;

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
  max-height: 650px;
}

</style>
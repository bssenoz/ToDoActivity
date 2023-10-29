<template>
    <div>
        <div>
          <v-btn type="submit" @click="goster">Resmi Görüntüle</v-btn>
        </div>
        <img v-bind:src="'data:'+contentType+';base64,'+imageBytes"/>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        contentType: null,
        imageBytes: null,
      };
    },
    methods: {
      async goster() {
        try {
          const activityId = 1
          const response = await axios.get(`/api/Image/GetActivityImagesById/${activityId}`);
  
          if (response.status === 200) {
            console.log("başarılı gösterme.");
            console.log(response)
            this.contentType = response.data[0].contentType
            this.imageBytes = response.data[0].imageData
            console.log(this.contentType)
            console.log(this.imageBytes)
          } else {
            console.error("Resim gösterme hatası.");
          }
        } catch (error) {
          console.error("Bir hata oluştu: ", error);
        }
      },
     
    },
  };
  </script>
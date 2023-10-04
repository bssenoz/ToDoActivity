<template>
    <div>
      <div class="imagePreviewWrapper" :style="{'background-image': `url(${userImage})`, 'background-color': userImage ? 'transparent' : 'gray'}">
        <v-icon v-if="userImage" class="deleteIcon" @click="deleteImage">mdi-delete</v-icon>
      </div>
      <v-row>
        <v-col cols="12" class="text-center">
          <v-btn @click="openFileInput">Resim Seç</v-btn>
        </v-col>
      </v-row>
      <input ref="fileInput" type="file" style="display: none" @change="uploadImage" accept="image/*" />
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        userImage: null,
      };
    },
    methods: {
      openFileInput() {
        // Dosya girişini tıklanabilir hale gelir
        this.$refs.fileInput.click();
      },
      uploadImage(event) {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.userImage = e.target.result;
          };
          reader.readAsDataURL(file);
        }
      },
      deleteImage() {
        this.userImage = null;
      },
    },
  };
  </script>
  
  <style scoped>
  .imagePreviewWrapper {
    width: 250px;
    height: 250px;
    display: block;
    cursor: pointer;
    margin: 0 auto 30px;
    background-size: cover;
    background-position: center center;
    position: relative;
  }
  
  .deleteIcon {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }
  </style>
  
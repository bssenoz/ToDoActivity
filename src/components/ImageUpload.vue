<template>
  <div>
    <v-row>
      <v-col v-for="(image, index) in images" :key="index">
        <div class="imagePreviewWrapper" :style="{'background-image': `url(${image.url})`, 'background-color': 'gray'}">
          <v-icon class="deleteIcon" @click="deleteImage(index)">mdi-delete</v-icon>
        </div>
      </v-col>
    </v-row>

    <input ref="fileInput" type="file" @input="pickFile" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [],
      currentIndex: 0 
    };
  },
  methods: {
    selectImage(index) {
      this.currentIndex = index;
      this.$refs.fileInput.click();
    },
    pickFile() {
      let input = this.$refs.fileInput;
      let files = input.files;
      for (let i = 0; i < files.length; i++) {
        let file = files[i];
        if (file) {
          let reader = new FileReader();
          reader.onload = (e) => {
            this.images.push({
              url: e.target.result,
              file: file
            });
            this.$emit("input", file);
          };
          reader.readAsDataURL(file);
        }
      }
      this.$emit("images", this.images);
    },
    deleteImage(index) {
      this.images.splice(index, 1);
    }
  }
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
  position: relative; /* Pozisyonu belirleyin */
}

.deleteIcon {
  position: absolute; /* Mutlak bir pozisyon belirleyin */
  top: 10px; /* Resmin üst kısmına yerleştirin */
  right: 10px; /* Resmin sağ kısmına yerleştirin */
  cursor: pointer;
}
</style>

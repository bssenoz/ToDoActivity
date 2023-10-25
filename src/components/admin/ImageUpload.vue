<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-btn @click="openFileInput">Resim Yükle</v-btn>
      </v-col>
    </v-row>
    <div class="imagePreviewWrapper mt-4" :style="imagePreviewStyle">
      <v-icon v-if="modelValue" class="deleteIcon" @click="deleteImage">mdi-delete</v-icon>
    </div>
    <input ref="fileInput" type="file" style="display: none" @change="uploadImage" accept="image/*" />
  </div>
</template>

<script>
export default {
  props: {
    modelValue: String,
  },
  computed: {
    imagePreviewStyle() {
      return {
        'background-image': this.modelValue ? `url(${this.modelValue})` : 'none',
        'background-color': this.modelValue ? 'transparent' : 'gray',
      };
    },
  },
  methods: {
    openFileInput() {
      this.$refs.fileInput.click();
    },
    uploadImage(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.$emit('update:modelValue', e.target.result);
        };
        reader.readAsDataURL(file);
      }
    },
    deleteImage() {
      this.$emit('update:modelValue', null);
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

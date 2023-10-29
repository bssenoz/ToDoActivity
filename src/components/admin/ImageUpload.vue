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
import { ref } from 'vue';

export default {
  props: {
    modelValue: String,
    task: Object,
  },
  setup(props, { emit }) {
    const fileInputRef = ref(null);

    const imagePreviewStyle = ref({
      'background-image': props.modelValue ? `url(${props.modelValue})` : 'none',
      'background-color': props.modelValue ? 'transparent' : 'gray',
    });

    const openFileInput = () => {
      console.log("props: ",props.task)
      fileInputRef.value.click();
    };

    const uploadImage = (event) => {
      const file = event.target.files[0];
      console.log("file",file)
      console.log("props2: ",props.task)
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          emit('update:modelValue', e.target.result);
        };
        reader.readAsDataURL(file);
      }
    };

    const deleteImage = () => {
      emit('update:modelValue', null);
    };

    return { imagePreviewStyle, openFileInput, uploadImage, deleteImage, fileInputRef };
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

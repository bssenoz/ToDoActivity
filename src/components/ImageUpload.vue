<template>
  <div>
    <h2>Resim Yükle!</h2>
    <form @submit.prevent="uploadImage">
      <input
      type="file" id="images" multiple @change="handleFileChange"
      variant="solo" class="custom-file-input"/>

        <v-textarea v-model="addImageDTO.Text" label="Açıklama" variant="solo"></v-textarea>
      <div>
        <v-btn @click="uploadImage">Resmi Yükle</v-btn>
      </div>

    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  props: {
    modelValue: String,
    task: Object,
  },
  setup(props) {
    const addImageDTO = {
      IsFavorite: ref(false),
      Text: ref(''),
      Images: ref([]),
    };

    const handleFileChange = (e) => {
      console.log(props.task.activityId)
      addImageDTO.Images = e.target.files;
    };

    const goster = async () => {
      try {
        const response = await axios.get(`/api/Image/GetActivityImagesById/${props.task.activityId}`, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.status === 200) {
          console.log('Resim başarıyla yüklendi.');
          const result = await Swal.fire({
                title: 'Resim eklendi!',
                icon: 'success',
                confirmButtonText: 'Tamam',
              });
              console.log(result);
        } else {
          console.error('Resim yükleme hatası.');
        }
      } catch (error) {
        console.error('Bir hata oluştu: ', error);
      }
    };

    const uploadImage = async () => {
      const formData = new FormData();
      //düzeltme gerekli!
      //clerable özelliği bak
      //favorite ve text (object object dönüyor)
      addImageDTO.IsFavorite = true
      formData.append('ActivityId', props.task.activityId);
      formData.append('IsFavorite', addImageDTO.IsFavorite);
      formData.append('Text', addImageDTO.text);
      console.log(addImageDTO.Images)
      for (let i = 0; i < addImageDTO.Images.length; i++) {
        formData.append('Images', addImageDTO.Images[i]);
      }

      try {
        const response = await axios.post('/api/Image/AddImage', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.status === 200) {
          console.log('Resim başarıyla yüklendi.');
        } else {
          console.error('Resim yükleme hatası.');
        }
      } catch (error) {
        console.error('Bir hata oluştu: ', error);
      }
    };

    return {
      addImageDTO,
      handleFileChange,
      goster,
      uploadImage,
    };
  },
};
</script>

<style scoped>
input[type="file"] {
  cursor: pointer !Important;
  font: 300 14px sans-serif;
  color:#9e9e9e;
}
input[type="file"]::-webkit-file-upload-button
{
  font: 300 14px  sans-serif;
  background: #009688;
  border: 0;
  padding: 12px 25px;
  cursor: pointer;
  color: #fff;
  text-transform: uppercase;
}
 
input[type="file"]::-ms-browse {
  font: 300 14px 'Roboto', sans-serif;
  background: #009688;
  border: 0;
  padding: 12px 25px;
  cursor: pointer;
  color: #fff;
  text-transform: uppercase;
}

</style>
<template>
  <div>
    <h2>Resim Yükle!</h2>
    <form @submit.prevent="PostAddImage">
      <input
      type="file" id="images" multiple @change="handleFileChange"
      variant="solo" class="custom-file-input"/>

        <v-textarea v-model="addImageDTO.Text" label="Açıklama" variant="solo"></v-textarea>
      <div>
        <v-btn @click="PostAddImage">Resmi Yükle</v-btn>
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

    const PostAddImage = async () => {
      const dialogs = document.querySelectorAll('.v-overlay__content');
      if (dialogs.length > 0) {
        dialogs.forEach(dialog => {
          dialog.style.zIndex = -2;
        });
      }

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
          await Swal.fire({
            title: 'Resim eklendi!',
            icon: 'success',
            confirmButtonText: 'Tamam',
            didOpen: () => {
              const swalCont = document.querySelector('.swal2-container');
              swalCont.style.zIndex = 10000;
            },
          }).then(() => {
            dialogs[0].style.zIndex = 0;
          });
        }
      } catch (error) {
        await Swal.fire({
            title: 'Resmini ekleyemedik!',
            text: 'Üzgünüz, bir hata oluştu.',
            icon: 'error',
            confirmButtonText: 'Tamam',
            didOpen: () => {
              const swalCont = document.querySelector('.swal2-container');
              swalCont.style.zIndex = 10000;
            },
          }).then(() => {
            dialogs[0].style.zIndex = 0;
          })
        console.error(error);
      }
    };

    return {
      addImageDTO,
      handleFileChange,
      PostAddImage,
    };
  },
};
</script>

<style >
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
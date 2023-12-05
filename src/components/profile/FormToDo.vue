<template>
  <v-container>
    <v-row>
     <v-col><div class="text-h5 mb-4">Plan Ekle!</div></v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
         <v-text-field
      v-model="title"
      label="Başlık"
      variant="solo"
    >
    </v-text-field>
  </v-col>
<v-col cols="12"> 
        <v-text-field
      v-model="text"
      label="İçerik"
      variant="solo"
    >
    </v-text-field>  </v-col>
<v-col cols="12"> 

<v-select
          label="Tarih"
          v-model="timed"
          :items="dateOptions"
          item-text="title"
          item-value="value"
          variant="solo"
        ></v-select>
      </v-col>
<v-col cols="6"> 
  <v-text-field v-if="timed === certain.value"
  v-model="startTime"
  label="Başlangıç Tarihi"
  type="date"
  variant="solo"
  >
  </v-text-field>
</v-col>
<v-col cols="6"> 

  <v-text-field v-if="timed === certain.value"
        v-model="endTime"
        label="Bitiş Tarihi"
        type="date"
        variant="solo"
      >
      </v-text-field>

</v-col>
<v-col cols="6"> 

    <v-text-field
      v-model="location"
      label="Konum"
      variant="solo"
    >
    </v-text-field>
  </v-col>
  <v-col cols="6"> 

    <v-text-field
      v-model="budget"
      label="Bütçe"
      variant="solo"
    >
    </v-text-field>


      </v-col>
     </v-row>
     <v-row>
        <v-col>
           <v-btn
     class="me-4"
     type="submit" @click="CreateActivity"
   >
     Ekle
   </v-btn>

   <v-btn @click="resetForm">
     Temizle
   </v-btn>
        </v-col>

    </v-row>
  </v-container>


</template>
<script>
import { ref } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  setup() {
    const certain = {title: 'Belli',value: true};
    const uncertain = {title: 'Belirsiz',value: false};
    const text = ref('');
    const title = ref('');
    const timed = ref(true);
    const startTime = ref(null);
    const endTime = ref(null);
    const createTime = ref(new Date());
    const budget = ref(null);
    const location = ref('');
    const done = ref(false);
    const dateOptions = [certain, uncertain];
    
    const CreateActivity = async () => {

      try {
        const token = localStorage.getItem("x-access-token")
        if(title.value) {

        const response = await axios.post('/api/Activity/CreateActivity', {
          title: title.value,
          text: text.value,
          startTime: startTime.value,
          endTime: endTime.value,
          budget: budget.value,
          location: location.value,
          timed: timed.value,
          done: done.value
        }, {
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
        })

        if(response.status === 200) {
          await Swal.fire({
          title: 'Yeni plan tanımlandı',
          icon: 'success',
          confirmButtonText: 'Tamam',
        });
        window.location.reload();
      }

        } else {
          await Swal.fire({
          title: 'Hata!',
          text: 'Yeni planın için bir başlık girmelisin.',
          icon: 'error',
          confirmButtonText: 'Tamam',
        });
        }
      } catch(error) {
        console.log(error)
      }
    };

    const resetForm =  () => {
      title.value = ''
      text.value = ''
      startTime.value = ''
      endTime.value = ''
      budget.value = ''
      location.value = ''
    }
    
    
    return {
      CreateActivity,
      resetForm,
      text,
      title,
      timed,
      startTime,
      endTime,
      createTime,
      budget,
      location,
      certain,
      uncertain,
      dateOptions
    }

  }
}

</script>

<style scoped>
.v-col {
  margin-top: -1rem;
}
</style>
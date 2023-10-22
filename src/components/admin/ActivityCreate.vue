<template>
  <v-container style="width:500px">
    <v-row>
      <v-col><div class="text-h5">Yeni Etkinlik</div></v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field v-model="task.title" label="Etkinlik Adı" variant="solo"></v-text-field>
        <v-text-field v-model="task.text" label="Açıklama" variant="solo"></v-text-field>
        <v-text-field v-model="task.day" label="Gün Sayısı" variant="solo"></v-text-field>
        <v-text-field v-model="task.budget" label="Bütçe" variant="solo"></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn @click="reset">Temizle</v-btn>
        <v-btn class="me-4 ml-4" type="submit" @click="createActivity">Ekle</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref, defineComponent } from 'vue';

export default defineComponent({
  props: {
    dialogCreate: Boolean,
  },
  setup(props, { emit }) {
    const task = ref({
      text: null,
      title: null,
      day: null,
      budget: null,
    });

    const reset = () => {
      task.value = {
        text: null,
        title: null,
        day: null,
        budget: null,
      };
    };

    const createActivity = () => {
      emit('task', task.value);
      emit('update:dialogCreate', false);
      task.value = { title: '', text: '', day: '', budget: '' };
    };

    return {
      task,
      createActivity,
      reset,
    };
  },
});
</script>

<template>
    <v-container>
      <v-row>
        <v-col>
          <div v-for="(deger, key) in task" :key="key">

            <v-row v-if="key == 'title'" @click="duzenleModunuBaslat(key)">
                <v-col cols="9"><div class="mt-2">
                    {{ deger }}</div></v-col>
                <v-col cols="3"><v-list-item prepend-icon="mdi-pencil"></v-list-item></v-col>
            </v-row>
            <v-row v-if="key == 'text'" @click="duzenleModunuBaslat(key)">
                <v-col cols="9"><div class="mt-2">{{ deger }}</div></v-col>
                <v-col cols="3"><v-list-item prepend-icon="mdi-pencil"></v-list-item></v-col>
            </v-row>

            <v-row v-if="key == 'date'" @click="duzenleModunuBaslat(key)">
                <v-col cols="9"><div class="mt-2">{{ deger }}</div></v-col>
                <v-col cols="3"><v-list-item prepend-icon="mdi-pencil"></v-list-item></v-col>
            </v-row>
            <v-row v-if="key == 'day'" @click="duzenleModunuBaslat(key)">
                <v-col cols="9"><div class="mt-2" >{{ deger }}</div></v-col>
                <v-col cols="3"><v-list-item prepend-icon="mdi-pencil"></v-list-item></v-col>
            </v-row>
            <v-row v-if="key == 'location'" @click="duzenleModunuBaslat(key)">
                <v-col cols="9"><div class="mt-2">{{ deger }}</div></v-col>
                <v-col cols="3"><v-list-item prepend-icon="mdi-pencil"></v-list-item></v-col>
            </v-row>
              
            <v-text-field
              v-if="duzenleModu === key"
              v-model="task[key]"
              variant="solo"
              @blur="duzenleModunuBitir(key)"
            ></v-text-field>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
<script>
import { ref } from 'vue';

export default {
  props: {
    task: Object,
  },
  setup(props) {
    const duzenleModu = ref(null);

    const duzenleModunuBaslat = (key) => {
      duzenleModu.value = key;
      console.log('key: ', key);
    };

    const duzenleModunuBitir = (key) => {
      duzenleModu.value = null;
    };

    return { duzenleModu, duzenleModunuBaslat, duzenleModunuBitir };
  },
};
</script>
  
  <style scoped>
.v-list-item--density-default {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}
.v-row {
  cursor: pointer;
}
</style>
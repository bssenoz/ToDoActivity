<template>
    <v-container>
      <v-row>
        <v-col>
          <div v-for="(deger, key) in task" :key="key">
       
            <v-row v-if="key == 'name'" @click="duzenleModunuBaslat(key)">
                <v-col cols="9"><div class="mt-2">
                    {{ deger }}</div></v-col>
                <v-col cols="3"><v-list-item prepend-icon="mdi-pencil"></v-list-item></v-col>
            </v-row>
            <v-row v-if="key == 'surname'" @click="duzenleModunuBaslat(key)">
                <v-col cols="9"><div class="mt-2">{{ deger }}</div></v-col>
                <v-col cols="3"><v-list-item prepend-icon="mdi-pencil"></v-list-item></v-col>
            </v-row>

            <v-row v-if="key == 'date'" @click="duzenleModunuBaslat(key)">
                <v-col cols="9"><div class="mt-2">{{ deger }}</div></v-col>
                <v-col cols="3"><v-list-item prepend-icon="mdi-pencil"></v-list-item></v-col>
            </v-row>
            <v-row v-if="key == 'mail'" @click="duzenleModunuBaslat(key)">
                <v-col cols="9"><div class="mt-2" >{{ deger }}</div></v-col>
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
  export default {
    props: {
    task: Object
  },
    data() {
      return {
        duzenleModu: null,
      };
    },
    methods: {
      duzenleModunuBaslat(key) {
          this.duzenleModu = key;
          console.log("key: ",key)
      },
      duzenleModunuBitir(key) {
        this.duzenleModu = null;
      },
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
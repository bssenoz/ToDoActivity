<template>
<v-btn block class="custom-small-button">Etkinlik Öner!
      <v-dialog v-model="doneDialog" activator="parent" >
        <v-card class="pa-4">
            <div class="text-h6 mt-2 mb-2" >Filtreleme yapalım!</div>
          <v-select label="Tarih" :items="['Belirsiz', 'Kesin']" variant="solo"></v-select>
          <v-row>
            <v-col cols="2">
              <v-checkbox v-model="selected1" label="1000tl'den az" value="a"></v-checkbox>
            </v-col>
            <v-col cols="2" >
              <v-checkbox v-model="selected2" label="1000tl-5000tl" value="b"></v-checkbox>
            </v-col>
            <v-col cols="2" >
              <v-checkbox v-model="selected3" label="5000tl-10000tl" value="b"></v-checkbox>
            </v-col>
            <v-col cols="2" >
              <v-checkbox v-model="selected4" label="10000tl-20000tl" value="b"></v-checkbox>
            </v-col>
            <v-col cols="2" >
              <v-checkbox v-model="selected5" label="20000tl'den fazla" value="b"></v-checkbox>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="2" >
                <v-checkbox v-model="location1" label="Şehir içi" value="b"></v-checkbox>
                </v-col>
                <v-col cols="2" >
                <v-checkbox v-model="location2" label="Şehir dışı" value="b"></v-checkbox>
                </v-col>
            </v-row>
          <v-row>
            <v-col cols="2" >
                <v-checkbox v-model="day1" label="1 gün" value="b"></v-checkbox>
                </v-col>
                <v-col cols="2" >
                <v-checkbox v-model="day2" label="1-3 gün" value="b"></v-checkbox>
                </v-col>
                <v-col cols="2" >
                <v-checkbox v-model="day3" label="3-5 gün" value="b"></v-checkbox>
                </v-col>
                <v-col cols="2" >
                <v-checkbox v-model="day4" label="1 hafta" value="b"></v-checkbox>
                </v-col>
            </v-row>
          <v-card-actions>
            <v-btn color="primary" block @click="suggestion">Öner
                <v-dialog v-model="dialog" activator="parent">
                    <v-card>
                        <v-card-title>{{ task.title }}</v-card-title>
                        <v-card-text>{{ task.text }}</v-card-text>
                        <v-card-text>
                          <p>Zaman: {{ task.date }} ({{ task.day }} gün) </p>
                          <p>Bütçe: {{ task.budget }}₺</p>
                          <p>Konum: {{ task.location }} </p>
                        </v-card-text>

                    <v-card-actions>
                        <v-btn color="primary" block >Tekrar Öner
                        </v-btn>
                    </v-card-actions>
                    <v-card-actions>
                        <v-btn color="primary" block @click="dialog = false">Kapat
                        </v-btn>
                    </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-btn>
        </v-card-actions>
        <v-card-actions>
            <v-btn color="primary" block @click="doneDialog = false">Kapat
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-btn>
  </template>
  
  <script>
  export default {
    data: () => ({
      doneDialog: false,
      dialog: false,
      selected1: false,
      selected2: false,
      selected3: false,
      selected4: false,
      selected5: false,
      location1: false,
      location2: false,
      day1: false,
      day2: false,
      day3: false,
      day4: false,
      title: "",
      text: "",
      location: "",
      day: "",
      task: 
      {
        title: "Neque porro",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tristique augue porttitor ipsum fringilla, nec dignissim magna lacinia.",
        date: "Belirsiz",
        day: "3",
        budget: "1000-5000",
        location: "Sakarya",
        image: [""],
        done: false,
      },
    
    }),
    methods: {
        suggestion() {
            // önerme işlemi backend bağlantısı
        }
    }
  };
  </script>

  <style scoped>
.custom-small-button {
  font-size: 14px; /* Düğme metni boyutunu ayarlayın */
  padding: 5px 10px; /* Düğme içeriğini ayarlayın */
}</style>
  
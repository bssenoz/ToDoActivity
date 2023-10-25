<template>
  <v-data-table
    v-model:items-per-page="itemsPerPage"
    :headers="headers"
    :items="mails"
    item-value="mail"
    class="elevation-1"
  >
  <template v-slot:item.text="{ item }">
      <span>
        {{ item.text.length <= 100 ? item.text : item.text.slice(0, 100) + (item.text.length > 100 ? '...' : '') }}
      </span>
    </template>

    <template v-slot:item.answer="{ item }">
      <v-dialog v-model="dialogAnswer" persistent width="auto">
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="props"
            class="float-end"
            style="color:white; background-color: rgb(73, 200, 97);"
            @click="dialogItemToAnswer = item"
          >
            Yanıtla
          </v-btn>
        </template>

        <v-card>
          <v-card-title class="text-h6" style="width:500px">
              <div>{{ dialogItemToAnswer.title }}</div>
              <v-textarea v-model="dialogItemToAnswer.text" label="Mesaj" readonly variant="solo" style="margin-top:1rem"></v-textarea>
              <div v-if="dialogItemToAnswer.answer.length != 0">
                <span>Yanıtlar:</span>
                <div v-for="(text,index) in dialogItemToAnswer.answer" :key="index" class="mt-2 mb-4">
                  <v-textarea v-model="text.text"  label="Yanıt" readonly variant="solo" :style="{ height: textHeight(text.text) + 'rem' }"></v-textarea>
                </div>
              </div>
               <v-textarea v-model="answer.text" label="Yanıt" variant="solo" style="margin-top:1rem"></v-textarea>
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red-darken-1" variant="text" @click="dialogAnswer = false">
              İptal
            </v-btn>

             <v-dialog v-model="dialogAlert" persistent width="auto">
        <template v-slot:activator="{ props }">
          <v-btn color="green-darken-1" variant="text" @click="answerMail(answer.text,dialogItemToAnswer)"
            v-bind="props"
            class="float-end"
          >
          Gönder
          </v-btn>
        </template>

        <v-card>
          <v-card-title class="text-h6">
            Mesaj gönderildi.
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="dialogAlert = false">
              Tamam
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
            
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>

    <template v-slot:item.delete="{ item }">
      <v-dialog v-model="dialogDelete" persistent width="auto">
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="props"
            class="float-end"
            style="color:white; background-color: rgb(232, 64, 64);"
            @click="dialogItemToDelete = item"
          >
            Sil
          </v-btn>
        </template>

        <v-card>
          <v-card-title class="text-h6">
            Mesaj kalıcı olarak silinsin mi?
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green-darken-1" variant="text" @click="dialogDelete = false">
              İptal
            </v-btn>
            <v-btn color="red-darken-1" variant="text" @click="deleteMail(dialogItemToDelete)">
              Evet
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
  </v-data-table>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const itemsPerPage = ref(10);
    const dialogDelete = ref(false);
    const dialogAnswer = ref(false);
    const dialogAlert = ref(false);
    const headers = [
      { title: 'Konu', align: 'start', key: 'title', sortable: false },
      { title: 'İçerik', align: 'start', key: 'text' },
      { title: 'Mail', align: 'start', key: 'mail' },
      { title: '', align: 'end', key: 'answer' },
      { title: '', align: 'end', key: 'delete' },
    ];
    const answer = {
      text: null
    }

    const mails = ref([
      {
        title: 'title1',
        text: 'lorem ipsum lorem lorem lorem',
        mail: 'title@gmail.com',
        answer: []
      },
      {
        title: 'title2',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam non velit massa. Maecenas sit amet vestibulum turpis. Integer eu libero et mi congue faucibus vel vitae ex. Vestibulum bibendum dignissim justo non ultricies. Pellentesque fermentum vestibulum turpis non dictum. Nunc tempus sem quis orci vulputate, a convallis ligula facilisis. Nam pellentesque, nulla vel porta commodo, nisi augue consequat felis, interdum ullamcorper odio nunc quis metus. In hac habitasse platea dictumst. Mauris malesuada mollis purus, non consequat enim convallis eget. ',
        mail: 'title@gmail.com',
        answer: [
          {
            text: 'lorem ipsum'
          },
          {
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Etiam non velit massa. Maecenas sit amet ves'
          },
          {
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam non velit massa. Maecenas sit amet vestibulum turpis. Integer eu libero et mi congue faucibus vel vitae ex. Vestibulum bibendum dignissim justo non ultricies. Pellentesque fermentum vestibulum turpis non dictum. Nunc tempus sem quis orci vulputate, a convallis ligula facilisis. Nam pellentesque, nulla vel porta commodo, nisi augue consequat felis, interdum ullamcorper odio nunc quis metus. In hac habitasse platea dictumst. Mauris malesuada mollis purus, non consequat enim convallis eget. '
          }
        ]
      },
      {
        title: 'title3',
        text: 'lorem ipsum lorem lorem lorem',
        mail: 'title@gmail.com',
        answer: []
      },
    ]);

    const deleteMail = (mail) => {
      console.log(mail.answer.text)
      const index = mails.value.indexOf(mail);
      if (index > -1) {
        mails.value.splice(index, 1);
      }
      dialogDelete.value = false;
    };

    const answerMail = (text, mail) => {
      mail.answer.push({ text });
      answer.text = '';
    };
    const textHeight = (text) => {
      const lineHeight = 4; 
      const lines = text.split('\n').length;
      return lines * lineHeight;
    };

    return {
      itemsPerPage,
      headers,
      mails,
      answer,
      deleteMail,
      answerMail,
      dialogDelete,
      dialogAnswer,
      dialogAlert,
      textHeight
    };
  },
};
</script>

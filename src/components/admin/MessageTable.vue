<template>
  <v-data-table
    v-model:items-per-page="itemsPerPage"
    :headers="headers"
    :items="mails"
    item-value="mail"
    class="elevation-1"
  >
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
    const headers = [
      { title: 'Konu', align: 'start', key: 'title', sortable: false },
      { title: 'İçerik', align: 'end', key: 'text' },
      { title: 'Mail', align: 'end', key: 'mail' },
      { title: '', align: 'end', key: 'delete' },
    ];

    const mails = ref([
      {
        title: 'title1',
        text: 'lorem ipsum lorem lorem lorem',
        mail: 'title@gmail.com',
      },
      {
        title: 'title2',
        text: 'lorem ipsum lorem lorem lorem',
        mail: 'title@gmail.com',
      },
      {
        title: 'title3',
        text: 'lorem ipsum lorem lorem lorem',
        mail: 'title@gmail.com',
      },
    ]);

    const deleteMail = (mail) => {
      const index = mails.value.indexOf(mail);
      if (index > -1) {
        mails.value.splice(index, 1);
      }
      dialogDelete.value = false;
    };

    return {
      itemsPerPage,
      headers,
      mails,
      deleteMail,
      dialogDelete
    };
  },
};
</script>

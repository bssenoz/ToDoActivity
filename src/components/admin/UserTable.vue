<template>
  <v-data-table
    v-model:items-per-page="itemsPerPage"
    :headers="headers"
    :items="users"
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
            <div>
              Kullanıcının hesabı kalıcı olarak silinsin mi?
            </div>
            <div style="font-size: 1rem;color:rgb(113, 109, 109)">
              ( İşlem geriye alınamaz! )
            </div>
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green-darken-1" variant="text" @click="dialogDelete = false">
              İptal
            </v-btn>
            <v-btn color="red-darken-1" variant="text" @click="deleteUser(dialogItemToDelete)">
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
      { title: 'Mail', align: 'start', key: 'mail', sortable: false },
      { title: 'Ad', align: 'end', key: 'name' },
      { title: 'Soyad', align: 'end', key: 'surname' },
      { title: 'Doğum Tarihi', align: 'end', key: 'birth' },
      { title: 'Cinsiyet', align: 'end', key: 'gender' },
      { title: '', align: 'end', key: 'delete' },
    ];

    const users = ref([
      {
        name: 'Name',
        surname: 'Surname',
        mail: 'name@gmail.com',
        birth: '01.01.2000',
        gender: 'Female',
      },
      {
        name: 'Jelly bean',
        surname: 'Lorem',
        mail: 'jelly@gmail.com',
        birth: '09.09.1999',
        gender: 'Male',
      },
      {
        name: 'KitKat',
        surname: 518,
        mail: 26.0,
        birth: 65,
        gender: 7,
      },
      {
        name: 'Eclair',
        surname: 'Ipsum',
        mail: 'eclair@gmail.com',
        birth: '03.03.2003',
        gender: 'Female',
      },
      {
        name: 'Gingerbread',
        surname: 356,
        mail: 16.0,
        birth: 49,
        gender: 3.9,
      },
      {
        name: 'Ice cream sandwich',
        surname: 237,
        mail: 9.0,
        birth: 37,
        gender: 4.3,
      },
      {
        name: 'Lollipop',
        surname: 392,
        mail: 0.2,
        birth: 98,
        gender: 0,
      },
      {
        name: 'Cupcake',
        surname: 305,
        mail: 3.7,
        birth: 67,
        gender: 4.3,
      },
      {
        name: 'Honeycomb',
        surname: 408,
        mail: 3.2,
        birth: 87,
        gender: 6.5,
      },
      {
        name: 'Donut',
        surname: 452,
        mail: 25.0,
        birth: 51,
        gender: 4.9,
      },
      {
        name: 'Name',
        surname: 'Surname',
        mail: 'name@gmail.com',
        birth: '01.01.2000',
        gender: 'Female',
      },
      {
        name: 'Jelly bean',
        surname: 'Lorem',
        mail: 'jelly@gmail.com',
        birth: '09.09.1999',
        gender: 'Male',
      },
    ]);

    const deleteUser = (user) => {
      const index = users.value.indexOf(user);
      if (index > -1) {
        users.value.splice(index, 1);
      }
      dialogDelete.value = false;
    };

    return {
      itemsPerPage,
      headers,
      users,
      deleteUser,
      dialogDelete
    };
  },
};
</script>

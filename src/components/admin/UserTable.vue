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
 import axios from 'axios';
  import { ref, onMounted } from 'vue';
  import Swal from 'sweetalert2';

export default {
  setup() {
    const itemsPerPage = ref(10);
    const dialogDelete = ref(false);
    const headers = [
      { title: 'Email', align: 'start', key: 'email', sortable: false },
      { title: 'Ad', align: 'end', key: 'name' },
      { title: 'Soyad', align: 'end', key: 'surname' },
      { title: 'Doğum Tarihi', align: 'end', key: 'birthDate' },
      { title: 'Konum', align: 'end', key: 'locaton' },
      { title: '', align: 'end', key: 'delete' },
    ];

    const users = ref([]);

    const getUsers = async() => {
      const token = localStorage.getItem("x-access-token");
      try {
        const response = await axios.get('/api/Users/GetAllUsers', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          users.value = response.data
        } 
      } catch (error) {
        console.error(error);
      }
    };

    const deleteUser = async (user) => {
      try {
        console.log(user.id)
        const token = localStorage.getItem("x-access-token");
        const response = await axios.delete(`/api/Users/DeleteUser/${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`           
          },
        });
        if(response.status === 200) {
          Swal.fire({
            title: 'Kullanıcı silindi',
            icon: 'success',
            confirmButtonText: 'Tamam',
          });      
        }
      } catch (error) {
        console.error(error);
      }
    };
    onMounted(() => {
      getUsers()
    })

    return {
      itemsPerPage,
      headers,
      users,
      deleteUser,
      getUsers,
      dialogDelete
    };
  },
};
</script>

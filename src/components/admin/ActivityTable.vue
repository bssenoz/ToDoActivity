<template>
  <v-data-table
    v-model:items-per-page="itemsPerPage"
    :headers="headers"
    :items="activities"
    item-value="title"
    class="elevation-1"
  >
    <template v-slot:item.update="{ item }">
      <v-btn @click="updateItem(item)">Güncelle</v-btn>
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
            Etkinlik kalıcı olarak silinsin mi?
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green-darken-1" variant="text" @click="dialogDelete = false">
              İptal
            </v-btn>
            <v-btn color="red-darken-1" variant="text" @click="handleDelete(dialogItemToDelete)">
              Evet
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
  </v-data-table>
</template>

<script>
import { ref, defineProps } from 'vue';

export default {
  props: {
    activities: Array,
    updateActivities: Function,
  },
  setup(props) {
    const itemsPerPage = ref(5);
    const headers = [
      { text: 'Etkinlik', value: 'title', align: 'start', sortable: false },
      { text: 'Açıklama', value: 'text', align: 'end' },
      { text: 'Gün', value: 'day', align: 'end' },
      { text: 'Bütçe', value: 'budget', align: 'end' },
      { text: 'Güncelle', align: 'end', value: 'update' },
      { text: 'Sil', align: 'end', value: 'delete' },
    ];

    const dialogDelete = ref(false);
    const dialogItemToDelete = ref(null);

    const updateItem = (item) => {
      console.log(item);
      // Güncelleme işlemi 
    };

    const handleDelete = (item) => {
      if (item) {
        const itemToDelete = props.activities.find((activity) => activity.title === item.title);

        if (itemToDelete) {
          const updatedActivities = props.activities.filter((activity) => activity.title !== itemToDelete.title);

          props.updateActivities(updatedActivities);

          dialogDelete.value = false;

          console.log(`${itemToDelete.title} adlı etkinlik silindi.`);
        }
      }
    };

    return {
      itemsPerPage,
      headers,
      dialogDelete,
      dialogItemToDelete,
      updateItem,
      handleDelete,
    };
  },
};
</script>

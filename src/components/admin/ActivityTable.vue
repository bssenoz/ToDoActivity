<template>
  <v-data-table
    v-model:items-per-page="itemsPerPage"
    :headers="headers"
    :items="activities"
    item-value="title"
    class="elevation-1"
  >
    <template v-slot:item.text="{ item }">
      <v-tooltip :text="item.text">
        <template v-slot:activator="{ props }">
          <span v-bind="props">{{ item.text.length <= 100 ? item.text : item.text.slice(0, 100) + (item.text.length > 100 ? '...' : '') }}</span>
        </template>
      </v-tooltip>
    </template>

    <template v-slot:item.image="{ item }">
      <img :src="item.image" style="display: flex; justify-content: center; align-items: center; margin: .5rem; width: 100px" />
    </template>

    <template v-slot:item.update="{ item }">
      <v-dialog v-model="dialogUpdate" persistent width="auto">
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="props"
            class="float-end"
            @click="dialogItemToUpdate = { ...item }"
          >
            Güncelle
          </v-btn>
        </template>

        <v-card>
          <v-card-title class="text-h6">
            <v-text-field v-model="dialogItemToUpdate.title" label="Etkinlik" outlined variant="solo"></v-text-field>
            <v-textarea v-model="dialogItemToUpdate.text" label="Açıklama" variant="solo"></v-textarea>
            <v-text-field v-model="dialogItemToUpdate.day" label="Gün" outlined variant="solo"></v-text-field>
            <v-text-field v-model="dialogItemToUpdate.budget" label="Bütçe" outlined variant="solo"></v-text-field>
            <ImageUpload v-model="dialogItemToUpdate.image" />
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="black-darken-1" variant="text" @click="dialogUpdate = false">
              İptal
            </v-btn>
            <v-btn color="green-darken-1" variant="text" @click="updateItem(dialogItemToUpdate)">
              Güncelle
            </v-btn>
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
import { ref } from 'vue';
import ImageUpload from '@/components/admin/ImageUpload.vue';

export default {
  props: {
    activities: Array,
    updateActivities: Function,
  },
  components: {
    ImageUpload
  },
  setup(props) {
    const itemsPerPage = ref(10);
    const headers = [
      { title: 'Etkinlik', key: 'title', align: 'start', sortable: false },
      { title: 'Açıklama', key: 'text', align: 'start' },
      { title: 'Gün', key: 'day', align: 'start' },
      { title: 'Bütçe', key: 'budget', align: 'start' },
      { title: 'Resim', key: 'image', align: 'start' },
      { title: '', align: 'end', key: 'update' },
      { title: '', align: 'end', key: 'delete' },
  ];

    const dialogDelete = ref(false);
    const dialogUpdate = ref(false);
    const dialogItemToDelete = ref(null);
    const dialogItemToUpdate = ref(null);

    const updateItem = (updatedItem) => {
      if (updatedItem) {
        const updatedActivities = props.activities.map((activity) => {
          if (activity.title === updatedItem.title) {
            return updatedItem;
          }
          return activity;
        });

        props.updateActivities(updatedActivities);

        dialogUpdate.value = false;
      }
    };

    const handleDelete = (item) => {
      if (item) {
        const itemToDelete = props.activities.find((activity) => activity.title === item.title);

        if (itemToDelete) {
          const updatedActivities = props.activities.filter((activity) => activity.title !== itemToDelete.title);

          props.updateActivities(updatedActivities);

          dialogDelete.value = false;
        }
      }
    };

    return {
      itemsPerPage,
      headers,
      dialogDelete,
      dialogUpdate,
      dialogItemToDelete,
      dialogItemToUpdate,
      updateItem,
      handleDelete,
    };
  },
};
</script>

<style scoped>
::v-deep(.v-overlay__content) {
  width: 500px !important;
}
</style>

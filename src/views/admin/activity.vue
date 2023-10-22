<template>
    <SideBarAdmin/>
    <div class="text-h5">Etkinlikler</div>
    <v-dialog
      v-model="dialogCreate"
      persistent
      width="auto"
    >
      <template v-slot:activator="{ props }">
        <v-btn
          v-bind="props"
          class="float-end" color="blue-darken-1">Yeni Etkinlik
        </v-btn>
      </template>
      
      <v-card>
        <v-card-title class="text-h6">
          <ActivityCreate @task="addActivity"/>
        </v-card-title>
        <v-card-actions>
           <v-btn color="primary" block @click="dialogCreate = false">Kapat</v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>
   
    <ActivityTable :activities="activities" :updateActivities="updateActivities" />

</template>
      
<script>
    import { ref } from 'vue';
    import SideBarAdmin from "@/components/SideBarAdmin.vue";
    import ActivityTable from "@/components/admin/ActivityTable.vue";
    import ActivityCreate from "@/components/admin/ActivityCreate.vue";

    export default {
      components: {
        SideBarAdmin,
        ActivityTable,
        ActivityCreate
      },
      setup() {
        const activities = ref([
        {
          title: 'Bisiklet Sürmek',
          text: 'Lorem ipsum dolor sit amet',
          day: 1,
          budget: 94,
        },
        {
          title: 'Puzzle',
          text:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean lacinia magna dolor. Fusce efficitur massa ut quam maximus, ac auctor augue iaculis.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean lacinia magna dolor. Fusce efficitur massa ut quam maximus, ac auctor augue iaculis',
          day: 1,
          budget: 24,
        },
        {
          title: 'Doğa Yürüyüşü',
          text: 'Lorem ipsum dolor sit amet',
          day: 1,
          budget: 65,
        },
        {
          title: 'Fotoğraf Çekimi',
          text: '',
          day: 1,
          budget: 67,
        },
        {
          title: 'Film İzlemek',
          text: 'Lorem ipsum',
          day: 1,
          budget: 23,
        },
        {
          title: 'Müze Gezmek',
          text: 'Lorem ipsum dolor sit amet',
          day: 1,
          budget: 49,
        },
        {
          title: 'Bowling Oynamak',
          text: 'Lorem',
          day: 1,
          budget: 37,
        },
        {
          title: 'Karaoke Gecesi',
          text: 'Lorem ipsum dolor sit amet',
          day: 1,
          budget: 98,
        },
        {
          title: 'Pasta Yapmak',
          text: 'Lorem ipsum dolor sit amet',
          day: 1,
          budget: 87,
        },
        {
          title: 'Yoga Yapmak',
          text: '',
          day: 1,
          budget: 51,
        },
    ]);
    const addActivity = (newActivity) => {
      activities.value.push(newActivity);
    };
    const updateActivities = (newActivities) => {
      activities.value = newActivities;
    };

        const dialogCreate = ref(false);
    
        return {
            dialogCreate,
            activities,
            addActivity,
            updateActivities
        };
      },
    }
    </script>
    
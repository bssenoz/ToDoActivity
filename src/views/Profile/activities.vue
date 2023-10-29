<template>
  <SideBar />
  <v-container style="margin-left: 10rem">
    <v-row>
      <v-col>

        <h2 class="text-h4 text-success ps-4">
          Planlar:&nbsp;
          <v-fade-transition leave-absolute>
            <span :key="`tasks-${tasks.length}`">{{ tasks.length }}</span>
          </v-fade-transition>
        </h2>

        <v-divider class="mt-4"></v-divider>

        <v-divider class="mb-4"></v-divider>

        <v-card v-if="tasks.length > 0">
          <v-slide-y-transition class="py-0" group tag="v-list">
            <template v-for="(task, i) in tasks" :key="`${i}-${task.text}`">
              <v-divider v-if="i !== 0" :key="`${i}-divider`"></v-divider>
              <v-row>
                <v-col cols="10">
                  <v-list-item>
                    <template v-slot:prepend>
                      <v-checkbox-btn v-model="task.done" color="grey" @change="PatchActivityDone(task)">
                      </v-checkbox-btn>
                    </template>
                    <v-list-item-title>
                      <span :class="task.done ? 'text-grey' : 'text-primary'">{{ task.title }}</span>
                    </v-list-item-title>
                  </v-list-item>
                </v-col>
                <v-col cols="2">
                  <v-btn color="primary mt-2">
                    Detay
                    <v-dialog v-model="task.id" activator="parent" width="auto">
                      <v-card>
                        <v-card-title>{{ task.title }}</v-card-title>
                        <v-card-text v-if="task.text">{{ task.text }}</v-card-text>
                        <v-card-text>
                          <p v-if="task.startTime && task.endTime">Tarihler: {{ task.startTime }} - {{ task.endTime }}</p>
                          <p v-if="task.dayNumbers">Gün: {{ task.dayNumbers }} gün</p>
                          <p v-if="task.budget">Bütçe: {{ task.budget }}₺</p>
                          <p>Konum: {{ task.location }} </p>
                        </v-card-text>
                        <v-card-actions>
                          <v-btn color="primary" block>Güncelle
                            <v-dialog v-model="task.update" activator="parent" width="auto">
                              <v-card>
                                <FormUpdate :task="task"/>
                                <v-card-actions>
                                  <v-btn color="primary" block @click="task.update = false">Kapat</v-btn>
                                </v-card-actions>
                              </v-card>
                            </v-dialog>
                          </v-btn>
                        </v-card-actions>
                        <v-card-actions>
                          <v-btn color="primary" block @click="task.id = false">Kapat</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-btn>
                </v-col>
              </v-row>
              <!-- </template> -->
            </template>
          </v-slide-y-transition>
        </v-card>
      </v-col>
      <v-col>
        <FormTodo @task="emitTask($event)" />
      </v-col>
    </v-row>
    <div class="suggestion-button">
        <v-row>
          <v-col cols="12">
            <SuggestionTask />
          </v-col>
        </v-row>
      </div>
  </v-container>
</template>

<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import SideBar from "@/components/SideBar.vue";
import FormTodo from "@/components/profile/FormToDo.vue";
import FormUpdate from "@/components/profile/FormUpdate.vue";
import SuggestionTask from "@/components/SuggestionTask.vue";
import Swal from 'sweetalert2';

export default {
  components: {
    SideBar,
    FormTodo,
    FormUpdate,
    SuggestionTask
  },

  setup() {
    const dialog = ref(false);
    const images = ref("");
    const doneDialog = ref(false);
    const imageUpload = ref(false);

    const tasks = ref([]);

    const GetUserActivitiesNotDone = async () => {
      try {
        const token = localStorage.getItem("x-access-token");
   
        const response = await axios.get('/api/Activity/GetUserActivitiesNotDone', {
          headers: {
            'Authorization': `Bearer ${token}`         
          },
        });

        if (response.status === 200) {
          tasks.value = response.data; 
          
        }
      } catch (error) {
        console.log(error);
      }
    };

    const emitImages = (uploadedImages) => {
      images.value = uploadedImages;
    };

    const emitTask = (task) => {
      tasks.value.push({ ...task });
      console.log("Eklendi:", task);
      console.log(tasks.value);
    };

    const PatchActivityDone = async (task) => {

      await Swal.fire({
        title: 'Etkinlik tamamlandı mı?',
        showDenyButton: true,
        confirmButtonText: 'Evett!',
        denyButtonText: `Hayır, daha değil :(`,
      }).then(async (result) => {

        if (result.isConfirmed) {

          try {
            const token = localStorage.getItem("x-access-token");
            const res = await axios.patch(`/api/Activity/ActivityDone/${task.activityId}`, null, {
              headers: {
                'Authorization': `Bearer ${token}`
              },
            });

            if (res.status === 200) {
              console.log("Başarılı");
        
              const result = await Swal.fire({
                title: 'Plan tamamlandı.',
                text: 'Resimlerini eklemeyi unutma!',
                icon: 'success',
                confirmButtonText: 'Tamam',
              });
              console.log(result);
            }
          } catch (err) {
            console.error(err);
          }
        } 
  });

  if (task.done) {
    console.log("Görev işaretlendi:", task);
  } else {
    console.log("Görev işaretlenmedi:", task);
  }
};

 
    onMounted(() => {
      GetUserActivitiesNotDone()
    })
    return {
      dialog,
      images,
      doneDialog,
      imageUpload,
      tasks,
      emitImages,
      emitTask,
      PatchActivityDone,
      GetUserActivitiesNotDone
    };
  },
};
</script>

<style scoped>
.suggestion-button {
  position: fixed;
  bottom: 10px;
  right: 10px;
  font-size: 14px;
  padding: 5px 10px;
}
</style>

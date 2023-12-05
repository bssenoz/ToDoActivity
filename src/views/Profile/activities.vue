<template>
  <SideBar />
  <v-container fluid>
    <v-row>
      <v-col v-if="!showForm" cols="2" style="margin-left:5rem">
        <h2 class="text-h4">
         filtreleme
        </h2>
        <h2 class="text-h4">
         filtreleme
        </h2>
        <h2 class="text-h4">
         filtreleme
        </h2>
      </v-col>
      <v-col :style="{ 'margin-left': showForm ? '6rem' : '9rem', height: '90vh' }" :cols="showForm ? 6 : 7">

        <h2 class="text-h4 text-success ps-4">
          Planlar:&nbsp;
          <v-fade-transition leave-absolute>
            <span :key="`tasks-${tasks.length}`">{{ tasks.length }}</span>
          </v-fade-transition>
        </h2>

        <v-divider class="mt-4"></v-divider>

        <v-divider class="mb-4"></v-divider>

        <v-card v-if="tasks.length > 0" class="scrollable-content">
          <v-slide-y-transition class="py-0" group tag="v-list">
            <template v-for="(task, i) in tasks" :key="`${i}-${task.text}`">
              <v-divider v-if="i !== 0" :key="`${i}-divider`"></v-divider>
              <v-row>
                <v-col cols="9">
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
                <v-col cols="3" style="text-align:center">
                  <v-btn color="primary mt-2">
                    Detay
                    <v-dialog v-model="task.id" activator="parent" width="auto">
                      <v-card>
                        <v-card-title>{{ task.title }}</v-card-title>
                        <v-card-text v-if="task.text">{{ task.text }}</v-card-text>
                        <v-card-text>
                          <p v-if="task.startTime && task.endTime">Tarihler: {{ task.startTime }} / {{ task.endTime }}</p>
                          <p v-if="task.dayNumbers">Gün: {{ task.dayNumbers }} gün</p>
                          <p v-if="task.budget">Bütçe: {{ task.budget }}₺</p>
                          <p v-if="task.location">Konum: {{ task.location }} </p>
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
                          <v-btn color="primary" block @click="DeleteActivity(task)">Sil</v-btn>
                        </v-card-actions>
                        <v-card-actions>
                          <v-btn color="primary" block @click="task.id = false">Kapat</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-btn>
                </v-col>
              </v-row>
            </template>
          </v-slide-y-transition>
        </v-card>

      </v-col>
      <v-col cols="1" v-if="showForm">
        <v-icon icon="mdi-menu-left" style="font-size:5rem;position: absolute; top: 40%; transform: translateY(-50%);" @click="toggleForm"/>
      </v-col>      
      <v-col cols="1" v-if="!showForm">
        <v-icon icon="mdi-menu-right" style="font-size:5rem;position: absolute; top: 40%; transform: translateY(-50%);" @click="toggleForm"/>
      </v-col>
      <v-col v-if="showForm" cols="4"
          style="height:90vh;text-align:center;display:flex;justify-content: center;align-items: center;"
          class="form-col-transition"
        >
          <FormTodo @task="EmitTask($event)" />
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
    const images = ref("");
    const tasks = ref([]);

    const token = localStorage.getItem("x-access-token");

    const GetUserActivitiesNotDone = async () => {
      try {
           const response = await axios.get('/api/Activity/GetUserActivitiesNotDone', {
          headers: {
            'Authorization': `Bearer ${token}`         
          },
        });

        if (response.status === 200) {
          tasks.value = response.data; 
        }

      } catch (error) {
        console.log(error.response)
        if(error.response.status == 404) {
          await Swal.fire({
            title: 'Hiç etkinlik yok!',
            text: 'Hadi etkinlikler ekleyelim',
            icon: 'info',
            confirmButtonText: 'Tamam',
          });
        } else {
          await Swal.fire({
            title: 'Hata!',
            text: 'Üzgünüz, şu an işlemini gerçekleştiremiyoruz :(',
            icon: 'error',
            confirmButtonText: 'Tamam',
          });
        }
        console.log(error);
      }
    };
    const showForm = ref(true);

const toggleForm = () => {
  showForm.value = !showForm.value;
};
  
    const EmitTask = (task) => {
      tasks.value.push({ ...task });
      console.log("Eklendi:", task);
      console.log(tasks.value);
    };

    const PatchActivityDone = async (task) => {

      await Swal.fire({
        title: 'Etkinlik tamamlandı mı?',
        icon: 'question',
        showDenyButton: true,
        confirmButtonText: 'Evett!',
        denyButtonText: `Hayır, daha değil :(`,
      }).then(async (result) => {

        if (result.isConfirmed) {
          try {
            const res = await axios.patch(`/api/Activity/ActivityDone/${task.activityId}`, null, {
              headers: {
                'Authorization': `Bearer ${token}`
              },
            });

            if (res.status === 200) {
              await Swal.fire({
                title: 'Plan tamamlandı.',
                text: 'Resimlerini eklemeyi unutma!',
                icon: 'success',
                confirmButtonText: 'Tamam',
              });
            }
          } catch (err) {
            await Swal.fire({
                title: 'Hata!',
                text: err,
                icon: 'error',
                confirmButtonText: 'Tamam',
              });
          }
        } else {
          task.done = false
        }
  });
};

const DeleteActivity = async(task) => {
  task.id = false
  await Swal.fire({
    title: 'Etkinlik kesin olarak silinsin mi?',
    icon: 'question',
    showDenyButton: true,
    confirmButtonText: 'Evet',
    denyButtonText: 'Hayır, yanlışlıkla bastım ',
  }).then(async (result) => {
    if (result.isConfirmed) {
          try {
          const response = await axios.delete(`/api/Activity/DeleteUserActivityById/${task.activityId}`, {
            headers: {
              'Authorization': `Bearer ${token}`         
            },
          });
    
          if (response.status === 200) {
            await Swal.fire({
              title: 'Etkinliğin başarıyla silindi',
              text: 'Hadi başka etkinlikler ekle!',
              icon: "succes",
              confirmButtonText: 'Tamam',
            }) 
          }
        } catch (error) {
          await Swal.fire({
            title: 'Hata!',
            text: 'Üzgünüm, şu an silemiyoruz.',
            icon: "error",
            confirmButtonText: 'Tamam',
          }) 
          console.log(error);
        }
        }
      });
};

 
    onMounted(() => {
      GetUserActivitiesNotDone()
    })
    return {
      images,
      tasks,
      EmitTask,
      PatchActivityDone,
      GetUserActivitiesNotDone,
      DeleteActivity,
      showForm,
      toggleForm,
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

.form-toggle-btn {
  position: fixed;
  top: 10px;
  right: 10px;
}

.scrollable-content {
  overflow-y: auto;
  max-height: 78vh; 
}

.scrollable-content::-webkit-scrollbar {
  width: 5px;
}

.scrollable-content::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 6px;
}

.scrollable-content::-webkit-scrollbar-track {
  background-color: #eee;
  border-radius: 5px;
}
</style>

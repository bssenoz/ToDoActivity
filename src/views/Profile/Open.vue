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
              <!-- <template v-if="!task.done"> -->
              <v-divider v-if="i !== 0" :key="`${i}-divider`"></v-divider>
              <v-row>
                <v-col cols="10">
                  <v-list-item>
                    <template v-slot:prepend>
                      <v-checkbox-btn v-model="task.done" color="grey" @change="onTaskDoneChange(task)">
                        <v-dialog v-model="task.close" activator="parent" width="auto">
                          <v-card>
                            <v-card-title>{{ task.title }}</v-card-title>
                            <v-card-text>
                              <ImageUpload @images="emitImages($event)" />
                            </v-card-text>
                            <v-card-actions>
                              <v-btn color="primary" block @click="save(i)">Tamamlandı
                                <v-dialog v-model="doneDialog" activator="parent" width="auto">
                                  <v-card>
                                    <v-card-text>Görev Tamamlandı!</v-card-text>
                                    <v-card-actions>
                                      <v-btn color="primary" block @click="close">Tamam</v-btn>
                                    </v-card-actions>
                                  </v-card>
                                </v-dialog>
                              </v-btn>
                            </v-card-actions>
                            <v-card-actions>
                              <v-btn color="primary" block @click="task.close = false">Kapat</v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
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
                        <v-card-text>{{ task.text }}</v-card-text>
                        <v-card-text>
                          <p>Zaman: {{ task.date }} ({{ task.day }} gün) </p>
                          <p>Bütçe: {{ task.budget }}₺</p>
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
import SideBar from "@/components/SideBar.vue";
import FormTodo from "@/components/FormToDo.vue";
import FormUpdate from "@/components/FormUpdate.vue";
import ImageUpload from "@/components/ImageUpload.vue";
import SuggestionTask from "@/components/SuggestionTask.vue";

export default {
  components: {
    SideBar,
    FormTodo,
    FormUpdate,
    ImageUpload,
    SuggestionTask
  },
  data: () => ({
    dialog: false,
    images: "",
    doneDialog: false,
    imageUpload: false,
    tasks: [
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
    ],
  }),
  methods: {
    emitImages(images) {
      this.images = images;
    },
    emitTask(task) {
      this.tasks.push({ ...task });
      console.log("Eklendi:", task);
      console.log(this.tasks)
    },
    save(i) {
      this.tasks[i].image = this.images;
      this.tasks[i].done = true;
      console.log("xx", this.tasks);
      this.dialog = false;
    },
    close() {
      console.log(this.doneDialog);
      this.doneDialog = false;
      console.log(this.doneDialog);
      console.log("image:", this.imageUpload);
      this.imageUpload = false;
      console.log("image:", this.imageUpload);
    },
    onTaskDoneChange(task) {
     task.done = !task.done;

      if (task.done) {
        console.log("Görev işaretlendi:", task);
      } else {
        console.log("Görev işaretlenmedi:", task);
      }
    },
  },
};
</script>

<style scoped>
.suggestion-button {
  position: fixed;
  bottom: 10px;
  right: 10px;
  font-size: 14px; /* Düğme metin boyutunu küçültün */
  padding: 5px 10px; /* Düğme içeriğini ayarlayın */
}
</style>

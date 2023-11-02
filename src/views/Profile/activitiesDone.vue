<template>
  <SideBar/>
  <v-container>
    <v-row>
      <v-col>
        <v-container style="max-width: 500px">
          <template v-slot:append-inner>
            <v-fade-transition>
              <v-btn
                v-show="newTask"
                icon="mdi-plus-circle"
                variant="text"
                @click="create"
              ></v-btn>
            </v-fade-transition>
          </template>
 
          <h2 class="text-h4 text-success ps-4">
            Tamamlanan Görevler:&nbsp;
            <v-fade-transition leave-absolute>
              <span :key="`tasks-${tasks.length}`">
                {{ tasks.length }}
              </span>
            </v-fade-transition>
          </h2>
 
          <v-divider class="mt-4"></v-divider>
 
     <v-row class="my-1" align="center"
     >
       <v-divider vertical></v-divider>
 

     </v-row>
  
     <v-card v-if="tasks.length > 0">
       <v-slide-y-transition
         class="py-0"
         group
         tag="v-list"
       >
         <template v-for="(task, i) in tasks" :key="`${i}-${task.text}`">
           <v-divider
             v-if="i !== 0"
             :key="`${i}-divider`"
           ></v-divider>
 
           <v-list-item >
             <template v-slot:prepend>
               <v-checkbox-btn v-model="task.done" color="grey" disabled></v-checkbox-btn>
             </template>
 
             <v-list-item-title @click="GetActivityImages(task.activityId)">
               <span :class="task.done ? 'text-grey' : 'text-primary'">{{ task.title }} 
                  </span>
             </v-list-item-title>

             <template v-slot:append >
               <v-expand-x-transition>
                 <v-icon color="success">
                   mdi-check
                 </v-icon>
               </v-expand-x-transition>
             </template>
              <v-dialog v-model="task.control" activator="parent" style="width:100%">
                <v-card>
                  <v-card-title>{{ task.title }}</v-card-title>
                        <v-card-text v-if="task.text">{{ task.text }}</v-card-text>
                        <v-card-text>
                          <p v-if="task.startTime && task.endTime">Tarihler: {{ task.startTime }} / {{ task.endTime }}</p>
                          <p v-if="task.dayNumbers">Gün: {{ task.dayNumbers }} gün</p>
                          <p v-if="task.budget">Bütçe: {{ task.budget }}₺</p>
                          <p v-if="task.location">Konum: {{ task.location }} </p>

                          <v-row class="mt-4" v-if="images.length != 0">
                            <v-col v-for="(image, index) in images" :key="index" cols="12" md="3" lg="2">
                              <v-img
                                v-bind:src="'data:' + image.contentType + ';base64,' + image.imageData"
                                 class="responsive-image" style="width: 100%"
                                >   
                              <v-icon class="deleteIcon" @click="DeleteImage(image)" v-show="showDeleteIcons">mdi-delete</v-icon>
                              </v-img>
                            </v-col>
                          </v-row>
                        </v-card-text>

                  <v-card-actions>
                    <v-btn color="primary" block @click="deleteIcon()" v-if="!showDeleteIcons">Resim Sil
                    </v-btn>
                    <v-btn color="primary" block @click="showDeleteIcons = !showDeleteIcons" v-if="showDeleteIcons">Tamam
                    </v-btn>
                  </v-card-actions>
                  
                  <v-card-actions>
                    <v-btn color="primary" block >Resim Yükle
                      <v-dialog v-model="task.id" activator="parent" width="auto">
                        <v-card>
                          <v-card-text class="mt-8">
                            <ImageUpload :task="task"/>
                          </v-card-text>
                          <v-card-actions>
                            <v-btn color="primary" block @click="task.id = false">Kapat</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-btn>
                  </v-card-actions>
                  <v-card-actions>
                    <v-btn color="primary" block @click="closeDialogAndReset(task)" >Kapat</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
           </v-list-item>
         </template>
       </v-slide-y-transition>
     </v-card>
   </v-container>
      </v-col>
      <v-col>
        <GoogleMap :api-key="apiKey" style="width: 100%; height: 500px" :center="center" :zoom="6">
          <Marker @click="openMarkerDialog(location)"
        v-for="(location, index) in locations"
        :key="index"
        :options="{ position: location.location, icon: {
        url: location.image[0].url, 
        scaledSize: { width: 100, height: 80 } 
      } }"

  />  </GoogleMap>

  <v-dialog v-model="dialog" width="auto">
  <v-card>
    <v-card-text>
      <div v-if="filteredMarkers.length > 0">
  <h3>Anılar</h3>
  <div v-for="(marker, index) in filteredMarkers" :key="index">
    <div class="image-row">
      <div v-for="(imageObj, imageIndex) in marker.image" :key="imageIndex" class="image-col">
        <v-img :src="imageObj.url" style="width: 100px; height: 100px;"></v-img>
      </div>
    </div>
  </div>
</div>

    
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" block @click="closeMarkerDialog">Kapat</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>

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
import SideBar from '@/components/SideBar.vue';
import ImageUpload from '@/components/ImageUpload.vue';
import { GoogleMap, Marker } from "vue3-google-map";
import SuggestionTask from "@/components/SuggestionTask.vue";
import axios from 'axios';
import { ref, onMounted } from 'vue';
import Swal from 'sweetalert2';

export default {
  components: {
    SideBar,
    ImageUpload,
    GoogleMap,
    Marker,
    SuggestionTask
  },
  setup() {
    const dialog = ref(false);
    const selectedMarker = ref(null);
    const selectedMarkerLocation = ref(null);
    const filteredMarkers = ref([]);
    const tasks = ref([]);
    const newTask = ref(null);
    const locations = ref([]);
    const showDeleteIcons = ref(false)

    const images = ref([]);

    const center = { lat: 40, lng: 35 };
    const apiKey = process.env.GOOGLE_MAP_API_KEY;
    const token = localStorage.getItem("x-access-token");

    const closeDialogAndReset = (task) => {
      task.control = false;
      showDeleteIcons.value = false;
    };
 
    const openMarkerDialog = (location) => {
      selectedMarkerLocation.value = location.location;
      getMarkersByLocation();
      dialog.value = true;
      filteredMarkers.value = locations.value.filter((loc) => {
        return (
          loc.location.lat === location.location.lat &&
          loc.location.lng === location.location.lng
        );
      });
    };

    const closeMarkerDialog = () => {
      dialog.value = false;
      selectedMarker.value = null;
    };

        const deleteIcon = () => {
      showDeleteIcons.value = true;
    };

    const getMarkersByLocation = () => {
      const selectedLocation = selectedMarkerLocation.value;

      if (selectedLocation) {
        // Filter data with the same lat and lng as selectedLocation
        filteredMarkers.value = locations.value.filter(location => {
          return (
            location.location.lat === selectedLocation.lat &&
            location.location.lng === selectedLocation.lng
          );
        });
      }
    };
    const GetActivityImages = async (activityId) => {
      console.log("activityId: ",activityId)
      try {
        const response = await axios.get(`/api/Image/GetActivityImagesById/${activityId}`, {
          headers: {
            Authorization: `Bearer ${token}`           
          },
        });
        if(response.status === 200) {
          images.value = response.data;
          console.log(images.value);       
        }
      } catch (error) {
        console.error('API isteği başarısız: ', error);
      }
    };

    const GetUserActivitiesDone = async () => {
      try {
        const response = await axios.get('/api/Activity/GetUserActivitiesDone', {
          headers: {
            Authorization: `Bearer ${token}`            
          },
        });
        tasks.value = response.data;
        console.log(tasks.value);
      } catch (error) {
        console.error('API isteği başarısız: ', error);
      }
    };

    const DeleteImage = async (image) => {
      await Swal.fire({
        title: 'Resmin silinsin mi?',
        icon: 'question',
        showDenyButton: true,
        confirmButtonText: 'Evet',
        denyButtonText: 'Hayır',
      }).then(async (result) => {
        if (result.isConfirmed) {
        try {
          console.log(image.imageId)
          await axios.delete(`/api/Image/DeleteImage/${image.imageId}`, {
            headers: {
              Authorization: `Bearer ${token}`           
            },
          });
        } catch (error) {
          await Swal.fire({
            title: 'Hata!',
            text: error,
            icon: 'error',
            confirmButtonText: 'Tamam',
          })
        }
      }
    });
    };
    
    onMounted(() => {
      GetUserActivitiesDone();
    })


    return {
      dialog,
      selectedMarker,
      selectedMarkerLocation,
      filteredMarkers,
      showDeleteIcons,
      closeDialogAndReset,
      tasks,
      newTask,
      locations,
      center,
      apiKey,
      openMarkerDialog,
      closeMarkerDialog,
      deleteIcon,
      getMarkersByLocation,
      images,
      DeleteImage,
      GetActivityImages,
    };
  },
};
</script>

<style>
.imagePreviewWrapper {
  width: 250px;
  height: 250px;
  display: block;
  cursor: pointer;
  margin: 0 auto 30px;
  background-size: cover;
  background-position: center center;
  position: relative; 
}
.image-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.image-wrapper {
  flex: 1;
  max-width: calc(33.33% - 10px);
  position: relative;
  overflow: hidden;
}

.responsive-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.deleteIcon {
  position: absolute; 
  top: 10px; 
  right: 10px; 
  cursor: pointer;
}
.v-list-item--density-default {
    cursor: pointer;
}
.v-img__img--contain {
    object-fit: cover;
}
.image-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start; 
}

.image-col {
  flex: 0 0 calc(33.33% - 10px);
  margin-right: 10px;
  margin-bottom: 10px
}

.image-col:last-child {
  margin-right: 0;
}

.suggestion-button {
  position: fixed;
  bottom: 10px;
  right: 10px;
  font-size: 14px;
  padding: 5px 10px;
}
</style>
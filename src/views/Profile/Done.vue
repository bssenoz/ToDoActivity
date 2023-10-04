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
 
     <v-row
       class="my-1"
       align="center"
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
 
             <v-list-item-title>
               <span :class="task.done ? 'text-grey' : 'text-primary'">{{ task.title }} 

                  </span>
             </v-list-item-title>

             <template v-slot:append>
               <v-expand-x-transition>
                 <v-icon v-if="task.done" color="success">
                   mdi-check
                 </v-icon>
               </v-expand-x-transition>
             </template>
             <v-dialog v-model="task.id" activator="parent" width="auto">
                <v-card>
                  <v-card-title>{{ task.title }}</v-card-title>
                  <v-card-text>{{ task.text }}</v-card-text>
                  <v-card-text>
                    <p>Zaman: {{ task.date }} ({{ task.day }} gün) </p>
                    <p>Bütçe: {{ task.budget }}₺</p>
                    <p>Konum: {{ task.location }} </p>
                   
                    <div class="image-container mt-6">
                      <v-row>
                        <v-col v-for="(image, index) in task.images" :key="index" cols="2">
                          <v-img v-if="image" :src="image" class="responsive-image">
                            <v-icon class="deleteIcon" @click="deleteImage(index, task)" v-show="showDeleteIcons">mdi-delete</v-icon>
                          </v-img>
                        </v-col>
                      </v-row>
                    </div>
                            
                  </v-card-text>
                  <v-card-actions>
                    <v-btn color="primary" block @click="deleteIcon" v-if="!showDeleteIcons">Resim Sil
                    </v-btn>
                    <v-btn color="primary" block @click="showDeleteIcons = !showDeleteIcons" v-if="showDeleteIcons">Tamam
                    </v-btn>
                  </v-card-actions>
                  
                  <v-card-actions>
                    <v-btn color="primary" block @click="showDeleteIcons = true">Resim Yükle
                      <v-dialog v-model="task.a" activator="parent" width="auto">
                        <v-card>
                          <v-card-text class="mt-8">
                            <ImageUpload />
                          </v-card-text>
                          <v-card-actions>
                            <v-btn color="primary" block @click="imageSave">Kaydet</v-btn>
                          </v-card-actions>
                          <v-card-actions>
                            <v-btn color="primary" block @click="task.a = false">Kapat</v-btn>
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

<!-- <imageSlider /> -->

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
 import SideBar from '@/components/SideBar.vue'
import ImageUpload from '@/components/ImageUpload.vue'
// import ImageSlider from '@/components/ImageSlider.vue'
import { GoogleMap, Marker } from "vue3-google-map";
import SuggestionTask from "@/components/SuggestionTask.vue";
   export default {
     components: {
   SideBar,
   ImageUpload,
  //  ImageSlider,
   GoogleMap, 
   Marker,
   SuggestionTask
},
     data: () => ({
      dialog: false,
      selectedMarker: null,
      selectedMarkerLocation: null, // Yeni eklenen
      filteredMarkers: [],
      showDeleteIcons: false,
       tasks: [
         {
          title: "Neque porro",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tristique augue porttitor ipsum fringilla, nec dignissim magna lacinia.",
          date: "Belirsiz",
          day: "3",
          budget: "1000-5000",
          location: "Sakarya",
          images: ["https://picsum.photos/500/300?image=15","https://picsum.photos/500/300?image=16"],
          done: true,
         },
         {
           title: 'Lorem',
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tristique augue porttitor ipsum fringilla, nec dignissim magna lacinia.",
          date: "Belirsiz",
          day: "3",
          budget: "1000-5000",
          location: "Sakarya",
          images: ["https://www.oggusto.com/_next/image?url=https%3A%2F%2Fwp.oggusto.com%2Fwp-content%2Fuploads%2F2023%2F03%2Fistanbul-dogaya-kacis.webp&w=3840&q=75","https://3.bp.blogspot.com/-0VR7eRsN86I/T0Syt_XA6tI/AAAAAAAAAsg/foS_sFVYzQ4/s280/31877333XFeUKbSmnr_ph.jpg","https://avatars.mds.yandex.net/i?id=bf421a6a2369d73abc9ac6b617b9bf5345158b31-8963933-images-thumbs&n=13","https://picsum.photos/500/300?image=15","https://image.posta.com.tr/i/posta/75/750x0/620737e945d2a0c0140d03f5.jpg","https://bigumigu.com/wp-content/uploads/2017/09/66257165859c37e7d497246.21327404.jpg","https://picsum.photos/500/300?image=16","https://www.oggusto.com/_next/image?url=https%3A%2F%2Fwp.oggusto.com%2Fwp-content%2Fuploads%2F2023%2F03%2Fistanbul-dogaya-kacis.webp&w=3840&q=75","https://www.oggusto.com/_next/image?url=https%3A%2F%2Fwp.oggusto.com%2Fwp-content%2Fuploads%2F2023%2F03%2Fistanbul-dogaya-kacis.webp&w=3840&q=75","https://www.oggusto.com/_next/image?url=https%3A%2F%2Fwp.oggusto.com%2Fwp-content%2Fuploads%2F2023%2F03%2Fistanbul-dogaya-kacis.webp&w=3840&q=75","https://www.oggusto.com/_next/image?url=https%3A%2F%2Fwp.oggusto.com%2Fwp-content%2Fuploads%2F2023%2F03%2Fistanbul-dogaya-kacis.webp&w=3840&q=75","https://www.oggusto.com/_next/image?url=https%3A%2F%2Fwp.oggusto.com%2Fwp-content%2Fuploads%2F2023%2F03%2Fistanbul-dogaya-kacis.webp&w=3840&q=75","https://www.oggusto.com/_next/image?url=https%3A%2F%2Fwp.oggusto.com%2Fwp-content%2Fuploads%2F2023%2F03%2Fistanbul-dogaya-kacis.webp&w=3840&q=75","https://www.oggusto.com/_next/image?url=https%3A%2F%2Fwp.oggusto.com%2Fwp-content%2Fuploads%2F2023%2F03%2Fistanbul-dogaya-kacis.webp&w=3840&q=75",],
          done: true,
         },
         {
           title: 'Neque porro',
           text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tristique augue porttitor ipsum fringilla, nec dignissim magna lacinia.",
          date: "Belirsiz",
          day: "3",
          budget: "1000-5000",
          location: "Sakarya",
          images: [""],
          done: true,
         },
       ],
       newTask: null,
       locations: [
      { 
        location: { 
          lat: 41.029400, 
          lng: 28.867882 , },
        image: [
          {
            url: 'https://picsum.photos/500/300?image=16'
          }, 
          {
            url: 'https://bigumigu.com/wp-content/uploads/2017/09/66257165859c37e7d497246.21327404.jpg'
          }
        ]
      },
      { 
        location: { 
          lat: 36.892, 
          lng:  30.6944 , 
        },
        image: [
          {
            url: 'https://avatars.mds.yandex.net/i?id=bf421a6a2369d73abc9ac6b617b9bf5345158b31-8963933-images-thumbs&n=13'
          }, 
          {
            url: 'https://3.bp.blogspot.com/-0VR7eRsN86I/T0Syt_XA6tI/AAAAAAAAAsg/foS_sFVYzQ4/s280/31877333XFeUKbSmnr_ph.jpg'
          }
        ]
      },
      { 
        location: { 
          lat: 36.892, 
          lng:  30.6944 , 
        },
        image: [
          {
            url: 'https://picsum.photos/500/300?image=15'
          }, 
          {
            url: 'https://picsum.photos/500/300?image=16'
          }
        ]
      },
      { 
        location: { 
          lat: 36.892, 
          lng:  30.6944 , 
        },
        image: [
          {
            url: 'https://picsum.photos/500/300?image=15'
          }, 
          {
            url: 'https://picsum.photos/500/300?image=16'
          },
          {
            url: 'https://bigumigu.com/wp-content/uploads/2017/09/66257165859c37e7d497246.21327404.jpg'
          },
          {
            url: 'https://bigumigu.com/wp-content/uploads/2017/09/66257165859c37e7d497246.21327404.jpg'
          },
   
         
        ]
      },
    ],
     }),
 
     computed: {
       completedTasks () {
         return this.tasks.filter(task => task.done).length
       },
       progress () {
         return this.completedTasks / this.tasks.length * 100
       },
       remainingTasks () {
         return this.tasks.length - this.completedTasks
       },
       groupedLocations() {
      const grouped = {};
      this.locations.forEach((location, index) => {
        const key = `${location.location.lat}-${location.location.lng}`;
        if (!grouped[key]) {
          grouped[key] = [];
        }
        grouped[key].push(location);
      });

      return Object.values(grouped);
    },
     },
 
     methods: {
       create () {
         this.tasks.push({
           done: false,
           text: this.newTask,
         })
 
         this.newTask = null
       },
       openMarkerDialog(location) {
        this.selectedMarkerLocation = location.location;
        this.getMarkersByLocation();
        this.dialog = true;
        this.filteredMarkers = this.locations.filter((loc) => {
          return (
            loc.location.lat === location.location.lat &&
            loc.location.lng === location.location.lng
          );
        });
      },

      closeMarkerDialog() {
        this.dialog = false;
        this.selectedMarker = null; 
      },
      imageSlider() {
          console.log("imageeeee")
      },
      deleteImage(index,task) {
          task.images.splice(index, 1);
      },
      deleteIcon() {
        console.log(this.showDeleteIcons)
        this.showDeleteIcons = true
        console.log(this.showDeleteIcons)
      },
      imageSave() {
        // sonra bakılacak
      },
      showImageInSlider(image) {
      this.selectedImage = image;
      this.showImageDialog = true;
    },
    getMarkersByLocation() {
    const selectedLocation = this.selectedMarkerLocation;

    if (selectedLocation) {
      // selectedLocation ile aynı lat ve lng'ye sahip verileri filtrele
      this.filteredMarkers = this.locations.filter(location => {
        return (
          location.location.lat === selectedLocation.lat &&
          location.location.lng === selectedLocation.lng
        );
      });
    }
  },

    },
    setup() {
      const center = { lat: 40, lng: 35 };
      const apiKey = process.env.GOOGLE_MAP_API_KEY
      return { center, apiKey };
    },
   }
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
  position: relative; /* Pozisyonu belirleyin */
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
  justify-content: flex-start; /* Resimleri sola hizalama */
}

.image-col {
  flex: 0 0 calc(33.33% - 10px); /* Her sütunun genişliği (3 sütunlu) */
  margin-right: 10px; /* Sütunlar arasındaki boşluk */
  margin-bottom: 10px; /* Satırlar arasındaki boşluk */
}

.image-col:last-child {
  margin-right: 0; /* Son sütunun sağındaki boşluğu kaldır */
}

.suggestion-button {
  position: fixed;
  bottom: 10px;
  right: 10px;
  font-size: 14px; /* Düğme metin boyutunu küçültün */
  padding: 5px 10px; /* Düğme içeriğini ayarlayın */
}
</style>
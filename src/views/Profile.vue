<template>

  <!-- <div class="text-h2">Profile</div>
  <a href="profile/open" class="text-h5">Open</a>| <a href="profile/done" class="text-h5">Done</a> -->
  <!-- <p>Yapılacak Gir</p>
  <p>Yapıldı Görüntüle</p>
  <p>Yapılacak Güncelle</p>
  <p>Yapılacak Öner ?</p>
  <p>Kullanıcı Hesap İşlemleri (Şifre değiştirme, Tema Seçme, Doğum tarihi,Hesap Onayla*!)</p>
  timelines ekle! chip kullan ! tabs
  item groups
  <br> -->

  <SideBar/>
<!-- <Gallery /> -->
<v-container>
  <!-- <v-row>
    <strong class="mx-4 text-success-darken-2">
          Completed: {{ completedTasks }}
        </strong>
        <v-progress-circular
          v-model="progress"
          class="me-2"
        ></v-progress-circular>
  </v-row> -->
  <v-row>
    <v-col>
      <div class="text-h5">Hey!! Hadi anılarına bakalım.</div>
     
    </v-col> 

  </v-row>
  <v-row>
    <v-col cols="10">
      
    </v-col>
    <v-col cols="2">
      <v-timeline align="start">
    <v-timeline-item
      v-for="(year, i) in years"
      :key="i"
      :dot-color="year.color"
      size="small"
    >
      <template v-slot:opposite>
        <div
          :class="`pt-1 headline font-weight-bold text-${year.color}`"
          v-text="year.year"
        ></div>
      </template>
      <div>
        <h2 :class="`mt-n1 headline font-weight-light mb-4 text-${year.color}`">
          Lorem ipsum
        </h2>
        <div>
        </div>
      </div>
    </v-timeline-item>
  </v-timeline>
    </v-col>
  </v-row>

  

</v-container>

  </template>


<script>
import SideBar from '@/components/SideBar.vue'
import Gallery from '@/components/GalleryPart.vue'

const imageLayout = [
  { cols: 4 },
  {
    cols: 8,
    children: [{ cols: 12 }, { cols: 12 }],
  },
  { cols: 6 },
  { cols: 3 },
  { cols: 9 },
  { cols: 4 },
  { cols: 8 },
]

export default {
  components: {
    SideBar,
    Gallery
  },
  data() {
    return {
      tab: null,
      image: [
      {
        children: 'https://ocakmedya.com/wp-content/uploads/2022/10/0x0-dunyadan-muhtesem-doga-manzaralari-1512736354182.jpg'
      },
      {
        children: 'https://fotolifeakademi.com/uploads/2020/04/manzara-ve-doga-fotografciligi.jpg'
      },
      {
        children: 'https://fotolifeakademi.com/uploads/2020/04/manzara-ve-doga-fotografciligi.jpg'
      },
      {
        children: 'https://ocakmedya.com/wp-content/uploads/2022/10/0x0-dunyadan-muhtesem-doga-manzaralari-1512736354182.jpg'
      },
      {
        children: 'https://fotolifeakademi.com/uploads/2020/04/manzara-ve-doga-fotografciligi.jpg'
      }
      ],
      years: [
        {
          color: 'cyan',
          year: '1960',
        },
        {
          color: 'green',
          year: '1970',
        },
        {
          color: 'pink',
          year: '1980',
        },
        {
          color: 'amber',
          year: '1990',
        },
        {
          color: 'orange',
          year: '2000',
        },
      ],
      tasks: [
          {
            title: 'Title',
            text: 'Foobar',
            date: 'Belirsiz',
            level: ['100','Yakın','Sakarya'],
            done: true
          },
          {
            title: 'Lorem',
            text: 'Lorem ipsum sit amet doler',
            date: '10.08.2023',
            level: ['2000','Uzak','Ankara'],
            done: false
          },
          {
            title: 'Neque porro',
            text: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit',
            date: 'Belirsiz',
            level: ['0','Yakın','İstanbul'],
            done: false
          },
        ],
      imageLayout: imageLayout,
    }
  },
  computed: {
    completedTasks () {
          return this.tasks.filter(task => task.done).length
        },
        progress () {
          return this.completedTasks / this.tasks.length * 100
        },
      }
}
</script>

<style scoped>

</style>

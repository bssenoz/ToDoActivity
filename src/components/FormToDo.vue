<template>
  <v-container style="max-width:500px">
    <v-row>
     <v-col><div class="text-h5">Plan Ekle!</div></v-col>
    </v-row>
    <v-row>
      <v-col>
         <v-text-field
      v-model="title"
      label="Başlık"
      variant="solo"
    >
    </v-text-field>
        <v-text-field
      v-model="text"
      label="İçerik"
      variant="solo"
    >
    </v-text-field>

        <v-text-field
      v-model="date"
      label="Tarih"
      variant="solo"
    >
    </v-text-field>

        <v-text-field
      v-model="day"
      label="Gün Sayısı"
      variant="solo"
    >
    </v-text-field>

    <v-text-field
      v-model="location"
      label="Konum"
      variant="solo"
    >
    </v-text-field>

    <v-text-field
      v-model="budget"
      label="Bütçe"
      variant="solo"
    >
    </v-text-field>


      </v-col>
     </v-row>
     <v-row>
        <v-col>
           <v-btn
     class="me-4"
     type="submit" @click="create"
   >
     submit
   </v-btn>

   <v-btn @click="reset">
     clear
   </v-btn>
        </v-col>

    </v-row>
  </v-container>


</template>
<script>

  export default {

    data: () => ({
      task: {},
      // tasks: [
      //   {
      //     title: 'Neque porro',
      //     text: 'Lorem ipsum sit amet doler',
      //     date: 'Belirsiz',
      //     day: '3',
      //     budget:'1000-5000',
      //     location: 'Sakarya',
      //     image: [''],
      //     done: false
      //   },
        
      // ],
      done: false,
      text: null,
      title: null,
      day: null,
      date: null,
      budget: null,
      location: null,
      image: null,
    }),


    methods: {
      create () {
        // this.task.push({
        //   done: false,
        //   text: this.text,
        //   title: this.title,
        //   day: this.day,
        //   date: this.date,
        //   budget: this.budget,
        //   location: this.location,
        //   image: [''],
        // })
        this.task.text = this.text;
        this.task.title = this.title;
        this.task.day = this.day,
        this.task.date = this.date,
        this.task.budget = this.budget,
        this.task.location =  this.location,
        this.task.image = [''],
        this.task.done = false

        this.$emit("task", this.task);
        this.reset()
      },
      reset() {
        this.text = null
        this.title = null
        this.day = null
        this.date = null
        this.budget = null
        this.location = null
        this.image = null
      }
    },
  }
</script>
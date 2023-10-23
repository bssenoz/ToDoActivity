<template>
    <v-footer class="mt-16" >
      <v-row justify="center" no-gutters>
               <v-col class="text-center mt-4" cols="12">
          {{ new Date().getFullYear() }} — <strong>ActivityApp</strong>
        </v-col>
      </v-row>
    </v-footer>
  </template>

<script>
export default {
  data: () => ({
    links: [
      'Home',
      'About Us',
      'Team',
      'Services',
      'Blog',
      'Contact Us',
    ],
  }),
}
</script>
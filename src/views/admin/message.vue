<template>
    <SideBarAdmin/>
    <v-container>
      <div class="text-h5 mb-4">Gelen Mesajlar</div>
      <MessageTable />
    </v-container>
 </template>

<script>
    import SideBarAdmin from "@/components/SideBarAdmin.vue";
    import MessageTable from "@/components/admin/MessageTable.vue";

    
    export default {
      components: {
        SideBarAdmin,
        MessageTable
      },
      setup() {
    
        return {
        };
      },
    }
 </script>
    
<template>
     <v-container
        class="py-8 px-6"
        fluid
        back
      >    
     
                
  <v-row justify="center">
    <v-col
      cols="12"
      lg="6"
      md="8"
      sm="10"
    >
    <v-card
      class="mx-auto"
      max-width="500"
    >
      <v-card-title>
        User List
      </v-card-title>
    </v-card>
      <v-divider></v-divider>
    </v-col>
</v-row>
      </v-container >    

  

  </template>
  <script>
    export default {
      data: () => ({
        items: Array.from({ length: 1000 }, (k, v) => v + 1),
      }),
    }
  </script>
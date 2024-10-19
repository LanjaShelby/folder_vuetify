<template>
        <v-container
        class="py-8 px-6"
        fluid
        back
      >   
      
    <v-row
      >
          <v-col
            cols="12" 
          >
  <v-card flat>
    <v-card-title class="d-flex align-center pe-2">
      <v-icon icon="mdi-video-input-component"></v-icon> &nbsp;
      User list

      <v-spacer></v-spacer>

      <v-text-field
        v-model="search"
        density="compact"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        variant="solo-filled"
        flat
        hide-details
        single-line
      ></v-text-field>
    </v-card-title>

    <v-divider></v-divider>
    <v-data-table
      :headers="headers"
      :items="items"
      :loading="loading"
      loading-text="Chargement des données..."
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Liste des utilisateurs</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="fetchData">Rafraîchir</v-btn>
        </v-toolbar>
      </template>
      <template v-slot:item.fonction="{ item }">
        <span>{{ item.fonction }}</span>
      </template>
      <template v-slot:item.phone="{ item }">
        <span>{{ item.phone }}</span>
      </template>
      <template v-slot:item.roles="{ item }">
        <span>{{ formatRoles(item.roles) }}</span>
      </template>

      <template v-slot:item.service="{ item }">
        <span>{{ item.service.libelle_service }}</span>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-btn color="info" @click="viewDetails(item)">Détails</v-btn>
      </template>
    </v-data-table>
    

  </v-card>


      <v-divider></v-divider>
    </v-col>
</v-row>
      </v-container >    

  

  </template>
  <script>
       import axios from '../../plugins/axios' 
  export default {
    data () {
      return {
        user:[],
        search: '',
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Nom', value: 'name' },
        { text: 'Email', value: 'email' },
        { text: 'Rôles', value: 'roles' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      items: [], // Les données récupérées
      loading: false, // Indicateur de chargement
      }
    },
    mounted(){
      this.fetchData();
    },
    methods:{

      async fetchData() {
      this.loading = true;
      try {
        const response = await axios.get('/userss'); // Remplace par ton endpoint
        this.items = response.data['hydra:member'];
        console.log("user at user:",  this.items); // Récupérer la liste des utilisateurs
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      } finally {
        this.loading = false;
      }
    },
    viewDetails(item) {
      console.log('Détails de l\'utilisateur:', item);
      // Implémente ici ce que tu veux faire avec l'utilisateur sélectionné
    },
    formatRoles(roles) {
      if (roles.includes('ROLE_ADMIN')) return 'ADMIN';
      if (roles.includes('ROLE_USER')) return 'USER';
      return 'Inconnu'; // Si aucun rôle ne correspond
    },
      async GetUser(){
        const response = await axios.get('/userss');
        this.user = response.data['hydra:member'];
       
       
          console.log("user at user:", this.user);
         ;
       },

    }
  }
</script>
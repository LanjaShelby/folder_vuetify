<template>
  <v-app id="inspire">

    <div class="text-right">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      location="end"
    >
      <template v-slot:activator="{ props }">

        <v-chip
         v-bind="props"
      class="ma-2"
      color="primary"
      variant="outlined"
    >
     Account
      <v-icon icon="mdi-account-outline" end></v-icon>
    </v-chip>
      </template>

      <v-card min-width="300">
        <v-list>
          <v-list-item
            prepend-avatar="https://cdn.vuetifyjs.com/images/john.jpg"
            :subtitle="UserRole"
            :title="UserConnected.name"
          >
            <template v-slot:append>
              <v-btn
                :class="fav ? 'text-red' : ''"
                icon="mdi mdi-emoticon-excited-outline"
                variant="text"
                @click="fav = !fav"
              ></v-btn>
            </template>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list>
          <v-list-item>
                <v-btn
              color="primary"
              prepend-icon= "mdi-account-circle-outline"
              text="Vieuw Profil"
              class="text-none"
              variant="outlined"
                @click="dialogProfil = true"
              flat>  </v-btn>
     
              <v-dialog
                v-model="dialogProfil"
                max-width="500"
              >
                    <v-card
                      class="mx-auto"
                      max-width="100vh"
                    >
                      <v-card-item class="bg-cyan-darken-1">
                        <v-card-title>
                          <span class="text-h5">{{UserConnected.name}}</span>
                        </v-card-title>

                        <template v-slot:append>
                          <v-defaults-provider
                            :defaults="{
                              VBtn: {
                                variant: 'text',
                                density: 'comfortable',
                              }
                            }"
                          >                        
                            <v-btn   @click="dialogEditProfil = true" icon="mdi-pencil"></v-btn>

                            <v-btn  @click="dialogProfil = false" icon="mdi mdi-close"></v-btn>
                          </v-defaults-provider>
                        </template>
                      </v-card-item>

                      <v-list>                

                        <v-list-item
                          append-icon="mdi-message-text"
                          prepend-icon="mdi-phone"
                          title="(323) 555-6789"
                        ></v-list-item>

                        <v-divider inset></v-divider>

                        <v-list-item
                          prepend-icon="mdi-email"
                          :title="UserConnected.email"
                        ></v-list-item>

                        <v-divider inset></v-divider>

                        <v-list-item
                          prepend-icon="mdi-map-marker"
                          title="Orlando, FL 79938"
                        ></v-list-item>
                      </v-list>

                      <v-img
                        height="200"
                        src="https://picsum.photos/700?image=996"
                        cover
                      ></v-img>
                    </v-card>              
             </v-dialog>
                 <v-dialog
                      v-model="dialogEditProfil"
                      max-width="500"
                    >
                    <v-card rounded="lg">
                             <v-card-title class="d-flex justify-space-between align-center">
                                   <div class="text-h5 text-medium-emphasis ps-2">
                                          Edit Profil
                                  </div>
                                <v-btn
                                    icon="mdi-close"
                                     variant="text"
                                    @click="isActive.value = false"
                                ></v-btn>
                              </v-card-title>

                              <v-divider class="mb-4"></v-divider>

                              <v-card-text>
                                        <div class="mb-2">Name</div>
                                        <div class="text-medium-emphasis mb-4">
                                          <v-text-field        
                                          v-model="UserConnected.name"                                                      
                                              label="Name"
                                            ></v-text-field> 
                                            <div class="mb-2">Mail</div>   
                                            <v-text-field    
                                            v-model="UserConnected.email"                                                           
                                              label="Mail"
                                            ></v-text-field>    
                                            <div class="mb-2">Another</div>
                                            <v-text-field                
                                            v-model="UserConnected.roles"                                               
                                              label="Another"
                                            ></v-text-field>                                
                                          </div>
                                      
                                      </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>

                          <v-btn
                            text="Close"
                            variant="text"
                            @click="dialogEditProfil = false"
                          ></v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>

          </v-list-item>
          <v-list-item>
              <v-btn
                @click="Logout"
              color="red"
              append-icon= "mdi mdi-location-exit"
              text="Disconnect"
              class="text-none"
            
                >  </v-btn>
          </v-list-item>
        </v-list>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            variant="text"
            @click="menu = false"
          >
            Cancel
          </v-btn>
          
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
   <!-- <v-system-bar>
      <v-spacer></v-spacer>

      <v-icon>mdi-square</v-icon>

      <v-icon>mdi-circle</v-icon>

      <v-icon>mdi-triangle</v-icon>
    </v-system-bar> -->
    <v-navigation-drawer 
    v-model="drawer"
    color="#1569C7">
      <v-sheet
        class="pa-4"
        color="#1569C7"
        style="cursor: pointer"  
      >
      <div
      @click="dialog = !dialog">
        <v-avatar class="mb-4" size="64" >
          <v-img alt="Avatar" src="https://cdn.vuetifyjs.com/images/john.jpg" ></v-img>
      </v-avatar>
        
   

      <div>  <v-chip color="secondary" variant="flat">  <v-icon icon="mdi-account-circle-outline" start> </v-icon> {{UserConnected.name}}  </v-chip></div>
      </div>
      
    <v-fade-transition hide-on-leave>
      <v-card
        v-if=dialog
        append-icon="$close"
        class="mx-auto"
        elevation="16"
        max-width="500"
        title="Profil"
      >
        <template v-slot:append>
          <v-btn icon="$close" variant="text" @click="dialog = false"></v-btn>
        </template>

        <v-divider></v-divider>

        <div class="py-12 text-center">
          <v-avatar class="mb-4" size="64" >
             <v-img alt="Avatar" src="https://cdn.vuetifyjs.com/images/john.jpg" ></v-img>
      </v-avatar>

              <div class="text-h6 font-weight-bold">
                <v-btn color="blue"  class="ma-2"  >
                      <v-icon icon="mdi-account-star-outline" start></v-icon> {{UserConnected.name}}
                </v-btn>
                <v-btn class="ma-2" color="red">
                  <v-icon :icon="UserIcon" start></v-icon>{{UserRole}}
                  </v-btn>             
              </div>
        </div>

        <v-divider></v-divider>
<!--
        <div class="pa-4 text-end">
          <v-btn
            class="text-none"
            color="medium-emphasis"
            min-width="92"
            variant="outlined"
            rounded
            @click="dialog = false"
          >
            Close
          </v-btn>
        </div> 
         <v-list-item
          v-for="[icon, text, route] in links"
          :key="icon"
          :prepend-icon="icon"
          :title="text"
          :to="route"
          link
        ></v-list-item>-->
      </v-card>
    </v-fade-transition>
       
      </v-sheet>

      <v-divider></v-divider>
      <v-list>
       
        <v-list-item >
          <v-btn
          v-for="[icon, text, route] in links"
          :key="icon"
          :prepend-icon="icon"
          :text="text"
          :to="route"
          class="mb-2"
           rounded="xl"
          variant="tonal" 
           block></v-btn>
        </v-list-item>
        
     
        <div class="pa-4 text-end">
       
        
        </div>
      </v-list>
    </v-navigation-drawer>

    <v-main 
    class="main_container" >
    <v-container
        class="py-8 px-6"
        fluid
        back
      >    
      <transition name="slide-left">
      <router-view  :key="$route.fullPath" />
    </transition>
    </v-container>   
    </v-main>
  </v-app>
</template>

<script setup>
  import { ref } from 'vue';

  const cards = ['Today', 'Yesterday']
  const links = [
    ['mdi-inbox-arrow-down', 'Inbox' ,'/inbox'],
    ['mdi-send', 'Send' , '/send'],
    ['mdi-timeline-text-outline', 'History' ,'/history'],
    ['mdi-account-circle-outline', 'User' ,'/user'],
   
  ]

  const drawer = ref(null)
  //const dialog = ref(false) 
</script>

<script>
   import axios from '../plugins/axios' 
  export default {
    data: () => ({
      
      previousRoute: '',
      drawer: null,
      dialog:false,
      dialogProfil: false,
      dialogEditProfil: false,
      UserConnected:[],
      UserRole:null,
      UserIcon:null,
      fav: true,
      menu: false,
      message: false,
      hints: true,
    }),
    created(){
      this.GetUserConnected();
    },
    mounted(){
        
       },
    methods: {
     
      async GetUserConnected(){
          try{
              
                  const response = await axios.get('/userme');
                  console.log('Données recu avec succès', response.data);
                   this.UserConnected = response.data;               
                   localStorage.setItem("user-info", this.UserConnected.name );  
                   localStorage.setItem("user-info-id", this.UserConnected.id ); 
                   if(this.UserConnected.roles[0] == 
                   "ROLE_ADMIN"){
                    this.UserRole = "ADMIN"
                    this.UserIcon =" mdi-shield-crown-outline"
                   }else{
                     this.UserRole = "USER"
                      this.UserIcon =" mdi-shield-account"
                   }
            }catch (error) {
              if (error.response) {
                  // Le serveur a répondu avec un code d'erreur (ex: 400, 500)
                  console.error('Erreur lors de l\'envoi - Réponse du serveur :', error.response.data);
                } else if (error.request) {
                  // La requête a été envoyée mais aucune réponse n'a été reçue
                  console.error('Erreur lors de l\'envoi - Aucune réponse reçue :', error.request);
                } else {
                  // Quelque chose d'autre a provoqué l'erreur
                  console.error('Erreur lors de l\'envoi', error.message);
                }
            }
    },
        async Logout(){
          try{
            const response = await axios.post('/logout')
            localStorage.clear()
            this.$router.push({name:"login"})
          }catch (error) {
              if (error.response) {
                  // Le serveur a répondu avec un code d'erreur (ex: 400, 500)
                  console.error('Erreur lors de l\'envoi - Réponse du serveur :', error.response.data);
                } else if (error.request) {
                  // La requête a été envoyée mais aucune réponse n'a été reçue
                  console.error('Erreur lors de l\'envoi - Aucune réponse reçue :', error.request);
                } else {
                  // Quelque chose d'autre a provoqué l'erreur
                  console.error('Erreur lors de l\'envoi', error.message);
                }
            }
         

            },
    }
   
};
  
</script>
<style >
.slide-left-enter-active, .slide-left-leave-active {
  transition: transform 0.5s ease;
}

.slide-left-enter, .slide-left-leave-to {
  /* Commence la transition de la gauche à droite */
  transform: translateX(-100%);
}

.slide-left-leave, .slide-left-enter-to {
  /* Termine la transition sur la droite */
  transform: translateX(100%);
}
</style>

 <!-- <v-system-bar>
     
      <v-icon>mdi-square</v-icon>

      <v-icon>mdi-circle</v-icon>

      <v-icon>mdi-check-circle-outline"</v-icon>
      
      <v-icon>mdi-triangle</v-icon>
    </v-system-bar> -->
      <!-- <v-container
       <!-- <v-container
        class="py-8 px-6"
        fluid
        back
    
      >
        <v-row
      >
          <v-col
            v-for="card in cards"
            :key="card"
            cols="12"
            
          >
            <v-card>

              <v-list lines="two" style="background-color: #C0C6C7;">
                <v-list-subheader :title="card" ></v-list-subheader>

                <template v-for="n in 6" :key="n">
                  <v-list-item
                  style="background-color: #D1D0CE;">
                    <template v-slot:prepend>
                      <v-avatar color="grey-darken-1"></v-avatar>
                    </template>

                    <v-list-item-title :title="`Message ${n}`"></v-list-item-title>

                    <v-list-item-subtitle title="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil repellendus distinctio similique"></v-list-item-subtitle>
                  </v-list-item>

                  <v-divider
                    v-if="n !== 6"
                    :key="`divider-${n}`"
                    inset
                  ></v-divider>
                </template>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-container> è-->
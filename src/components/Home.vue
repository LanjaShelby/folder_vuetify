<template>
  <v-app id="inspire">

  
    
   <!-- <v-card
    class="mx-auto"
    max-width="344"
    max-height="100"
  
    title="Disabled card"
    disabled
    link
    
  ></v-card> -->
  
    <div class="text-right position">
    
      <v-icon > mdi mdi-message-badge-outline </v-icon>
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
           :prepend-avatar="getImageUrl(UserConnected.image)"
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
              color="warning"
              prepend-icon= "mdi-account-circle-outline"
              text="Change password"
              class="text-none"
              variant="outlined"
                @click="dialogPassword = true"
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
                         
                          prepend-icon="mdi-phone"
                          :title="UserConnected.phone"
                        ></v-list-item>

                        

                        <v-divider inset></v-divider>

                        <v-list-item
                          prepend-icon="mdi-email"
                          :title="UserConnected.email"
                        ></v-list-item>

                        <v-divider inset></v-divider>

                        <v-list-item
                         
                          prepend-icon="mdi-phone"
                          :title="UserConnected.fonction"
                        ></v-list-item>

                        <v-list-item
                          prepend-icon="mdi-map-marker"
                          :title="userService.libelle_service"
                        ></v-list-item>

                        <v-list-item
                          prepend-icon="mdi-map-marker"
                          :title="userService.secteur"
                        ></v-list-item>
                      </v-list>

                      <v-img
                        height="200"
                        :src="getImageUrl(UserConnected.image)"
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
                                    @click="dialogEditProfil = false"
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

                                            <div class="mb-2">Phone</div>
                                            <v-text-field                
                                            v-model="UserConnected.phone"                                               
                                              label="Another"
                                            ></v-text-field>  
                                            <div class="mb-2">Fonction</div>
                                            <v-text-field                
                                            v-model="UserConnected.fonction"                                               
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
              color="primary"
              prepend-icon= "mdi-account-circle-outline"
              text="Vieuw Profil"
              class="text-none"
              variant="outlined"
                @click="dialogProfil = true"
              flat>  </v-btn>
<!--change password -->
              <v-dialog
                v-model="dialogPassword"
          max-width="600"
              >
                    <v-card
                      
                      max-width="800"
                      
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
                    

                            <v-btn  @click="dialogPassword = false" icon="mdi mdi-close"></v-btn>
                          </v-defaults-provider>
                        </template>
                      </v-card-item>

                      
  <v-sheet class="pa-4 text-center mx-auto" width="300" >

    <v-form ref="form">
      <v-text-field
        v-model="password"
        :counter="10"
        :rules="nameRules"
        label="Password"
        required
      ></v-text-field>
      <v-text-field
        v-model="password2"
        :counter="10"
        :rules="nameRules2"
        label="Confirmer Password"
        required
      ></v-text-field>
     


      <div class="d-flex flex-column">
        <v-btn
          class="mt-4"
          color="success"
          block
          @click="validate"
        >
          Change password
        </v-btn>

        <v-btn
          class="mt-6"
          color="error"
          block
          @click="reset"
        >
          Reset Form
        </v-btn>

        
      </div>
    </v-form>
  </v-sheet>


                      
                    </v-card>              
             </v-dialog>


             <v-dialog
                                  v-model="isSuccess"> 
                                      <v-sheet
                                    
                                        class="pa-4 text-center mx-auto"
                                        elevation="12"
                                        max-width="600"
                                        rounded="lg"
                                        width="100%"
                                      >
                                        <v-icon
                                          class="mb-5"
                                          color="success"
                                          icon="mdi-check-circle"
                                          size="112"
                                        ></v-icon>

                                        <h2 class="text-h5 mb-6">Password changed succesfully</h2>

                                  

                                        <v-divider class="mb-4"></v-divider>

                                        <div class="text-end">
                                          <v-btn
                                            class="text-none"
                                            color="success"
                                            variant="flat"
                                            width="90"
                                            rounded
                                            @click="isSuccess=false"
                                          >
                                            Done
                                          </v-btn>
                                        </div>
                                </v-sheet>
              </v-dialog>


                         
                              <v-dialog
                                  v-model="isFailed"> 
                                      <v-sheet
                                    
                                        class="pa-4 text-center mx-auto"
                                        elevation="12"
                                        max-width="600"
                                        rounded="lg"
                                        width="100%"
                                      >
                                        <v-icon
                                          class="mb-5"
                                          color="red"
                                          icon="mdi mdi-alert-circle-outline"
                                          size="112"
                                        ></v-icon>

                                        <h2 class="text-h5 mb-6">Password changed failed</h2>
                                        <br>
                                        <p 
                                             v-if="errorMessages != '' ">
                                             {{errorMessages}}

                                          </p>
                                          <p 
                                             v-if="IncompletMessage!= '' ">
                                             {{IncompletMessage }}

                                          </p>
                                          <br>

                                        <p class="mb-4 text-medium-emphasis text-body-2">
                                        Please check the message and try again

                                          <br>

                                          If the problem persists contact the administrator at your service level
                                        </p>
                                          

                                       
                                        <v-divider class="mb-4"></v-divider>

                                        <div class="text-end">
                                          <v-btn
                                            class="text-none"
                                            color="red"
                                            variant="flat"
                                            width="90"
                                            rounded
                                            @click="isFailed=false"
                                          >
                                            Done
                                          </v-btn>
                                        </div>
                                </v-sheet>
                              </v-dialog>
     <!--change password -->


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
      <div class="d-flex flex-row"
      @click="dialog = !dialog">
       <div >
      <v-avatar class="mb" size="84" >
          <v-img alt="Avatar" src="http://127.0.0.1:8000/files/logo.png" ></v-img>
      </v-avatar>
      <v-img alt="Avatar" class="mt-2" width="90" src="http://127.0.0.1:8000/files/DGSR.png" ></v-img>
    </div>
    <v-img alt="Avatar" class="mb-" width="150" src="http://127.0.0.1:8000/files/share.png" ></v-img>
  </div> 
  
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
          
           block></v-btn>
           
           <v-btn
          prepend-icon="mdi-newspaper-variant-outline"
          text="Notification"
          to="/admin/notification"
          class="mb-2"
           rounded="xl"
           block>
           Notification
           <v-badge
            color="error"
            floating
            inline
          > </v-badge>
          </v-btn> 
       

           <v-btn
          prepend-icon="mdi-inbox-arrow-down"
          text="Inbox"
          to="/admin/inbox"
          class="mb-2"
           rounded="xl"
          
           block>
           <template v-slot:append>
        <v-badge
          color="error"
          :content="count"
          inline
        ></v-badge>
      </template>
          </v-btn>

        </v-list-item> 
       
          <!--
        <v-list-item v-for="[icon, text, route] in links" :key="text">
      <v-badge
        v-if="text === 'Notification' || text === 'Inbox'"
        color="red"
        :content="2"
              
      >
        <v-btn
          :prepend-icon="icon"
          :text="text"
          :to="route"
          class="mb-6"
          rounded="xl"
          variant="tonal"
          block
        >
          
        </v-btn>
      </v-badge>

      <v-btn
        v-else
        :prepend-icon="icon"
        :text="text"
        :to="route"
        class="mb-2"
        rounded="xl"
        variant="tonal"
        block
      >
       
      </v-btn>
    </v-list-item>
        
          -->  
        
     
        <div class="pa-4 text-end">
       
        
        </div>
      </v-list>
      <v-divider></v-divider>
     
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
    ['mdi-account-circle-outline', 'User' ,'/admin/user'],
    
    ['mdi-send', 'New Message' , '/admin/send'],  
    ['mdi-account-circle-outline', 'Send' ,'/admin/envoyer'],
    
    ['mdi-timeline-text-outline', 'History' ,'/admin/history'],
// ['mdi-account-circle-outline', 'Boite' ,'/admin/boite'],
   
  ]
  const items = ref([
        {  title: '  Réçu' , route: '/admin/notification' },
        { title: 'Suivi', route: '/admin/envoyer'},

  ])

  const drawer = ref(null)
  //const dialog = ref(false) 
</script>

<script>
   import axios from '../plugins/axios' 
   import socket from '../plugins/socket';
  export default {
    data: () => ({
      UserConnectedService:null,
      count:null,
      userService:[],
      isSuccess:false,
      isFailed : false,
      password: '',
      nameRules: [
        v => !!v || 'Password is required',
        v => (v && v.length <= 10) || 'PAssword must be 8 characters or less',
      ],
      password2: '',
      nameRules2: [
        v => !!v || 'Confirmation Password is required',
        v => (v && v.length <= 10) || 'Confirmation Password must be 8 characters or less',
      ],

      previousRoute: '',
      drawer: null,
      dialog:false,
      dialogPassword:false,
      dialogProfil: false,
      dialogEditProfil: false,
      UserConnected:[],
      UserRole:null,
      UserIcon:null,
      fav: true,
      menu: false,
      message: false,
      hints: true,
      serviceId:null
    }),
    created(){
      this.GetUserConnected();
      this.UserConnected = localStorage.getItem("user-role");
             if(this.UserConnected == "USER") {
              this.$router.push({name:"userinbox"});
             
             }else{
               if(!this.UserConnected){
                  this.$router.push({name:"login"});  }
             }
     

    },
    mounted(){

      socket.on('new_message', (data) => {
        this.count = Number(this.count) + 1 ;
      }),

      this.UserConnectedService = localStorage.getItem("user-info-service");
      this.GetCount();
      /*this.UserConnected = localStorage.getItem("user-role");
             if(this.UserConnected == "USER") {
              this.$router.push({name:"userinbox"});
             
             }else{
               if(!this.UserConnected){
                  this.$router.push({name:"login"});  }
             }*/
       },
    methods: {
      async validate () {
        const { valid } = await this.$refs.form.validate()

        if (valid) {
          if(this.password == this.password2){
              try{
                const response = await axios.post("/password/change", {
          //current_password: this.currentPassword,
                                    new_password: this.password,
                                    confirm_password: this.password2,
                                  })
                                  .then((response) => {
                                   
                                  this.isSuccess=true;
                                  this.dialogPassword = false;
                                  console.log(response);
                                  })
                                  .catch((error) => {
                      // Gérer l'erreur
                                    if (error.response) {
                                      console.error('Erreur lors de l\'envoi - Réponse du serveur :', error.response.data);
                                      this.isFailed= true;
                                      this.errorMessages =   error.response.data ;
                                    } else {
                                      console.error('Erreur lors de l\'envoi:', error.message);
                                      this.isFailed = true;
                                      this.errorMessages =   error.message;
                                    }  });

                                  
                                
                              
              }catch(error){
                console.log(response); 
                this.reset;
                                  this.dialogPassword = false;
              }
            
          }else{
            console.log('Mdp isnt valid')
            this.isFailed= true;
            this.errorMessages =   "Password not identical";
          }
        }
      },
      reset () {
        this.$refs.form.reset()
      },
     async GetCount(){
              try{
                ;
                const formData = new FormData();
         formData.append("service",this.UserConnectedService);
         
         const response = await axios.post('/countmessage', formData);
          this.count = response.data.length;       
            console.log("messsages get" , this.count);
            console.log("messsages service" , this.UserConnectedService);  
              }catch(error){

              }
     },
      async GetUserConnected(){
          try{
              
                  const response = await axios.get('/userme');
                  console.log('Données recu avec succès', response.data);
                   this.UserConnected = response.data;    
                    
                   console.log(this.UserConnected);          
                   localStorage.setItem("user-info", this.UserConnected.name );  
                   localStorage.setItem("user-info-id", this.UserConnected.id ); 

                  const serviceIri = response.data.service;
                   this.serviceId = serviceIri.split('/').pop();
                  console.log('Service ID:', this.serviceId);
                   localStorage.setItem("user-info-service",  this.serviceId ); 

                   const responseService = await axios.get(`/servicess/${this.serviceId}`);
                  this.userService = responseService.data;
                   console.log(this.userService);

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
    getImageUrl(imageName) {
      return `http://127.0.0.1:8000/files/UserImage/${imageName}`; // Remplacez par l'URL correcte
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

/*const eventSource = new EventSource("{{ mercure('https://example.com/books/1')|escape('js') }}");
eventSource.onmessage = event => {
    // Will be called every time an update is published by the server
    console.log(JSON.parse(event.data) + "mercure");
}*/
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
.v-list-item {
  cursor: pointer;
}
</style>

 <!-- 

 <v-system-bar>
     
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
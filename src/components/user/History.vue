<template>

    <v-container
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

              <v-list lines="one" style="background-color: #C0C6C7;">
                <v-list-subheader :title="card" ></v-list-subheader>

                <template v-for="Message in Messages" :key="Message">
                    <v-list-item
                    style="background-color:#F5F5F5;">
                      <template v-slot:prepend>
                        <v-avatar color="grey-darken-1"></v-avatar>
                      </template>
                         <h1>  {{Message.sender.name}} @<h6> {{Message.created_at}}</h6> </h1>
                         <h1>  {{Message.title}} </h1>
                         <p>
                      {{Message.message}}          
                         </p> 
                         
                        <v-chip-group
                            variant="flat"
                            mandatory
                          >
                             <v-chip 
                             v-for='file in Message.files ' :key="file"
                              class="me-2"
                              color="deep-purple-accent-4"
                              size="small"
                              label> Filename: {{ file.path}}
                            </v-chip>
                         </v-chip-group>
              
                         <div class="d-flex justify-space-around " style="padding:20px;">
                        
  
              
  
                        <!-- Share -->
                            <v-btn color="primary"
                                append-icon="mdi-share-variant-outline"
                                end            
                                @click="SelectMessage(Message)"
                              >  Share                           
                                <v-dialog activator="parent" max-width="500">
                                  <template v-slot:default="{ isActive }">
                                    <v-card rounded="lg">
                                      <v-card-title class="d-flex justify-space-between align-center">
                                        <div class="text-h5 text-medium-emphasis ps-2">
                                          Share the message
                                        </div>
                                      <v-btn
                                          icon="mdi-close"
                                          variant="text"
                                          @click="isActive.value = false"
                                        ></v-btn>
                                      </v-card-title>
  
                                      <v-divider class="mb-4"></v-divider>
  
                                      <v-card-text>
                                        <div class="mb-2">Destinataire</div>
                                        <div class="text-medium-emphasis mb-4">
                                          <v-select
                                              v-model="select"
                                              :hint="`${select.text}, ${select.value}`"
                                              :items="userOptions"
                                              item-title="text"
                                              item-value="value"
                                            
                                              label="Destinataire"
                                              placeholder="Select..."
                                              prepend-icon="mdi-card-account-mail"
                                              persistent-hint
                                              return-object
                                              single-line  
                                              required 
                                          ></v-select>
                                        </div>
  
                                        <div class="mb-2">Message</div>
  
                                        <v-textarea
                                            ref="message"
                                              prepend-icon="mdi-comment"
                                              hint="Contenue du message"
                                              clear-icon="mdi-close-circle"
                                              label="Text"
                                              model-value="This is clearable text."
                                              clearable
                                              counter="325"
                                              required
                                              placeholder="Votre message"
                                              v-model="this.clickMessage.message"
                                              :rules="[
                                              () => !!this.clickMessage.message || 'This field is required',
                                              () => !!this.clickMessage.message && this.clickMessage.message.length <= 325 || 'Message must be less than 325 characters',
                                                      messageCheck
                                                  ]"
                                          ></v-textarea>

                                          <v-chip-group
                                                variant="flat"
                                                mandatory
                                              >
                                                <v-chip 
                                                v-for='file in this.clickMessage.files ' :key="file"
                                                v-model="this.clickMessage.files"
                                                  class="me-2"
                                                  color="deep-purple-accent-4"
                                                  size="small"
                                                  label> Filename: {{ file.path}}
                                                </v-chip>
                                            </v-chip-group>

                               
                                      </v-card-text>
  
                                      <v-divider class="mt-2"></v-divider>
  
                                      <v-card-actions class="my-2 d-flex justify-end">
                                        <v-btn
                                          class="text-none"
                                          rounded="xl"
                                          text="Cancel"
                                          @click="isActive.value = false"
                                        ></v-btn>
  
                                        <v-btn
                                          class="text-none"
                                          color="primary"
                                          rounded="xl"
                                          text="Send"
                                          variant="flat"
                                          @click="isActive.value = false"
                                        ></v-btn>
                                      </v-card-actions>
                                    </v-card>
                                  </template>
                                </v-dialog>
                              </v-btn>
  
                              
  
  
  
                              <!-- Delete -->
                                    <v-dialog
                                      transition="dialog-bottom-transition" 
                                      width='auto'                              
                                    >
                                      <template v-slot:activator="{ props: activatorProps }">
                                        <v-btn
                                        v-bind="activatorProps"                                 
                                         color="red" > Delete
                                          <v-icon icon="mdi-delete-outline"></v-icon> 
                                       </v-btn>
                                    </template>
  
                                    <template v-slot:default="{ isActive }">
                                      <v-card>
                                        <v-toolbar color="red" title="Delete"> <v-icon icon="mdi-delete-outline" start ></v-icon> </v-toolbar>
  
                                        <v-card-text class="text-h2 pa-12">
                                          Would you like delete ?
                                        </v-card-text>
  
                                        <v-card-actions class="justify-end">
                                          <v-btn
                                            text="Yes"
                                            @click="isActive.value = false"
                                          ></v-btn>
                                          <v-btn
                                            text="No"
                                            @click="isActive.value = false"
                                          ></v-btn>
                                        </v-card-actions>
                                      </v-card>
                                    </template>
                                  </v-dialog>
                          </div>
                    </v-list-item>
  
                    <v-divider
                    
                      inset
                    ></v-divider>
                  </template>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
  


    
    </v-container> 

   
   </template>
   
   
   <script setup>
     import { ref } from 'vue';
   
     const cards = ['History']
     const links = [
    ['mdi-inbox-arrow-down', 'Inbox' ,'/'],
    ['mdi-send', 'Send' , '/send'],
    ['mdi-timeline-text-outline', 'History' ,'/history'],
   
  ]
   
     const drawer = ref(null)
   </script>
   
   <script>
    import axios from '../../plugins/axios'  
     export default {
       data: () => ({
         cards: ['History'],
         drawer: null,
         dialog:false,
         links: [
           ['mdi-inbox-arrow-down', 'Inbox'],
           ['mdi-send', 'Send'],
           ['mdi-delete', 'Trash'],
           ['mdi-alert-octagon', 'Spam'],
         ],
         UserConnectedId:null,
         UserConnected:null,
         clickMessage:{},
          select:"",
          selectedUser:null,
          userOptions: [],
         Messages:[],
          UserConnectedId:null,
          UserConnectedService:null,
          UserConnected:null,
          olderMessages: []
       }),
         mounted(){
            this.UserConnectedId = localStorage.getItem("user-info-id")
             this.UserConnected = localStorage.getItem("user-info");
             this.UserConnectedService = localStorage.getItem("user-info-service");
             this.GetMessages();
             this.GetUser();
       },
       methods:{
        groupMessagesByDate() {
          const today = new Date().toISOString().split('T')[0]; // Date actuelle
      const yesterday = new Date(Date.now() - 864e5).toISOString().split('T')[0]; // Date d'hier

          this.olderMessages = this.Messages.filter(msg => {
        const messageDate = msg.created_at.split(' ')[0];
        return messageDate !== today && messageDate !== yesterday;
      });
        
        },
        async  GetMessages(){
          console.log(this.UserConnectedService);
           const formData = new FormData();
           formData.append("service",this.UserConnectedService);  
           const response = await axios.post('/itemgetmessage', formData);
            this.Messages = response.data;               
           
          this.groupMessagesByDate();
       },
       async GetUser(){
        const response = await axios.get('/userss');
        this.Destinatairesss = response.data['hydra:member'];
      
        this.userOptions = this.Destinatairesss
        .filter(user => Number(user.id ) !== Number(this.UserConnectedId))
        .map(user => ({
            value: user.id,  // Ce qui sera retourné comme valeur
            text: user.name // Ce qui sera affiché dans le select
          }));
      
         
       },

       }
     }
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
   
         <v-icon>mdi-triangle</v-icon>
       </v-system-bar> 
   
       <v-navigation-drawer v-model="drawer">
         <v-sheet
           class="pa-4"
           color="#1569C7"
         >
           <v-avatar
             class="mb-4"
             color="grey-darken-1"
             size="64"
           ></v-avatar>
   
           <div>john@google.com</div>
         </v-sheet>
   
         <v-divider></v-divider>
      
         <v-list>
           <v-list-item
             v-for="[icon, text] in links"
             :key="icon"
             :prepend-icon="icon"
             :title="text"
             link
           ></v-list-item>
         </v-list>
     
   
       </v-navigation-drawer>-->
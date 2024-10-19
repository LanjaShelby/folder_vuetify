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
      <v-card ref="form">
        <v-card-text>
          <v-text-field
            ref="Objet"
            v-model="Objet"
            hint="Objet de message"
            label="Objet"
            placeholder="...."
            variant="outlined"
            prepend-icon="mdi-opera"
            :rules="[() => !!Objet || 'This field is required']"
            required
          ></v-text-field>
         
        
           <v-select
              v-model="selectService"
              :hint="`${selectService.text}, ${selectService.value}`"
              :items="ServiceOptions"
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
            v-model="message"
            :rules="[
            () => !!message || 'This field is required',
            () => !!message && message.length <= 325 || 'Message must be less than 325 characters',
                    messageCheck
                ]"
          ></v-textarea>

          <v-file-input
          ref="fichier"
            v-model="files"
            :show-size="1000"
            color="deep-purple-accent-4"
            label="File input"
            placeholder="Select your files"
            prepend-icon="mdi-paperclip"
            variant="outlined"
            counter
            multiple
                      >
              <template v-slot:selection="{ fileNames }">
                <template v-for="(fileName, index) in fileNames" :key="fileName">
                  <v-chip
                    v-if="index < 2"
                    class="me-2"
                    color="deep-purple-accent-4"
                    size="small"
                    label
                  >
                    {{ fileName }}
                  </v-chip>

                  <span
                    v-else-if="index === 2"
                    class="text-overline text-grey-darken-3 mx-2"
                  >
                    +{{ files.length - 2 }} File(s)
                  </span>
                </template>
              </template>
            </v-file-input>
           
</v-card-text>
<v-alert
    v-if="errorMessages != '' "
    density="compact"
    :title="errorMessages"
    type="warning"
  ></v-alert>
        <v-divider class="mt-12"></v-divider>
<v-card-actions>
          <v-btn 
          variant="text"
          @click="resetForm"
         >
            Cancel
          </v-btn>
          <v-spacer></v-spacer>
         
          <v-btn
            color="primary"
            variant="text"
            @click="submit"
          >
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
 </v-container>   
 
     
   </template>
   
   
   <script setup>
     import { ref } from 'vue';
  // const errorMessages = "";
     const cards = ['Today', 'Yesterday']
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
        select:"",
        selectService:"",
         cards: ['Today', 'Yesterday'],
         drawer: null,
         dialog:false,
         links: [
           ['mdi-inbox-arrow-down', 'Inbox'],
           ['mdi-send', 'Send'],
           ['mdi-delete', 'Trash'],
           ['mdi-alert-octagon', 'Spam'],
         ],
        
        Destinatairess:null,
        DestinataireService:null,
          Destinataire:null,
          Objet:null,
          files: [],
          message:null,
          errorMessages: '',
          formHasErrors: false,
          selectedUser:"",
          ServiceOptions:[],
          userOptions: [],
           Messages:[],
           UserConnectedId:null,
           UserConnectedService:null,
           Sender:null,
       }),
       computed: {
          form () {
            return {
              sender:this.UserConnectedId,
              recipient: String(this.selectService.value) ,
              message: this.message,
              title: this.Objet,
              files:this.files
            }
            },
          
          },
        
      mounted(){
            this.UserConnectedId = localStorage.getItem("user-info-id")
            this.UserConnectedService = localStorage.getItem("user-info-service")
            this.GetUser();
           this.GetService();

          },

       methods: {
        async GetService(){
        const response = await axios.get('/servicess');
        this.DestinataireService = response.data['hydra:member'];
        console.log( this.DestinataireService);
        this.ServiceOptions = this.DestinataireService
        .filter(service => Number(service.id) !== Number(this.UserConnectedService))
        .map(service => ({
            value: service.id,  // Ce qui sera retourné comme valeur
            text: service.libelle_service // Ce qui sera affiché dans le select
          }));
          console.log("OptionsServuce filtrées:", this.ServiceOptions);
          
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
          console.log("Options filtrées:", this.userOptions);
         ;
       },

           DestinataireProps (User) {
            return {
              name: User.name,
              id: User.id,
            }},
          messageCheck () {
            this.errorMessages = !this.message
              ? `Hey! I'm required`
              : ''

            return true
          },
          resetForm () {
            this.errorMessages = "";
         
            Object.keys(this.form).forEach(f  => {
              this.$ref[f].reset()
        })
          },
          async submit () {
            console.log(this.form)
           try
           { this.formHasErrors = false
            for (let f in this.form) {
                    if (!this.form[f]) {
                      this.errorMessages = "Formulaire error";
                      this.formHasErrors = true;
                      break; 
                    }
                  }                 
            if (this.formHasErrors) {
              return; // stoppe l'exécution de la fonction
            }
         
            const formData = new FormData();
            formData.append('sender', this.UserConnectedId);
            formData.append('recipient', String(this.selectService.value));
            formData.append('message', this.message);
            formData.append('title', this.Objet);
              this.files.forEach((file, index) => {
                formData.append(`files[${index}]`, file);  // 'files' est le champ attendu côté serveur
              });
            
            const response = await axios.post("/sendmessage" ,formData)
            .then((response) => {
                // Gérer la réponse de succès
                console.log('Success:', response.data);
              })
              .catch((error) => {
                // Gérer l'erreur
                if (error.response) {
                  console.error('Erreur lors de l\'envoi - Réponse du serveur :', error.response.data);
                } else {
                  console.error('Erreur lors de l\'envoi:', error.message);
                }  });

      
         
                

                
          } catch (error) {
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
        },
     }
       /*Object.keys(this.form).forEach(f => {
              if (!this.form[f])  this.errorMessages = "Formulaire error"
              this.formHasErrors = true
       
            })*/
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
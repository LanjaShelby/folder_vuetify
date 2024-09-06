<template>
    <v-app id="inspire">
   
       <v-main>          
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
            ref="Destinataire"
            v-model="Destinataire"
            :item-props="DestinataireProps"  
            :items="Destinataires" 
            :rules="[() => !!Destinataire || 'This field is required']"
            label="Destinataire"
            placeholder="Select..."
            prepend-icon="mdi-card-account-mail"
            hint="Destinataire du message"
            required>
          </v-select>
    
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


       </v-main>
     </v-app>
   </template>
   
   
   <script setup>
     import { ref } from 'vue';
  // const errorMessages = "";
     const cards = ['Today', 'Yesterday']
     const links = [
       ['mdi-inbox-arrow-down', 'Inbox'],
       ['mdi-send', 'Send'],
       ['mdi-delete', 'Trash'],
       ['mdi-alert-octagon', 'Spam'],
     ]
   
     const drawer = ref(null)
   </script>
   
   <script>
     export default {
       data: () => ({
         cards: ['Today', 'Yesterday'],
         drawer: null,
         links: [
           ['mdi-inbox-arrow-down', 'Inbox'],
           ['mdi-send', 'Send'],
           ['mdi-delete', 'Trash'],
           ['mdi-alert-octagon', 'Spam'],
         ],
         Destinataires: [{
          name: 'John',
          department: 'Marketing',
        },
        {
          name: 'Jane',
          department: 'Engineering',
        },],

          Destinataire:null,
          Objet:null,
          files: [],
          message:null,
          errorMessages: '',
          formHasErrors: false,
       }),
       computed: {
          form () {
            return {
            
              Destinataire:this.Destinataire,
              message: this.message,
              Objet: this.Objet,
              files:this.files
            }
            },
          
          },

       methods: {
           DestinataireProps (User) {
            return {
              title: User.name,
              subtitle: User.department,
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
          submit () {
            this.formHasErrors = false

            Object.keys(this.form).forEach(f => {
              if (!this.form[f])  this.errorMessages = "Formulaire error"

              console.log(this.form);
              console.log(this.errorMessages);
            })
          },
        },
     }
     </script>
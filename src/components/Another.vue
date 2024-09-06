<template>
  <v-app color="basil">
    <v-card-title class="text-center justify-center py-6">
      <h1 class="font-weight-bold text-h2 text-basil">
        BASiL
      </h1>
    </v-card-title>

    <v-tabs
      v-model="tab"
      bg-color="transparent"
      color="basil"
      grow
    >
      <v-tab
        v-for="item in items"
        :key="item"
        :text="item"
        :value="item"
      ></v-tab>
    </v-tabs>

    <v-tabs-window v-model="tab">
      <v-tabs-window-item
        v-for="item in items"
        :key="item"
        :value="item"
      >
      
      <v-container
      v-if="item == 'Inbox'"
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

                <template v-for="n in 3" :key="n">
                  <v-list-item
                  style="background-color:#F5F5F5;">
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
      </v-container>
       
      <v-container
      v-if="item == 'Send'"
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
            ref="objet"
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
            ref="destinataire"
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
    v-if="errorMessages"
    density="compact"
    :title="errorMessages"
    type="warning"
  ></v-alert>
        <v-divider class="mt-12"></v-divider>
<v-card-actions>
          <v-btn variant="text">
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
      </v-tabs-window-item>
    </v-tabs-window>
  </v-app>
</template>
<script setup>
  import { ref } from 'vue';

  const cards = ['Today', 'Yesterday']
  const links = [
    ['mdi-inbox-arrow-down', 'Inbox'],
    ['mdi-send', 'Send'],
    ['mdi-timeline-text-outline', 'History'],
    ['mdi-alert-octagon', 'Spam'],
  ]

  const drawer = ref(null)
  //const dialog = ref(false) 
</script>
<script>
  export default {
    data () {
      return {
        tab: 'Inbox',
        items: [
          'Inbox', 'Send', 'History',
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
      }
    },
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
        this.errorMessages = []
        this.formHasErrors = false

        Object.keys(this.form).forEach(f => {
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
<style>
/* Helper classes */
.bg-basil {
  background-color: #FFFBE6 !important;
}
.text-basil {
  color: #356859 !important;
}
</style>
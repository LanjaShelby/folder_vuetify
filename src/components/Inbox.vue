<template>
    <v-app id="inspire">
   
       <v-main>
        
      
      <v-row
      >
          <v-col
            cols="12"
          >
            <v-card>

              <v-list lines="one" style="background-color: #C0C6C7;">
                <v-list-subheader :title="'Today' +', '+ todayDate " ></v-list-subheader>

                <template v-for="n in 3" :key="n">
                  <v-list-item
                  style="background-color:#F5F5F5;">
                    <template v-slot:prepend>
                      <v-avatar color="grey-darken-1"></v-avatar>
                    </template>
                       <h1> Name of user </h1>
                       <p>
                      corrupti dolorum laborum asperiores a. Message <br>
                      Lorem ipsum dolor, sit amet consectetur adipisicing el
                      corrupti dolorum laborum asperiores a. Message <br>
                      quod accusantium, minus a itaque est veniam harum 
                      corrupti dolorum laborum asperiores a. Message <br>
                        message          
                       </p> 
                       
                      <v-chip-group
                          variant="flat"
                          mandatory
                        >
                           <v-chip 
                           v-for='n in 3 ' :key="n"
                            class="me-2"
                            color="deep-purple-accent-4"
                            size="small"
                            label>Filename
                          </v-chip>
                       </v-chip-group>
            
                       <div class="d-flex justify-space-around " style="padding:20px;">
                      

                        <v-btn color="primary"
                              append-icon="mdi-message-reply-outline" end            
                            >  Reply                          
                              <v-dialog activator="parent" max-width="500">
                                <template v-slot:default="{ isActive }">
                                  <v-card rounded="lg">
                                    <v-card-title class="d-flex justify-space-between align-center">
                                      <div class="text-h5 text-medium-emphasis ps-2">
                                        Reply the message
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
                                        <v-text-field
                                        prepend-icon="mdi-card-account-mail"
                                              model-value="Destinataire"
                                              readonly
                                            ></v-text-field>
                                         </div>
                                      <div class="mb-2">Statut</div>
                                      <div class="text-medium-emphasis mb-4">
                                        <v-select 
                                              ref="Destinataire"
                                              v-model="Statut"
                                              :item-props="statut"  
                                              :items="statut" 
                                              :rules="[() => !!Statut || 'This field is required']"
                                              label="Destinataire"
                                              placeholder="Select..."
                                              prepend-icon="mdi-card-account-mail"
                                              hint="Destinataire du message"
                                              required>
                                            </v-select>
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
                                            v-model="message"
                                            :rules="[
                                            () => !!message || 'This field is required',
                                            () => !!message && message.length <= 325 || 'Message must be less than 325 characters',
                                                    messageCheck
                                                ]"
                                        ></v-textarea>
                             
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
                      




                      <!-- Share -->
                          <v-btn color="primary"
                              append-icon="mdi-share-variant-outline" end            
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
                                            v-model="message"
                                            :rules="[
                                            () => !!message || 'This field is required',
                                            () => !!message && message.length <= 325 || 'Message must be less than 325 characters',
                                                    messageCheck
                                                ]"
                                        ></v-textarea>
                             
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
                    v-if="n !== 6"
                    :key="`divider-${n}`"
                    inset
                  ></v-divider>
                </template>
              </v-list>
            </v-card>
          </v-col>
          <v-col
            cols="12"
          >
            <v-card>

              <v-list lines="two" style="background-color: #C0C6C7;">
                <v-list-subheader :title="'Yesterday' +', '+ yesterdayDate " ></v-list-subheader>

                <template v-for="n in 3" :key="n">
                  <v-list-item
                  style="background-color:#F5F5F5;">
                    <template v-slot:prepend>
                      <v-avatar color="grey-darken-1"></v-avatar>
                    </template>
                       <h1> Name of user </h1>
                       <p>
                      corrupti dolorum laborum asperiores a. Message <br>
                      Lorem ipsum dolor, sit amet consectetur adipisicing el
                      corrupti dolorum laborum asperiores a. Message <br>
                      quod accusantium, minus a itaque est veniam harum 
                      corrupti dolorum laborum asperiores a. Message <br>
                        message          
                       </p> 
                       
                      <v-chip-group
                          variant="flat"
                          mandatory
                        >
                           <v-chip 
                           v-for='n in 3 ' :key="n"
                            class="me-2"
                            color="deep-purple-accent-4"
                            size="small"
                            label>Filename
                          </v-chip>
                       </v-chip-group>
            
                       <div class="d-flex justify-space-around " style="padding:20px;">
                        <v-btn color="primary">Reply 
                             <v-icon icon="mdi-message-reply-outline" end></v-icon>
                          </v-btn>
                          <v-btn color="primary">Share
                            <v-icon  icon="mdi-share-variant-outline" end></v-icon>
                             </v-btn>
                          <v-btn color="red"> Delete
                             <v-icon icon="mdi-delete-outline"></v-icon> 
                             </v-btn>
                          
                        </div>


                  </v-list-item>

                </template>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      
   
       
       </v-main>
     </v-app>
   </template>
   
   
   <script setup>
     import { ref } from 'vue';
   
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
          reply:[
            ['Reçu','primary'],
            ['Incomplet','warning'],
            ['Non-Conforme', 'red']
          ],
          statut:[
            'Reçu',
            'Incomplet',
            'Non-Conforme'
          ],
          todayDate: '',
          yesterdayDate:'',
          overlay: false,
          Destinataires: [{
          name: 'John',
          department: 'Marketing',
        },
        {
          name: 'Jane',
          department: 'Engineering',
        },],
          Statut:null,
          Destinataire:null,
          message:null,
       }),
     created() {
          this.getTodayDate();
          this.getYesterdayDate();
             },
     methods: {
       getTodayDate() {
            const today = new Date();
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            this.todayDate = today.toLocaleDateString('fr-FR', options);
          },
      getYesterdayDate() {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            this.yesterdayDate = yesterday.toLocaleDateString('fr-FR', options);
          },
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
        }
     }
     </script>
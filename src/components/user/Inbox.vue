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
            <v-card >

              <v-list lines="one" style="background-color: #C0C6C7;">
                <v-list-subheader :title="'Today' +', '+ todayDate " ></v-list-subheader>

                <template v-for="Message in todayMessages" :key="Message" ">

                  <v-list-item
                  @click="openDialog(Message)"
                  :class="{'unread-message': !Message.is_read, 'read-message': Message.is_read}"
            
                  
                  >
                    <template v-slot:prepend>
                      <v-avatar size="x-large" > <v-icon icon="mdi-account-circle"></v-icon></v-avatar>
                    </template>
                         
                      <p class="font-weight-medium  text-h5 ">
                            <span style="font-size: 25px;" :class= "{'mdi mdi-shield-crown-outline text-error': Message.sender.roles[0] == 'ROLE_ADMIN','mdi mdi-shield-account-outline text-primary' :Message.sender.roles[0] == 'ROLE_USER'}" >                   
                               
                          </span> 
                            {{Message.sender.name}}
                              <span style="font-size: 25px;" :class= "{'mdi mdi-shield-crown-outline text-error' : Message.sender.roles[0] == 'ROLE_ADMIN','mdi mdi-shield-account-outline text-primary' :Message.sender.roles[0] == 'ROLE_USER'}" >   
                          </span> 

                          <strong >-</strong> {{Message.senderService}}
                          
                          <span class="font-weight-light text-h6">{{relativeTime( Message.created_at ) }} </span>
                          
                          <span > 
                                  <v-icon   :icon="Message.is_read ? 'mdi mdi-check-circle-outline' : 'mdi mdi-check-circle'" size="25" /> <v-icon :icon="Message.is_read ? 'mdi mdi-check-circle-outline' : 'mdi mdi-check-circle'" size="25" />                                  
                          </span>

                      </p>
                         <!-- <h1 class="text-overline">
                          <span class="text-decoration-underline" >From Service</span> : {{Message.senderService}}
                        </h1>
                   
                       <h1 class="text-overline">
                      <span class="text-decoration-underline" >Subject</span> : {{Message.title}}
                        </h1> -->
                       <p  class="d-inline-flex align-items-center"> 
                          <h1 class="text-overline">
                           <span class="text-decoration-underline" >Subject</span> : {{Message.title}}
                        </h1>
                        <v-chip color="secondary">
                         {{Message.files.length}} Files
                        </v-chip>

                       </p>
                   <br>
                        <v-badge
                            :content="ReplyCounts[Message.id]"
                            color="primary"
                            overlap
                            bordered
                            v-if="ReplyCount[Message.id] > 0"
                          >
                        <v-btn class="ma-2 absolute" color="info"  @click ="replyMessage(Message)"
                        >
                          <v-icon icon="mdi mdi-message-reply-text-outline" ></v-icon> 
                          </v-btn> 
                        </v-badge>
                        <v-btn class="ma-2 absolute" v-else color="info"  @click ="replyMessage(Message)"
                        >
                          <v-icon icon="mdi mdi-message-reply-text-outline" ></v-icon> 
                          </v-btn> 
                         

                        <!--   <v-chip-group
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

                      CONTENT MESSAGE -->
                      <v-dialog
                             v-model="isDialogOpen"
                                    transition="dialog-bottom-transition" 
                                    width='100vh' 
                                    class="justify-center"                             
                                  >
                                  
                                        <v-card
                                        class="mx-auto"
                                        color="#FFFFFF"
                                        max-width="650"
                                        min-height="350"
                                        theme="dark"
                                        variant="flat"
                                      >
                                        <v-sheet color="#C77416">
                                          <v-card-item>
                                            <template v-slot:prepend>
                                              <v-card-title>
                                                <v-avatar >
                                                  <v-icon icon="mdi-account-circle"></v-icon>
                                                </v-avatar>

                                               {{clickMessage.sender.name}}
                                              </v-card-title>
                                            </template>

                                            <v-divider class="mx-2" vertical></v-divider>                                      
                                            <template v-slot:append>
                                              <v-btn
                                                icon="$close"
                                                size="large"
                                                variant="text"
                                                 @click ="isDialogOpen = false"
                                              ></v-btn>
                                            </template>
                                          </v-card-item>
                                        </v-sheet>

                                        <v-card
                                          class="ma-4"
                                          color="#2f3136"
                                          rounded="lg"
                                          variant="flat"
                                        >
                                          <v-card-item>
                                            <v-card-title class="text-body-2 d-flex align-center">
                                              <v-icon
                                                color="#949cf7"
                                                icon="mdi-calendar"
                                                start
                                              ></v-icon>

                                              <span class="text-medium-emphasis font-weight-bold">{{clickMessage.created_at.split(' ')[0]}} -{{clickMessage.created_at.split(' ')[1]}}</span>

                                              <v-spacer></v-spacer>

                                            

                                             
                                            </v-card-title>

                                            <div class="py-2">
                                              <div class="text-h6">{{clickMessage.title}}:</div>

                                              <div class="font-weight-light text-medium-emphasis">
                                                {{clickMessage.message}}
                                              </div>
                                            </div>
                                          </v-card-item>

                                          <v-divider></v-divider>

                                          <div class="pa-4 d-flex align-center">
                                            <div class="text-h6">Files:</div>
                                            <v-chip-group
                                              variant="flat"
                                             column
                                            class="pa-2"
                                            >
                                              <v-chip 
                                              v-for='file in this.clickMessage.files ' :key="file"
                                              v-model="this.clickMessage.files"
                                                class="me-2"
                                                color="deep-purple-accent-4"
                                                size="small"
                                                label> {{ file.path}}
                                              </v-chip>
                                          </v-chip-group>
                                          </div>
                                        </v-card>
                                      </v-card>
                        </v-dialog>
<!-- content reply-->
                      <v-dialog
                             v-model="isReplyOpen"
                                    transition="dialog-bottom-transition" 
                                    width='100vh' 
                                    class="justify-center"                             
                                  >
                                  
                                        <v-card
                                        class="mx-auto"
                                        color="#FFFFFF"
                                        width="800"
                                        min-height="200"
                                        variant="flat"
                                        rounded="bg"
                                      >
                                        <v-sheet color="info">
                                          <v-card-item>
                                            <template v-slot:prepend>
                                              <v-card-title>
                                               Reply Message                                     
                                              </v-card-title>
                                            </template>
                                           
                                            <v-divider class="mx-2" vertical></v-divider>  
                                            
                                           
                                            <template v-slot:append>
                                              <v-btn
                                                icon="$close"
                                                size="large"
                                                variant="text"
                                                 @click ="isReplyOpen = false"
                                              ></v-btn>
                                            </template>
                                          </v-card-item>
                                        </v-sheet>
                                         
                                        <v-list lines="one">
                                              <v-list-subheader>User Controls</v-list-subheader>
                                              
                                            <v-list-item  
                                            v-for="message in Reply"
                                            prepend-avatar="https://cdn.vuetifyjs.com/images/logos/v-alt.svg">
                                                <v-list-item-title>{{message.sender.name}}</v-list-item-title>

                                                <v-list-item-subtitle>
                                                  {{message.message}}
                                                    </v-list-item-subtitle>
                                              </v-list-item>                      
                                            </v-list>    
                                            <v-card-actions class="my-2 d-flex justify-end">
                                      <v-btn
                                        class="text-none"
                                        rounded="xl"
                                        text="Cancel"
                                        @click="isReplyOpen = false"
                                      ></v-btn> 
                                    </v-card-actions>                       
                                      </v-card>
                        </v-dialog>

            


<!--xxxxxxxxxxxxxxxxxxxxxx-->
                        <!-- reply-->
                       <div class="d-flex justify-space-around " style="padding:20px;">
                      

                        <v-btn color="primary"
                              append-icon="mdi-message-reply-outline" 
                              end 
                              @click="SelectMessage(Message)"
                                        
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
                                              v-model="clickMessage.sender.name"
                                            ></v-text-field>
                                         </div>
                                      <div class="mb-2">Statut</div>
                                      <div class="text-medium-emphasis mb-4">
                                        <v-select 
                                              ref="Statut"
                                              v-model="this.Statut"
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
                                      <div class="mb-2">Observation</div>

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
                                            v-model="this.messagereply"
                                            :rules="[
                                            () => !!this.messagereply || 'This field is required',
                                            () => !!this.messagereply && this.messagereply.length <= 325 || 'Message must be less than 325 characters',
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
                                        @click="ReplyReply(isActive)"
                                      ></v-btn>
                                    </v-card-actions>
                                  </v-card>
                                </template>
                              </v-dialog>
                            </v-btn>
                      
<!-- Content of Messages-->
                          

<!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->

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
                                        @click="ShareMessage(isActive)"
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
                                    @click= "SelectMessage(Message)"                              
                                       color="red" > Delete
                                        <v-icon icon="mdi-delete-outline"></v-icon> 
                                     </v-btn>
                                  </template>

                                  <template v-slot:default="{ isActive }">
                                    <v-card>
                                      <v-toolbar color="red" title="Delete"> <v-icon icon="mdi-delete-outline" start ></v-icon> </v-toolbar>

                                      <v-card-text class="text-h2 pa-12">
                                        Would you like delete {{clickMessage.id}}?
                                      </v-card-text>

                                      <v-card-actions class="justify-end">
                                        <v-btn
                                          text="No"
                                          @click="isActive.value = false"
                                        ></v-btn>
                                        <v-btn
                                          text="Yes"
                                          @click="DeleteMessage(isActive)"
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

          <v-col
            cols="12"
          >
            <v-card>


              <v-list lines="two" style="background-color: #C0C6C7;">
                <v-list-subheader :title="'Yesterday' +', '+ yesterdayDate " ></v-list-subheader>
              
                  <template v-for="Message in yesterdayMessages" :key="Message" ">
                    <!-- <v-list-item
                  @click="openDialog(Message)"
                  :class="{'unread-message': !Message.is_read, 'read-message': Message.is_read}"
            
                  
                  >
                    <template v-slot:prepend>
                      <v-avatar size="x-large" > <v-icon icon="mdi-account-circle"></v-icon></v-avatar>
                    </template>
                         
                      <p class="font-weight-medium  text-h5 ">
                            <span style="font-size: 25px;" :class= "{'mdi mdi-shield-crown-outline text-error': Message.sender.roles[0] == 'ROLE_ADMIN','mdi mdi-shield-account-outline text-primary' :Message.sender.roles[0] == 'ROLE_USER'}" >                   
                               
                          </span> 
                            {{Message.sender.name}}
                              <span style="font-size: 25px;" :class= "{'mdi mdi-shield-crown-outline text-error' : Message.sender.roles[0] == 'ROLE_ADMIN','mdi mdi-shield-account-outline text-primary' :Message.sender.roles[0] == 'ROLE_USER'}" >   
                          </span> 

                          <strong >-</strong> {{Message.senderService}}
                          
                          <span class="font-weight-light text-h6">{{relativeTime( Message.created_at ) }} </span>
                          
                          <span > 
                                  <v-icon   :icon="Message.is_read ? 'mdi mdi-check-circle-outline' : 'mdi mdi-check-circle'" size="25" /> <v-icon :icon="Message.is_read ? 'mdi mdi-check-circle-outline' : 'mdi mdi-check-circle'" size="25" />                                  
                          </span>

                      </p>
                         <!-- <h1 class="text-overline">
                          <span class="text-decoration-underline" >From Service</span> : {{Message.senderService}}
                        </h1>
                   
                       <h1 class="text-overline">
                      <span class="text-decoration-underline" >Subject</span> : {{Message.title}}
                        </h1> 
                       <p  class="d-inline-flex align-items-center"> 
                          <h1 class="text-overline">
                           <span class="text-decoration-underline" >Subject</span> : {{Message.title}}
                        </h1>
                        <v-chip color="secondary">
                         {{Message.files.length}} Files
                        </v-chip>

                       </p>
                   
                        <v-badge
                            :content="ReplyCounts[Message.id]"
                            color="primary"
                            overlap
                            bordered
                            v-if="ReplyCount[Message.id] > 0"
                          >
                        <v-btn class="ma-2 absolute" color="info"  @click ="replyMessage(Message)"
                        >
                          <v-icon icon="mdi mdi-message-reply-text-outline" ></v-icon> 
                          </v-btn> 
                        </v-badge>
                        <v-btn class="ma-2 absolute" v-else color="info"  @click ="replyMessage(Message)"
                        >
                          <v-icon icon="mdi mdi-message-reply-text-outline" ></v-icon> 
                          </v-btn> 
                          -->
                         
                         

                        <!--   <v-chip-group
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

 <v-list-item
                  @click="openDialog(Message)"
                  :class="{'unread-message': !Message.is_read, 'read-message': Message.is_read}"
            
                  
                  >
                    <template v-slot:prepend>
                      <v-avatar size="x-large" > <v-icon icon="mdi-account-circle"></v-icon></v-avatar>
                    </template>
                         
                      <p class="font-weight-medium  text-h5 ">
                            <span style="font-size: 25px;" :class= "{'mdi mdi-shield-crown-outline text-error': Message.sender.roles[0] == 'ROLE_ADMIN','mdi mdi-shield-account-outline text-primary' :Message.sender.roles[0] == 'ROLE_USER'}" >                   
                               
                          </span> 
                            {{Message.sender.name}}
                              <span style="font-size: 25px;" :class= "{'mdi mdi-shield-crown-outline text-error' : Message.sender.roles[0] == 'ROLE_ADMIN','mdi mdi-shield-account-outline text-primary' :Message.sender.roles[0] == 'ROLE_USER'}" >   
                          </span> 

                          <strong >-</strong> {{Message.senderService}}
                          
                          <span class="font-weight-light text-h6">{{relativeTime( Message.created_at ) }} </span>
                          
                          <span > 
                                  <v-icon   :icon="Message.is_read ? 'mdi mdi-check-circle-outline' : 'mdi mdi-check-circle'" size="25" /> <v-icon :icon="Message.is_read ? 'mdi mdi-check-circle-outline' : 'mdi mdi-check-circle'" size="25" />                                  
                          </span>

                      </p>
                         <!-- <h1 class="text-overline">
                          <span class="text-decoration-underline" >From Service</span> : {{Message.senderService}}
                        </h1>
                   
                       <h1 class="text-overline">
                      <span class="text-decoration-underline" >Subject</span> : {{Message.title}}
                        </h1> -->
                        <v-list-item
                  @click="openDialog(Message)"
                  :class="{'unread-message': !Message.is_read, 'read-message': Message.is_read}"
            
                  
                  >
                    <template v-slot:prepend>
                      <v-avatar size="x-large" > <v-icon icon="mdi-account-circle"></v-icon></v-avatar>
                    </template>
                         
                      <p class="font-weight-medium  text-h5 ">
                            <span style="font-size: 25px;" :class= "{'mdi mdi-shield-crown-outline text-error': Message.sender.roles[0] == 'ROLE_ADMIN','mdi mdi-shield-account-outline text-primary' :Message.sender.roles[0] == 'ROLE_USER'}" >                   
                               
                          </span> 
                            {{Message.sender.name}}
                              <span style="font-size: 25px;" :class= "{'mdi mdi-shield-crown-outline text-error' : Message.sender.roles[0] == 'ROLE_ADMIN','mdi mdi-shield-account-outline text-primary' :Message.sender.roles[0] == 'ROLE_USER'}" >   
                          </span> 

                          <strong >-</strong> {{Message.senderService}}
                          
                          <span class="font-weight-light text-h6">{{relativeTime( Message.created_at ) }} </span>
                          
                          <span > 
                                  <v-icon   :icon="Message.is_read ? 'mdi mdi-check-circle-outline' : 'mdi mdi-check-circle'" size="25" /> <v-icon :icon="Message.is_read ? 'mdi mdi-check-circle-outline' : 'mdi mdi-check-circle'" size="25" />                                  
                          </span>

                      </p>
                         <!-- <h1 class="text-overline">
                          <span class="text-decoration-underline" >From Service</span> : {{Message.senderService}}
                        </h1>
                   
                       <h1 class="text-overline">
                      <span class="text-decoration-underline" >Subject</span> : {{Message.title}}
                        </h1> -->
                       <p  class="d-inline-flex align-items-center"> 
                          <h1 class="text-overline">
                           <span class="text-decoration-underline" >Subject</span> : {{Message.title}}
                        </h1>
                        <v-chip color="secondary">
                         {{Message.files.length}} Files
                        </v-chip>

                       </p>
                   <br>
                        <v-badge
                            :content="ReplyCounts[Message.id]"
                            color="primary"
                            overlap
                            bordered
                            v-if="ReplyCount[Message.id] > 0"
                          >
                        <v-btn class="ma-2 absolute" color="info"  @click ="replyMessage(Message)"
                        >
                          <v-icon icon="mdi mdi-message-reply-text-outline" ></v-icon> 
                          </v-btn> 
                        </v-badge>
                        <v-btn class="ma-2 absolute" v-else color="info"  @click ="replyMessage(Message)"
                        >
                          <v-icon icon="mdi mdi-message-reply-text-outline" ></v-icon> 
                          </v-btn> 
                         

                        <!--   <v-chip-group
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

                      CONTENT MESSAGE -->
                      <v-dialog
                             v-model="isDialogOpen"
                                    transition="dialog-bottom-transition" 
                                    width='100vh' 
                                    class="justify-center"                             
                                  >
                                  
                                        <v-card
                                        class="mx-auto"
                                        color="#FFFFFF"
                                        max-width="650"
                                        min-height="350"
                                        theme="dark"
                                        variant="flat"
                                      >
                                        <v-sheet color="#C77416">
                                          <v-card-item>
                                            <template v-slot:prepend>
                                              <v-card-title>
                                                <v-avatar >
                                                  <v-icon icon="mdi-account-circle"></v-icon>
                                                </v-avatar>

                                               {{clickMessage.sender.name}}
                                              </v-card-title>
                                            </template>

                                            <v-divider class="mx-2" vertical></v-divider>                                      
                                            <template v-slot:append>
                                              <v-btn
                                                icon="$close"
                                                size="large"
                                                variant="text"
                                                 @click ="isDialogOpen = false"
                                              ></v-btn>
                                            </template>
                                          </v-card-item>
                                        </v-sheet>

                                        <v-card
                                          class="ma-4"
                                          color="#2f3136"
                                          rounded="lg"
                                          variant="flat"
                                        >
                                          <v-card-item>
                                            <v-card-title class="text-body-2 d-flex align-center">
                                              <v-icon
                                                color="#949cf7"
                                                icon="mdi-calendar"
                                                start
                                              ></v-icon>

                                              <span class="text-medium-emphasis font-weight-bold">{{clickMessage.created_at.split(' ')[0]}} -{{clickMessage.created_at.split(' ')[1]}}</span>

                                              <v-spacer></v-spacer>

                                            

                                             
                                            </v-card-title>

                                            <div class="py-2">
                                              <div class="text-h6">{{clickMessage.title}}:</div>

                                              <div class="font-weight-light text-medium-emphasis">
                                                {{clickMessage.message}}
                                              </div>
                                            </div>
                                          </v-card-item>

                                          <v-divider></v-divider>

                                          <div class="pa-4 d-flex align-center">
                                            <div class="text-h6">Files:</div>
                                            <v-chip-group
                                              variant="flat"
                                             column
                                            class="pa-2"
                                            >
                                              <v-chip 
                                              v-for='file in this.clickMessage.files ' :key="file"
                                              v-model="this.clickMessage.files"
                                                class="me-2"
                                                color="deep-purple-accent-4"
                                                size="small"
                                                label> {{ file.path}}
                                              </v-chip>
                                          </v-chip-group>
                                          </div>
                                        </v-card>
                                      </v-card>
                        </v-dialog>
<!-- content reply-->
                      <v-dialog
                             v-model="isReplyOpen"
                                    transition="dialog-bottom-transition" 
                                    width='100vh' 
                                    class="justify-center"                             
                                  >
                                  
                                        <v-card
                                        class="mx-auto"
                                        color="#FFFFFF"
                                        width="800"
                                        min-height="200"
                                        variant="flat"
                                        rounded="bg"
                                      >
                                        <v-sheet color="info">
                                          <v-card-item>
                                            <template v-slot:prepend>
                                              <v-card-title>
                                               Reply Message                                     
                                              </v-card-title>
                                            </template>
                                           
                                            <v-divider class="mx-2" vertical></v-divider>  
                                            
                                           
                                            <template v-slot:append>
                                              <v-btn
                                                icon="$close"
                                                size="large"
                                                variant="text"
                                                 @click ="isReplyOpen = false"
                                              ></v-btn>
                                            </template>
                                          </v-card-item>
                                        </v-sheet>
                                         
                                        <v-list lines="one">
                                              <v-list-subheader>User Controls</v-list-subheader>
                                              
                                            <v-list-item  
                                            v-for="message in Reply"
                                            prepend-avatar="https://cdn.vuetifyjs.com/images/logos/v-alt.svg">
                                                <v-list-item-title>{{message.sender.name}}</v-list-item-title>

                                                <v-list-item-subtitle>
                                                  {{message.message}}
                                                    </v-list-item-subtitle>
                                              </v-list-item>                      
                                            </v-list>    
                                            <v-card-actions class="my-2 d-flex justify-end">
                                      <v-btn
                                        class="text-none"
                                        rounded="xl"
                                        text="Cancel"
                                        @click="isReplyOpen = false"
                                      ></v-btn> 
                                    </v-card-actions>                       
                                      </v-card>
                        </v-dialog>

            


<!--xxxxxxxxxxxxxxxxxxxxxx-->
                        <!-- reply-->
                       <div class="d-flex justify-space-around " style="padding:20px;">
                      

                        <v-btn color="primary"
                              append-icon="mdi-message-reply-outline" 
                              end 
                              @click="SelectMessage(Message)"
                                        
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
                                              v-model="clickMessage.sender.name"
                                            ></v-text-field>
                                         </div>
                                      <div class="mb-2">Statut</div>
                                      <div class="text-medium-emphasis mb-4">
                                        <v-select 
                                              ref="Statut"
                                              v-model="this.Statut"
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
                                      <div class="mb-2">Observation</div>

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
                                            v-model="this.messagereply"
                                            :rules="[
                                            () => !!this.messagereply || 'This field is required',
                                            () => !!this.messagereply && this.messagereply.length <= 325 || 'Message must be less than 325 characters',
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
                                        @click="ReplyReply(isActive)"
                                      ></v-btn>
                                    </v-card-actions>
                                  </v-card>
                                </template>
                              </v-dialog>
                            </v-btn>
                      
<!-- Content of Messages-->
                          

<!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->

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
                                        @click="ShareMessage(isActive)"
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
                                    @click= "SelectMessage(Message)"                              
                                       color="red" > Delete
                                        <v-icon icon="mdi-delete-outline"></v-icon> 
                                     </v-btn>
                                  </template>

                                  <template v-slot:default="{ isActive }">
                                    <v-card>
                                      <v-toolbar color="red" title="Delete"> <v-icon icon="mdi-delete-outline" start ></v-icon> </v-toolbar>

                                      <v-card-text class="text-h2 pa-12">
                                        Would you like delete {{clickMessage.id}}?
                                      </v-card-text>

                                      <v-card-actions class="justify-end">
                                        <v-btn
                                          text="No"
                                          @click="isActive.value = false"
                                        ></v-btn>
                                        <v-btn
                                          text="Yes"
                                          @click="DeleteMessage(isActive)"
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
 

 <script>
  import axios from '../../plugins/axios' 
  import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
   export default {
     name:'admininbox',
     data: () => ({
      isReplyOpen:false,
      isDialogOpen:false,
       cards: ['Today', 'Yesterday'],
       drawer: null,
       dialog:false,
       links: [
         ['mdi-inbox-arrow-down', 'Inbox','/'],
         ['mdi-send', 'Send', '/send'],
         ['mdi-delete', 'Trash','/history'],
         
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
        Destinataires: [],

          Statut:null,
          messagereply:null,
      
        ReplyCount:{},
        Reply:[],
        Messages:[],
        UserConnectedId:null,
        UserConnected:null,
        UserConnectedService:null,
        user:null,
        clickMessage:{},
        select:"",
        selectedUser:null,
        userOptions: [],
        todayMessages: [], 
        yesterdayMessages: [],
        DestinataireService:null,
        selectService:"",
        ServiceOptions:[],
     }),
     mounted(){
          this.UserConnectedId = localStorage.getItem("user-info-id")
           this.UserConnected = localStorage.getItem("user-info");
           this.UserConnectedService = localStorage.getItem("user-info-service");
            this.GetMessages();
      
           this.GetUser();
           this.GetService();
           //setInterval(this.GetMessages, 2000);
      
     },
    created() {
        this.getTodayDate();
        this.getYesterdayDate();
    
        //this.replyMessage();
    

       
           },
   methods: {
    groupMessagesByDate() {
const today = new Date().toISOString().split('T')[0];  // Date actuelle
const yesterday = new Date(Date.now() - 864e5).toISOString().split('T')[0]; // Date d'hier

this.todayMessages = this.Messages.filter(msg => {
  const messageDate = msg.created_at.split('T')[0]; // Extraction de la date dans le format ISO
  return messageDate === today;
});

this.yesterdayMessages = this.Messages.filter(msg => {
  const messageDate = msg.created_at.split('T')[0];
  return messageDate === yesterday;
});
},


    async  GetMessages(){
         const formData = new FormData();
         formData.append("service",this.UserConnectedService);  
         const response = await axios.post('/usergetmessage', formData);
          this.Messages = response.data;       

          for (const message of this.Messages) {
        //const replyCountResponse = await axios.get(`/getReplyCount/${message.id}`);
       // this.$set(this.ReplyCounts, message.id, replyCountResponse.data.count);

        const formData = new FormData();
         formData.append("message",message.id);  
         const replyCountResponse = await axios.post('/getreply', formData);
          const Count =  replyCountResponse.data.length;
          this.ReplyCounts = { ...this.ReplyCounts, [message.id]: replyCountResponse.data.length };

          
      }       

         console.log(this.Messages);
         this.groupMessagesByDate()
     },
     relativeTime(dateTimeISO) {
    // Transforme la chaîne ISO en objet Date et calcule le temps écoulé
    return formatDistanceToNow(new Date(dateTimeISO), { addSuffix: true, locale: fr });
  },
     subscriberMercure(){
        const eventSource = new EventSource("{{ mercure(''http://example.com/books/1'')|escape('js') }}");
        eventSource.onmessage = event => {
            // Will be called every time an update is published by the server
            console.log(JSON.parse(event.data));
        }         
      
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
     async openDialog(Message) {
    this.clickMessage= Message; // Définit l'élément sélectionné
    this.isDialogOpen = true; // Ouvre la boîte de dialogue
    console.log(Message.is_read)
   if (!Message.is_read) {
    Message.is_read = true;  // Mettre à jour l'état localement

    try {
      // Envoyer une requête PATCH pour enregistrer l'état en base de données
      const response = await axios.patch(`/messagess/${Message.id}`, {
         read: true
      }, {
        headers: {
          'Content-Type': 'application/merge-patch+json'
        }
      });

      console.log('Message marqué comme lu avec succès');
    } catch (error) {
      console.error('Erreur lors de la mise à jour du message :', error);
    }
  }
  },
   async replyMessage(Message) {
    event.stopPropagation();
    this.isReplyOpen =true;
    const formData = new FormData();
         formData.append("message",Message.id);  
         const response = await axios.post('/getreply', formData);
          this.Reply = response.data; 
          this.ReplyCount =  response.data.length;
          console.log("message reply:" , this.ReplyCount);
           console.log("message reply:" , this.Reply);
  },
     SelectMessage(Message){
          this.clickMessage= Message;
        
    },
     async ReplyReply(isActive){
       isActive.value = false;
      // const formData = new FormData();
       console.log(this.clickMessage);
       console.log(this.Statut);
       console.log(this.messagereply)
       
      const formData = new FormData();
          formData.append('sender', this.UserConnectedId);
          formData.append('recipient', this.clickMessage.sender.id);
          formData.append('message_reply',this.messagereply);
          formData.append('statut', this.Statut);
          formData.append('message',this.clickMessage.id);

          const response = await axios.post("/sendreply" ,formData)
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

    },
    async ShareMessage(isActive){
    
      console.log(this.clickMessage);
      isActive.value = false;

      const formData = new FormData();
          formData.append('sender', this.UserConnectedId);
          formData.append('recipient', String(this.selectService.value));
          formData.append('message', this.clickMessage.message);
          formData.append('title', this.clickMessage.title);
            this.clickMessage.files.forEach((file, index) => {
              formData.append(`fileshare[${index}]`, file.path); 
             // 'files' est le champ attendu côté serveur
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
      
    },
    async DeleteMessage(isActive){
   
    console.log(this.clickMessage);
      const response = await axios.patch(`/messagess/${this.clickMessage.id}`, {     
          delete: true,
          deletedBy: this.UserConnected
      }, {
        headers: {
          'Content-Type': 'application/merge-patch+json'
        }
      })
              
          .then(response => {
            console.log('Mise à jour réussie:', response.data);
            isActive.value = false;
          })
          .catch(error => {
            console.error('Erreur lors de la mise à jour:', error.response.data);
          });
   
    },

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
            subtitle: User.id,
          }
         },
      messageCheck () {
          this.errorMessages = !this.message
            ? `Hey! I'm required`
            : ''

          return true
        },
      }
   }
   </script>
   <style >
  
    .unread-message {
         background-color: #C0C6C7;
         font-weight: bold;

  }

  .read-message {
        background-color: #F5F5F5;
        font-weight: normal;
}
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
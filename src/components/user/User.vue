
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
    <v-icon icon="mdi mdi-clipboard-list"></v-icon> &nbsp;
    User List

    <v-spacer></v-spacer>

    <!-- <v-btn color="primary" @click="fetchData(serviceId)">Rafraîchir</v-btn> -->




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
  <v-table>
<thead>
  <tr>
    <th class="text-left">
      Profil
    </th>
    <th class="text-left">
    
    </th>
    <th class="text-left">
      Name
    </th>
    <th class="text-left">
      Email
    </th>
    <th class="text-left">
      Role
    </th>
    <th class="text-left">
      Telephone
    </th>
    <th class="text-left">
      Fonction
    </th>
    
  </tr>
</thead>
<tbody>
  <tr
    v-for="item in sortedUsers"
    :key="item.id"
  >
    <td>{{ item.id }}</td>
    <td>
       <img v-if="item.image" :src="getImageUrl(item.image)" alt="User Image" width="50" height="50" />
    </td>
    <td>{{ item.name }}</td>
    <td>{{ item.email }}</td>
    <td v-if="item.roles[0] == 'ROLE_ADMIN'">ADMIN</td>
    <td v-if="item.roles[0] == 'ROLE_USER'">USER</td>
    <td>{{ item.phone }}</td>
    <td>{{ item.fonction }}</td>
   
   
    <td v-show="item.roles[0] == 'ROLE_USER' " > <v-btn color="info" @click="SetAdmin(item)">ADMIN</v-btn></td>
    <td > <v-btn color="info"  @click="viewProfil(item)">View</v-btn> 
              </td>
  </tr>
</tbody>
</v-table>

  </v-card> 
</v-col>
</v-row>


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
                      <span class="text-h5">{{clickItem.name}}</span>
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

                        <v-btn  @click="closeProfil()" icon="mdi mdi-close"></v-btn>
                      </v-defaults-provider>
                    </template>
                  </v-card-item>

                  <v-list>                
                    <v-list-item                        
                      prepend-icon="mdi-phone"           
                    ><p>{{clickItem.phone}}</p></v-list-item>                        
                    <v-divider inset></v-divider>

                    <v-list-item
                      prepend-icon="mdi-email"                       
                    ><p>{{clickItem.email}}</p></v-list-item>
                    <v-divider inset></v-divider>

                    <v-list-item                    
                      prepend-icon="mdi-phone"
                    > <p>{{clickItem.fonction}} </p></v-list-item>

                    <v-list-item
                      prepend-icon="mdi-map-marker"
                    ><p>{{clickItem.service}}</p></v-list-item>
                  </v-list>

                  <v-img
                    height="200"
                    :src="getImageUrl(clickItem.image)"
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

                          <v-divider></v-divider>

                          <v-card-text>
                                    <div >Name</div>
                                    <div class="text-medium-emphasis mb-4">
                                      <v-text-field        
                                      v-model="clickItem.name"                                                      
                                          label="Name"
                                        ></v-text-field> 
                                        <div >Mail</div>   
                                        <v-text-field    
                                        v-model="clickItem.email"                                                           
                                          label="Mail"
                                        ></v-text-field>    

                                        <div >Phone</div>
                                        <v-text-field                
                                        v-model="clickItem.phone"                                               
                                          label="Another"
                                        ></v-text-field>  
                                        <div>Fonction</div>
                                        <v-text-field                
                                        v-model="clickItem.fonction"                                               
                                          label="Fonction"
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
                      <v-btn
                        text="Edit"
                        variant="text"
                        @click="EditUser()"
                      ></v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-container > 
</template>
<script>
  import axios from '../../plugins/axios' 
export default {
data () {
  return {
  user:[],
  search: '',
  items: [], // Les données récupérées
  loading: false,// Indicateur de chargement
  UserConnectedService:null,
  dialog:false,
  dialogProfil: false,
  dialogEditProfil: false, 
  clickItem:[],

  register: { 
        name: null,
        email: null,
        password: null,
        roles: 'ROLE_USER',

        fonction:null,
        phone:null,
        files:null,

    },
    files:null,
    errorMessages: '',
    formHasErrors: false,
    serviceuser:null

  }
},

computed: {
sortedUsers() {
  // Tri avec les admins en premier
  return this.items.sort((a, b) => {
    const aIsAdmin = a.roles.includes('ROLE_ADMIN') ? 1 : 0;
    const bIsAdmin = b.roles.includes('ROLE_ADMIN') ? 1 : 0;
    return bIsAdmin - aIsAdmin;
  });
},
form () {
        return {
          name: this.register.name,
          email: this.register.email,
          password: this.register.password,
          roles:this.register.roles,
          fonction:this.register.fonction,
          phone:this.register.phone,
          image:this.register.files
        }
        },
      
},
mounted(){
  const serviceId = localStorage.getItem("user-info-service");
  this.serviceuser = serviceId;
  this.fetchData(serviceId);
  this.GetUserAdd();
  //this.subscribe();
//  console.log("serviceid" ,serviceId);
},
methods:{

  async fetchData(serviceId) {
  this.loading = true;
  console.log("id yh " ,serviceId);
  try {
    const formdata = new FormData();
    formdata.append("service", serviceId);
    console.log("id " ,this.UserConnectedService);
    const response = await axios.post('/userr',formdata); // Remplace par ton endpoint
    this.items = response.data;
    const hubUrl = 'http://localhost:8001/.well-known/mercure';
     const topicUrl = 'http://127.0.0.1:8000/api/userr/{id}';
      const es = new EventSource(`${hubUrl}?topic=${encodeURIComponent(topicUrl)}`);

es.onmessage = event => {
  const updatedUser = JSON.parse(event.data);

  this.items = this.items.map(user =>
    user.id === updatedUser.id ? updatedUser : user
  );}



    // // const hubUrl = response.headers.link.match(/<([^>]+)>;\s+rel=(?:mercure|"[^"]*mercure[^"]*")/)[1]; // the autodiscovery mechanism
    // const hubUrl = 'http://localhost:8001/.well-known/mercure'; // what's currently in the demo project
    // const es = new EventSource(`${hubUrl}?topic=127.0.0.1:8000/api/userr/{id}`);
    // es.onmessage = ({data}) => {
    //   const responseuser = JSON.parse(data);
    //   console.log("mercure", responseuser);
    // }

  // console.log(response)
     // Récupérer la liste des utilisateurs
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
  } finally {
    this.loading = false;
  }
},

subscribe() {
const hubUrl = 'http://localhost:8001/.well-known/mercure';
const eventSource = new EventSource(`${hubUrl}?topic=http://127.0.0.1:8000/api/userr/{id}`);
eventSource.onmessage = event => {
const user = (JSON).parse(event.data);
console.log(user);
}
},


async SetAdmin(item) {
    const response = await axios.patch(`/userss/${item.id}`, {  
                      roles: ["ROLE_ADMIN"]
                    }, {
                      headers: {
                        'Content-Type': 'application/merge-patch+json',
                   },
        })
              
          .then(response => {
            console.log('Mise à jour réussie:', response.data);
          })
          .catch(error => {
            console.error('Erreur lors de la mise à jour:', error.response.data);
          });
   
},
async SetService(item) {
        const response = await axios.patch(`/userss/${item.id}`, {  
                      service: `/api/servicess/${this.UserConnectedService}`
                    }, {
                      headers: {
                        'Content-Type': 'application/merge-patch+json',
                   },
        })
              
          .then(response => {
            console.log('Mise à jour réussie:', response.data);
          })
          .catch(error => {
            console.error('Erreur lors de la mise à jour:', error.response.data);
          });
   
   // Implémente ici ce que tu veux faire avec l'utilisateur sélectionné
},
viewProfil(item) {
  this.dialogProfil = true
  this.clickItem = item;

},
async EditUser(){
  console.log(this.clickItem)
  const response = await axios.patch(`/userss/${this.clickItem.id}`, {  
                      email: this.clickItem.email,
                      name: this.clickItem.name,
                      fonction: this.clickItem.fonction,
                      phone: this.clickItem.phone,
                    }, {
                      headers: {
                        'Content-Type': 'application/merge-patch+json',
                   },
        })
              
          .then(response => {
            console.log('Mise à jour réussie:', response.data);
          })
          .catch(error => {
            console.error('Erreur lors de la mise à jour:', error.response.data);
          });
   
  this.dialogEditProfil = false ;

},
closeProfil() {
  this.dialogProfil = false;
 
},

getImageUrl(imageName) {
  return `http://127.0.0.1:8000/files/UserImage/${imageName}`; // Remplacez par l'URL correcte
},
  async GetUserAdd(){
    const response = await axios.get('/userall');
    this.user = response.data;
     ;
   },
   async Register(){
    
    try{ 
        this.formHasErrors = false
        for (let f in this.form) {
           if (!this.form[f]) {
              this.errorMessages = "Empty";
               this.formHasErrors = true;
                 break; 
              }
            }                 
        if (this.formHasErrors) {
          return; // stoppe l'exécution de la fonction
        }  
        this.errorMessages = ""

        console.log(this.register);
        const formData = new FormData();
         formData.append('name', this.register.name);
         formData.append('email', this.register.email);
         formData.append('fonction', this.register.fonction);
         formData.append('password', this.register.password);
         formData.append('roles[]', this.register.roles);
         formData.append('phone', this.register.phone);
         formData.append('image', this.register.files);
         formData.append('service',Number(this.serviceuser))
         console.log(Number(this.serviceuser));
       const response = await axios.post("/register", formData)
        .then((response) => {
          // Gérer la réponse de succès
          console.log("Success");
        })
        .catch((error) => {
          // Gérer l'erreur
              if (error.response) {
                console.error('Erreur lors de l\'envoi - Réponse du serveur :', error.response.data);
              } else {
                console.error('Erreur lors de l\'envoi:', error.message);
              }  
        });
          
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
  }
}
}
</script>
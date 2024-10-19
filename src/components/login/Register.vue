<template>
    <div  style="margin-top: 20px">

  
    <v-card
      class="mx-auto pa-15 pb-8"
      levation="8"
      rounded="lg"
      max-width="448"
      title="User Registration"
    >
      <v-container>
        <v-text-field
          v-model="register.name"
          color="primary"
          label="Your Name"
          variant="underlined"
        ></v-text-field>
  
        <v-text-field
          v-model="register.email"
          color="primary"
          label="Your Email"
          variant="underlined"
        ></v-text-field>

        <v-text-field
          v-model="register.fonction"
          color="primary"
          label="Your Fonction"
          variant="underlined"
        ></v-text-field>

        <v-text-field
          v-model="register.phone"
          color="primary"
          label="Phone number"
          variant="underlined"
        ></v-text-field>

        <v-text-field
          v-model="register.password"
          color="primary"
          label="Password"
          placeholder="Enter your password"
          variant="underlined"
        ></v-text-field>

        <v-file-input
        v-model="register.files"
            label="Image profil"
            counter
            show-size
        ></v-file-input>

       
       
      
      </v-container>
      <v-alert
    v-if="errorMessages != '' "
    density="compact"
    :title="errorMessages"
    type="warning"
  ></v-alert>
  
      <v-divider></v-divider>
  
      <v-card-actions>
        <v-spacer></v-spacer>
   
        <v-btn
          
          color="blue"
          variant="tonal"
        
          to="/login"
        >   Login<v-icon icon="mdi-chevron-left" end></v-icon> </v-btn>
        <v-btn color="success"  variant="tonal" @click= "Register">
          Complete Registration
  
          <v-icon icon="mdi-chevron-right" end></v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
</div>
  </template>
  <script>
    import axios from '../../plugins/axios' 
    export default {
      data: () => ({
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
      }),

      computed: {
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
      methods:{
       
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
               formData.append('image', this.register.files)
             const response = await axios.post("/register", formData)
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
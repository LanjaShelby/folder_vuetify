<template>
    
    
    <v-container fluid class="d-flex justify-center align-center" style="height: 100vh;background-image: url('/public/rm314-adj-10.jpg');">
   
      <!-- Section de droite avec le formulaire -->
      <v-col cols="12" md="6">
    <div>
   
      <v-card
        class="mx-auto pa-12 pb-8"
        elevation="8"
        max-width="448"
        rounded="lg"
      >
       <v-card-title class="d-flex justify-center text-h6 text-md-h5 text-lg-h4 font-weight-thin text-blue "> LOG IN</v-card-title>
        <div class="text-subtitle-1 text-medium-emphasis">Account</div>
  
        <v-text-field
          density="compact"
          placeholder="Email address"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
          v-model="login.username"
        ></v-text-field>
  
        <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
          Password
  
       <!-- <a
            class="text-caption text-decoration-none text-blue"
            href="#"
            rel="noopener noreferrer"
            target="_blank"
          >
            Forgot login password?</a>-->  
        </div>
  
        <v-text-field
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="Enter your password"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
         v-model="login.password"
          @click:append-inner="visible = !visible"
        ></v-text-field>
  
        <v-card
          class="mb-12"
          color="surface-variant"
          variant="tonal"
        >

        <v-alert
        @click="closealert()"
    v-if="errorMessages != '' "
    density="compact"
    :title="errorMessages"
    type="warning"
  ></v-alert>
        </v-card>
  
        <v-btn
          class="mb-8"
          color="blue"
          size="large"
          variant="tonal"
          block
          @click="Login"
        >
          Log In
        </v-btn>
  
        <v-card-text class="text-center">
          <RouterLink class="text-blue text-decoration-none"  
          to="register" color="success" rel="noopener noreferrer" >  
            Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
           </RouterLink>
        </v-card-text>
      </v-card>
    </div>
  </v-col>

</v-container>
  </template>
  <script>
  import axios from '../../plugins/axios' 
    export default {
      data: () => ({
        visible: false,
        login: { 
           username:null, 
          password:null
        },
        errorMessages:"",
        user: [],
        UserConnected:null,
      }),
      mounted(){
        this.UserConnected = localStorage.getItem("user-role");
             if(this.UserConnected == "ADMIN") {
              this.$router.push({name:"admininbox"});
             
             }else{
               if(this.UserConnected == "USER"){
                  this.$router.push({name:"userinbox"});  }
             }
             
      },
      
      
      methods:{
            async Login(){
            try{
              if(this.login.username == null || this.login.password == null){
                this.errorMessages = "Empty";
                }else{
                  const response = await axios.post('/login', this.login);
                  console.log('Données envoyées avec succès', response.data);
                  this.user = response.data;
                          console.log(this.user);
                          if(this.user.roles[0] == "ROLE_ADMIN"){
                            this.$router.push({name:"adminuser"})
                            localStorage.setItem("user-role", "ADMIN")
                          }else{
                            this.$router.push({name:"useruser"})
                           localStorage.setItem("user-role", "USER")
                          }
                         
                        console.log('Success:', response.data)
                   
                
                  //localStorage.setItem("user-info", this.user[0].nom)
                  //console.log(this.utilisateur[0].nom);
              
                 
                }      
            }catch (error) {
              if (error.response) {
                  // Le serveur a répondu avec un code d'erreur (ex: 400, 500)
                  console.error('Erreur lors de l\'envoi - Réponse du serveur :', error.response.data);
                  this.errorMessages = "Invalid credentials"
                } else if (error.request) {
                  // La requête a été envoyée mais aucune réponse n'a été reçue
                  console.error('Erreur lors de l\'envoi - Aucune réponse reçue :', error.request);
                } else {
                  // Quelque chose d'autre a provoqué l'erreur
                  console.error('Erreur lors de l\'envoi', error.message);
                }
            }
          },
          closealert(){
            this.errorMessages ="";
          }
      }
    }
  </script>
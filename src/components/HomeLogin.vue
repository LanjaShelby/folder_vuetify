<template>
    <v-app>
      
          
          <router-view />
    </v-app>
  </template>
  <script>

    export default {
      data: () => ({
      
        UserConnected:null,
      }),
      created(){
        this.UserConnected = localStorage.getItem("user-role");
             if(this.UserConnected == "ADMIN") {
              this.$router.push({name:"admininbox"});
             
             }else{
               if(this.UserConnected == "USER"){
                  this.$router.push({name:"userinbox"});  }
             }
             
      },
    }
</script>
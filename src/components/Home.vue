<template>
  <v-app id="inspire">
   <!-- <v-system-bar>
     
      <v-icon>mdi-square</v-icon>

      <v-icon>mdi-circle</v-icon>

      <v-icon>mdi-check-circle-outline"</v-icon>
      
      <v-icon>mdi-triangle</v-icon>
    </v-system-bar> -->

    <v-navigation-drawer 
    v-model="drawer"
    color="#1569C7">
    
      <v-sheet
        class="pa-4"
        color="#1569C7"
        style="cursor: pointer"
       
      >
      <div
      @click="dialog = !dialog">
        <v-avatar
          class="mb-4"
          color="grey-darken-1"
          size="64"
        ></v-avatar>

        <div>john@google.com</div>
      </div>
      

    <v-fade-transition hide-on-leave>
      <v-card
        v-if=dialog
        append-icon="$close"
        class="mx-auto"
        elevation="16"
        max-width="500"
        title="Profil"
      >
        <template v-slot:append>
          <v-btn icon="$close" variant="text" @click="dialog = false"></v-btn>
        </template>

        <v-divider></v-divider>

        <div class="py-12 text-center">
          <v-avatar
          class="mb-4"
          color="grey-darken-1"
          size="64"
        ></v-avatar>

          <div class="text-h4 font-weight-bold">Profil of the user</div>
        </div>

        <v-divider></v-divider>

        <div class="pa-4 text-end">
          <v-btn
            class="text-none"
            color="medium-emphasis"
            min-width="92"
            variant="outlined"
            rounded
            @click="dialog = false"
          >
            Close
          </v-btn>
        </div>
      </v-card>
    </v-fade-transition>
       

      </v-sheet>

      <v-divider></v-divider>
    
      <v-list>
        <v-list-item
          v-for="[icon, text, route] in links"
          :key="icon"
          :prepend-icon="icon"
          :title="text"
          :to="route"
          link
        ></v-list-item>
      <!--  <v-list-item prepend-icon="mdi-email" title="Inbox" link to="/inbox" > </v-list-item>
       <v-list-item prepend-icon="mdi-send" title="Send" link to="/send"></v-list-item>
       <v-list-item prepend-icon="mdi-timeline-text-outline" title="History" link to="/history"></v-list-item>
       <v-list-item prepend-icon="mdi-alert-octagon" title="Spam" link ></v-list-item> -->
      </v-list>
  

    </v-navigation-drawer>

    <v-main 
    class="main_container" >
    <v-container
        class="py-8 px-6"
        fluid
        back
      >    
      <transition name="slide-left">
      <router-view  :key="$route.fullPath" />
    </transition>
    </v-container>
 
   
     <!-- <v-container
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

                <template v-for="n in 6" :key="n">
                  <v-list-item
                  style="background-color: #D1D0CE;">
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
      </v-container> è-->
    </v-main>
  </v-app>
</template>

<script setup>
  import { ref } from 'vue';

  const cards = ['Today', 'Yesterday']
  const links = [
    ['mdi-inbox-arrow-down', 'Inbox' ,'/'],
    ['mdi-send', 'Send' , '/send'],
    ['mdi-timeline-text-outline', 'History' ,'/history'],
   
  ]

  const drawer = ref(null)
  //const dialog = ref(false) 
</script>

<script>
  export default {
    data: () => ({
      previousRoute: '',
      drawer: null,
      links: [
        ['mdi-inbox-arrow-down', 'Inbox'],
        ['mdi-send', 'Send'],
        ['mdi-delete', 'Trash'],
        ['mdi-alert-octagon', 'Spam'],
      ],
      dialog:false,
 
    }),
    computed: {
    slideDirection() {
      return this.$router.history.current.fullPath > this.previousRoute ? 'slide-left' : 'slide-right';
    },
  },
  watch: {
    $route(to, from) {
      this.previousRoute = from.fullPath;
    }
  }
};
  
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
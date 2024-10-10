<template>

<router-view />
  <!--
  <transition name="slide-left">
    <router-view :key="$route.fullPath"   />
</transition>
    <Home />
   <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app> -->
</template>

<script setup>
  //
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

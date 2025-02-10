<template>
    

  <v-card class="py-8 px-6" >
<v-card-title class="text-h6 font-weight-bold">Notifications</v-card-title>
<v-divider></v-divider>

<v-divider></v-divider>

<v-list two-line>
<v-list-item v-for="notif in notification" :key="notif.id" class="notification-item">
<!-- Notification pour une suppression -->
<v-list-item v-if="notif.action_type === 'delete'">
<template v-slot:prepend>
<v-avatar color="red lighten-3" size="40">
<v-icon icon="mdi-delete"></v-icon>
</v-avatar>
</template>
<v-list-item-content>
<v-list-item-title class="font-weight-bold">Message Supprimé</v-list-item-title>
<v-list-item-subtitle class="grey--text text--darken-1">
L'Utilisateur {{notif.requester.name}} a supprimé le message {{notif.message_id}}
</v-list-item-subtitle>
</v-list-item-content>
<v-list-item-action-text class="text-caption grey--text text--darken-1">
{{ relativeTime(notif.created_at) }}
</v-list-item-action-text>
</v-list-item>

<!-- Notification pour un envoi -->
<v-list-item v-else>
<template v-slot:prepend>
<v-avatar color="blue lighten-3" size="40">
<v-icon  icon="mdi-send"></v-icon>
</v-avatar>
</template>
<v-list-item-content>
<v-list-item-title class="font-weight-bold">Message Envoyé</v-list-item-title>
<v-list-item-subtitle class="grey--text text--darken-1">
L'Utilisateur  {{notif.requester.name}} a envoyé un message au service {{notif.service_id_recipient }}
</v-list-item-subtitle>
</v-list-item-content>
<v-list-item-action-text class="text-caption grey--text text--darken-1">
{{ relativeTime(notif.created_at) }}
</v-list-item-action-text>
</v-list-item>
</v-list-item>
</v-list>
</v-card>





</template>
<script>
import axios from '../../plugins/axios' 
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
export default {
name:'admininbox',
data: () => ({
notification:null,
notification2:null,
UserConnectedId:null,
UserConnected:null,
UserConnectedService:null,
}),
mounted(){
this.UserConnectedId = localStorage.getItem("user-info-id")
this.UserConnected = localStorage.getItem("user-info");
this.UserConnectedService = localStorage.getItem("user-info-service");
//  this.GetNotif();
this.GetNotification();
},
methods:{
async GetNotification(){
const formData = new FormData();
formData.append("service",this.UserConnectedService); 
const response = await axios.post('/getnotification' , formData);
this.notification = response.data;  
console.log(this.notification);     

},

relativeTime(dateTimeISO) {
// Transforme la chaîne ISO en objet Date et calcule le temps écoulé
return formatDistanceToNow(new Date(dateTimeISO), { addSuffix: true, locale: fr });
},
}
}

</script>
<style>
.notification-item {
transition: background-color 0.3s;
}
.notification-item:hover {
background-color: #f5f5f5;
}

</style>
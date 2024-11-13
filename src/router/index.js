
/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'

import Another from "../components/Another.vue"
import History from "../components/History.vue"
import Inbox from "../components/Inbox.vue"
import Login from "../components/Loginn.vue"
import Send from "../components/Send.vue"
import Register from "../components/Register.vue"

import HomeUser from "../components/HomeUser.vue"
import Home from "../components/Home.vue"
import HomeLogin from "../components/HomeLogin.vue"

import User from "../components/User.vue"

//import { routes } from 'vue-router/auto-routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: 
      [


        {
          path: '/admin',
          component: Home, // Utilise le Home  pour cette route
          children: [
            { path: '',name: "admininboxHome",  component:() => import('@/components/admin/Inbox.vue')},
            { path: 'send',name: "adminsend", component:() => import('@/components/admin/Send.vue') },
            { path: 'inbox',name: "admininbox", component: () => import('@/components/admin/Inbox.vue') },
            { path: 'history',name: "adminhistory", component: () => import('@/components/admin/History.vue') },
            { path: 'user',name: "adminuser", component: () => import('@/components/admin/User.vue') },
            { path: 'envoyer',name: "adminenvoyer", component: () => import('@/components/admin/Envoyer.vue') },
            { path: 'boite',name: "adminboite", component: () => import('@/components/admin/Boite.vue') },
            { path: 'notification',name: "adminnotif", component: () => import('@/components/admin/Notification.vue') },
          ],
        },
        {
          path: '/user',
          component: HomeUser, // Utilise le Home  pour cette route
          children: [
            { path: '',name: "userinboxHome",  component:() => import('@/components/user/Inbox.vue')},
            { path: 'Usend',name: "usersend", component:() => import('@/components/user/Send.vue') },
            { path: 'Uinbox',name: "userinbox", component: () => import('@/components/user/Inbox.vue') },
            { path: 'Uhistory',name: "userhistory", component: () => import('@/components/user/History.vue') },
            { path: 'Uuser',name: "useruser", component: () => import('@/components/user/User.vue') },
            { path: 'Uenvoyer',name: "userenvoyer", component: () => import('@/components/user/Envoyer.vue') },
            { path: 'Unotification',name: "usernotif", component: () => import('@/components/user/Notification.vue') },
       
          ],
        },
        {
          path: '/login',
          component: HomeLogin, // Utilise le HomeLogin pour cette route
          children: [
            { path: '',name: "login", component: () => import('@/components/login/Loginn.vue') },
          ],
        },
        {
          path: '/register',
          component: HomeLogin, // Utilise le layout minimal pour cette route
          children: [
            { path: '',name: "register", component: () => import('@/components/login/Register.vue') },
          ],
        },
       
      /*  {
          path: "/send",
          name: "send",
          component: Send
        },
        {
          path: "/",
          name: "inbox",
          component: Inbox
        },
        {
          path: "/history",
          name: "history",
          component: History
        },
        {
          path: "/another",
          name: "another",
          component: Another
        },
        {
          path: "/login",
          name: "login",
          component: Login
        },
        {
          path: "/register",
          name: "register",
          component: Register
        },
        */
        
      ]

    
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router


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
import Send from "../components/Send.vue"

//import { routes } from 'vue-router/auto-routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: 
      [
       
        {
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

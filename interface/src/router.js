import { createRouter, createWebHistory } from "vue-router"
import Explore from "./views/Explore.vue"
import Connect from "./views/Connect.vue"
import CreatePool from "./views/pools/Create.vue"
import ViewPool from "./views/pools/Pool.vue"
import { useConnectionStore } from "./stores"

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/explore", name: "explore", component: Explore },
    { path: "/connect", name: "connect", component: Connect },
    { path: "/pools/create", name: "createPool", component: CreatePool },
    { path: "/pools/:id", name: "viewPool", component: ViewPool },
  ],
})

router.beforeEach((to, from, next) => {
  const connectionStore = useConnectionStore()

  if (to.meta.scope === "guest") {
    if (connectionStore.connected) {
      return router.push(from.path || "/")
    }

    return next()
  } else if (to.meta.scope === "auth") {
    if (connectionStore.connected) {
      return next()
    }

    return router.push("/connect")
  }

  return next()
})

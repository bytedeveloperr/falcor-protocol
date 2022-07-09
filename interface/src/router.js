import Vue from "vue"
import VueRouter from "vue-router"
import Overview from "@/views/Overview.vue"
import Explore from "@/views/pool/Explore.vue"
import Connect from "@/views/Connect.vue"
import Pool from "@/views/pool/Pool.vue"
import CreatePool from "@/views/pool/Create.vue"
import { useAuthStore } from "./stores/auth"

export function router() {
  Vue.use(VueRouter)

  const routes = [
    { path: "/", name: "overview", component: Overview, meta: { scope: "auth" } },
    { path: "/explore", name: "explore", component: Explore },
    { path: "/connect", name: "connect", component: Connect, meta: { scope: "guest" } },
    { path: "/pool/create", name: "createPool", component: CreatePool, meta: { scope: "auth" } },
    { path: "/pool/:poolId", name: "pool", component: Pool },
  ]

  const router = new VueRouter({ mode: "history", base: process.env.BASE_URL, routes })

  router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()

    if (to.name === from.name) return false

    if (!to.meta.scope) {
      return next()
    }

    if (to.meta.scope === "auth") {
      if (authStore.connected) {
        return next()
      }
      return router.push("/connect")
    }

    if (to.meta.scope === "guest") {
      if (authStore.connected) {
        return false
      }

      return next()
    }
  })

  return router
}

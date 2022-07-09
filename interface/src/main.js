import Vue from "vue"
import App from "./App.vue"
import { router } from "./router"
import { vuetify } from "./plugins/vuetify"
import { moralis } from "./helpers/moralis"
import { createPinia, PiniaVuePlugin } from "pinia"
import VueCompositionAPI from "@vue/composition-api"

import "./main.css"

const pinia = createPinia()
Vue.use(VueCompositionAPI)
Vue.use(PiniaVuePlugin)

Vue.config.productionTip = false

moralis.initialize().then(() => {
  const vue = new Vue({ vuetify, pinia, router: router(), render: (h) => h(App) })
  vue.$mount("#app")
})

import { createApp } from "vue"
import App from "./App.vue"
import { createPinia } from "pinia"
import { router } from "./router"
import { vuetify } from "./plugins/vuetify"
import { loadFonts } from "./plugins/webfontloader"

import "./main.css"
import { moralis } from "./utils/moralis"

loadFonts()
const pinia = createPinia()

moralis.initialize()
createApp(App).use(pinia).use(router).use(vuetify).mount("#app")

import Vue from "vue"
import Vuetify from "vuetify/lib/framework"

Vue.use(Vuetify)

export const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#5f22d9",
      },
    },
  },
})

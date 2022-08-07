import { createVuetify } from "vuetify"
import "@mdi/font/css/materialdesignicons.css"
import "vuetify/styles"

export const vuetify = createVuetify({
  theme: {
    defaultTheme: "darkloo",
    themes: {
      darkloo: {
        dark: true,
        colors: {
          background: "#090030",
          surface: "#1A1A40",
          primary: "#F39422",
          secondary: "#a9b0b4",
          error: "#B00020",
          info: "#2196F3",
          success: "#4CAF50",
          warning: "#FB8C00",
        },
      },
    },
  },
})

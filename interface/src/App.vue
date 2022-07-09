<template>
  <v-app>
    <Navigation v-if="!routes.guest.includes($route.name)" />

    <v-main class="mt-5 background">
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { defineComponent } from "@vue/composition-api"
import Navigation from "./components/Navigation.vue"

export default defineComponent({
  components: { Navigation },
  setup() {
    const routes = { guest: ["connect"] }

    return { routes }
  },
})
</script>

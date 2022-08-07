<template>
  <v-app>
    <app-bar />

    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AppBar from "./components/AppBar.vue"

export default {
  name: "App",
  components: { AppBar },
}
</script>

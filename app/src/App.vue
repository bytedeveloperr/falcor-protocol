<template>
  <v-app>
    <AppBar />

    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>

    <WrongNetwork :show="!connection.connected ? false : config.chains[parseInt(connection.chainId)] !== 'mumbai'" />
  </v-app>
</template>

<script>
import AppBar from "./components/AppBar.vue";
import WrongNetwork from "./components/modals/WrongNetwork.vue";
import { config } from "./config";
import { connectionService } from "./services";

export default {
  name: "App",
  components: { AppBar, WrongNetwork },
  setup() {
    return { config, connection: connectionService.state };
  },
};
</script>

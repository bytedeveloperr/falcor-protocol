<template>
  <div class="wrapper">
    <v-container class="pa-0 fill-height">
      <v-app-bar app flat>
        <template v-slot:prepend>
          <v-app-bar-nav-icon class="d-md-none" @click="toggleDrawer"></v-app-bar-nav-icon>
        </template>

        <v-app-bar-title tag="a" link to="/l">{{ config.app.name }}</v-app-bar-title>

        <div class="d-none d-md-flex">
          <v-btn flat to="/overview">Overview</v-btn>
          <v-btn flat to="/explore">Explore</v-btn>
          <v-btn flat to="/leaderboard">Leaderboard</v-btn>
        </div>

        <template v-slot:append>
          <v-btn flat to="/connect" variant="tonal" color="primary" v-if="!state.connection.connected">
            Connect wallet
          </v-btn>
          <v-menu v-else elevation="0">
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props">
                <v-icon class="me-3">mdi-account-circle</v-icon>
                {{ utils.truncateEthAddress(state.connection.address) }}
              </v-btn>
            </template>

            <v-list>
              <v-list-item
                v-for="(item, index) in items"
                :key="index"
                :value="index"
                @click="() => item.function?.call()"
              >
                <v-list-item-avatar size="small" start>
                  <v-list-item-icon :icon="'mdi-' + item.icon"></v-list-item-icon>
                </v-list-item-avatar>

                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-app-bar>
    </v-container>
  </div>

  <v-navigation-drawer v-model="drawer" app temporary>
    <!-- <v-list-item prepend-avatar="https://randomuser.me/api/portraits/men/78.jpg" title="John Leider"></v-list-item>

    <v-divider></v-divider> -->

    <v-list nav>
      <v-list-item prepend-icon="mdi-view-dashboard" title="Overview" link to="/overview"></v-list-item>
      <v-list-item prepend-icon="mdi-trophy-outline" title="Explore" link to="/explore"></v-list-item>
      <v-list-item prepend-icon="mdi-trophy-outline" title="Leaderboard" link to="/leaderboard"></v-list-item>
    </v-list>

    <template v-slot:append>
      <div class="pa-2">
        <v-btn block color="primary" @click="disconnect">Disconnect</v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { connectionService } from "../services";
import { utils } from "../utils";
import { config } from "../config";

export default {
  setup() {
    const drawer = ref(null);
    const router = useRouter();
    const state = { connection: connectionService.state };

    const items = [
      { title: "View on explorer", icon: "open-in-new", function: viewOnExplorer },
      { title: "Disconnect Wallet", icon: "logout-variant", function: disconnect },
    ];

    async function disconnect() {
      await connectionService.disconnect();

      router.push("/connect");
    }

    function viewOnExplorer() {
      window.open(`${config.mumbai.explorer}/address/${state.connection.address}`, "_blank");
    }

    function toggleDrawer() {
      drawer.value = !drawer.value;
    }

    return { items, utils, config, disconnect, drawer, toggleDrawer, state };
  },
};
</script>

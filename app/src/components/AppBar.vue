<template>
  <div class="wrapper">
    <v-container class="pa-0 fill-height">
      <v-app-bar app flat>
        <template v-slot:prepend>
          <v-app-bar-nav-icon class="d-md-none" @click="toggleDrawer"></v-app-bar-nav-icon>
        </template>

        <v-app-bar-title tag="a" link to="/l">{{ config.app.name }}</v-app-bar-title>

        <div class="d-none d-md-flex">
          <v-btn
            link
            flat
            v-for="(route, i) in routes"
            :key="i"
            size="small"
            density="compact"
            variannt="text"
            :to="route.path"
          >
            {{ route.title }}
          </v-btn>
        </div>

        <template v-slot:append>
          <v-btn
            link
            flat
            size="small"
            density="compact"
            variannt="text"
            to="/connect"
            color="primary"
            v-if="!state.connection.connected"
          >
            Connect wallet
          </v-btn>
          <v-menu v-else elevation="0">
            <template v-slot:activator="{ props }">
              <v-btn link flat size="small" density="compact" variannt="text" v-bind="props">
                <v-icon class="me-3">mdi-account-circle</v-icon>
                {{ utils.truncateEthAddress(state.connection.address) }}
              </v-btn>
            </template>

            <v-list nav class="py-5">
              <v-list-item
                v-for="(item, index) in items"
                :key="index"
                :value="index"
                size="small"
                density="compact"
                @click="() => item.function?.call()"
              >
                <v-list-item-avatar size="small" density="compact" start>
                  <v-list-item-icon :icon="'mdi-' + item.icon"></v-list-item-icon>
                </v-list-item-avatar>

                <v-list-item-title size="small" density="compact">{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-app-bar>
    </v-container>
  </div>

  <v-navigation-drawer v-model="drawer" app temporary>
    <v-list nav>
      <v-list-item
        link
        :key="i"
        :to="route.path"
        :title="route.title"
        :prepend-icon="route.icon"
        v-for="(route, i) in routes"
      ></v-list-item>
    </v-list>

    <template v-slot:append>
      <div class="pa-2">
        <v-btn block color="primary" @click="disconnect">Disconnect</v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { connectionService } from "../services";
import { utils } from "../utils";
import { config } from "../config";

export default {
  setup() {
    const drawer = ref(null);
    const router = useRouter();
    const state = reactive({ connection: connectionService.state });

    const routes = [
      {
        title: "Overview",
        path: "/",
        icon: "mdi-view-dashboard",
      },
      {
        title: "Explore",
        path: "/explore",
        icon: "mdi-octagram-outline",
      },
    ];

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

    return { items, routes, utils, config, disconnect, drawer, toggleDrawer, state };
  },
};
</script>

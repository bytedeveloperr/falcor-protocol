<template>
  <v-app-bar app flat class="white" border density="compact">
    <template v-slot:prepend>
      <v-app-bar-nav-icon class="d-md-none"></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>Sling Protocol</v-app-bar-title>

    <template v-slot:append>
      <div class="d-none d-md-flex">
        <v-btn flat to="/">Overview</v-btn>
        <v-btn flat to="/explore">Explore</v-btn>
      </div>

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
          <v-list-item v-for="(item, index) in items" :key="index" :value="index" @click="() => item.function?.call()">
            <v-list-item-avatar size="small" start>
              <v-list-item-icon :icon="'mdi-' + item.icon"></v-list-item-icon>
            </v-list-item-avatar>

            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </v-app-bar>
</template>

<script>
import { useRouter } from "vue-router"
import { connection } from "../services"
import { utils } from "../utils"

export default {
  setup() {
    const router = useRouter()
    const state = { connection: connection.state }

    const items = [
      { title: "View on explorer", icon: "open-in-new" },
      { title: "Disconnect Wallet", icon: "logout-variant", function: disconnect },
    ]

    async function disconnect() {
      await connection.disconnect()
      router.push("/connect")
    }

    return { items, utils, disconnect, state }
  },
}
</script>

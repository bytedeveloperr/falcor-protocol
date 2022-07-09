<template>
  <v-row class="mt-10">
    <v-col cols="12" md="6" class="mx-auto">
      <p class="h4 font-weight-medium">Connect Wallet</p>

      <template>
        <v-card flat tile class="mx-auto">
          <v-list flat>
            <template>
              <v-list-item
                link
                v-for="(item, i) in items"
                :key="'list-' + i"
                class="mb-3"
                @click="() => connect(item.id)"
              >
                <v-list-item-avatar><v-img :src="item.logo" /> </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title v-text="item.name" class="font-weight-medium"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>
        </v-card>
      </template>
    </v-col>
  </v-row>
</template>

<script>
import { defineComponent } from "@vue/composition-api"
import { connection } from "@/helpers/connection"
import { useAuthStore } from "@/stores/auth"

export default defineComponent({
  setup() {
    const authStore = useAuthStore()

    const items = [
      { name: "Metamask", id: "injected", logo: "/assets/images/metamask-logo.svg" },
      { name: "WalletConnect", id: "walletconnect", logo: "/assets/images/walletconnect-logo.svg" },
    ]

    async function connect(provider) {
      await connection.connect(provider)
    }

    return { items, connect, authStore }
  },
})
</script>

<style scoped>
.v-list-item {
  border: 1px solid rgb(223, 223, 223);
}
</style>

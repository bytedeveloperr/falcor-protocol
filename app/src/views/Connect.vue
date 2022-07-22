<template>
  <v-row>
    <v-col cols="12" md="6" class="mx-auto">
      <p class="h5 mb-3">Connect your wallet</p>

      <v-card flat>
        <v-card-text>
          <v-list>
            <v-list-item
              link
              border
              v-for="(item, i) in items"
              :key="i"
              :value="item"
              class="mb-3"
              @click="() => connect(item.id)"
            >
              <v-list-item-avatar start>
                <v-img :src="item.logo" :alt="item.name" />
              </v-list-item-avatar>

              <v-list-item-title v-text="item.name"></v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { connectionService } from "../services"

export default {
  setup() {
    const items = [
      { id: "metamask", logo: "/assets/images/metamask.svg", name: "Metamask" },
      { id: "sequence", logo: "/assets/images/sequence.svg", name: "Sequence" },
      { id: "walletconnect", logo: "/assets/images/walletconnect.svg", name: "WalletConnect" },
    ]

    async function connect(connector) {
      await connectionService.connect(connector)
    }

    return { items, connect }
  },
}
</script>

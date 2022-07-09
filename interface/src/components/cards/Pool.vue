<template>
  <v-card flat outlined height="185" link :to="`/pool/${1}`">
    <v-card-text class="pb-1" style="height: 130px">
      <div class="d-flex mb-3">
        <v-avatar size="40">
          <img :src="pool.avatar" :alt="pool.name" />
        </v-avatar>

        <div class="">
          <div class="ms-3">
            <div>{{ pool.name }}</div>

            <div class="d-flex text--secondary mb-3">
              <span>
                <v-icon x-small>mdi-layers</v-icon>
                {{ pool.category }}
              </span>
              &nbsp; &bull; &nbsp;
              <span>
                <v-icon x-small>mdi-account-multiple</v-icon>
                {{ 20 }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="text--secondary">
        <p>{{ pool.description.substr(0, 100) }}...</p>
      </div>
    </v-card-text>

    <v-card-actions class="justify-space-between">
      <v-chip label outlined class="white">
        <v-avatar left>
          <img src="https://cryptologos.cc/logos/usd-coin-usdc-logo.svg" />
        </v-avatar>

        <span class="h3 text--secondary">$49,324</span>
      </v-chip>

      <v-btn icon>
        <v-icon>mdi-heart-outline</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { defineComponent } from "@vue/composition-api"

export default defineComponent({
  props: ["pool"],
})
</script>

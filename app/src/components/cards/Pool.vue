<template>
  <v-card link flat :to="'/pools/' + pool.poolId" style="display: flex; flex-direction: column; height: 100%">
    <v-card-text class="mb-0" style="flex: auto">
      <v-avatar size="50">
        <v-img cover aspect-ratio="1" src="/assets/images/placeholder.svg" />
      </v-avatar>

      <h5 class="my-3 h5 font-weight-bold">{{ pool.name }}</h5>
      <v-chip label color="primary" size="small" prepend-icon="mdi-decagram-outline">{{ pool.category }}</v-chip>

      <v-divider class="my-3" />

      <div style="font-size: 14px">{{ pool.description }}</div>
    </v-card-text>

    <v-card-actions class="px-3 mt-0">
      <span>{{ pool.balance }} {{ pool.token.symbol }}</span>
      <v-spacer />
      <span class="mr-1">367 <v-icon size="small" icon="mdi-account-multiple" /></span>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ["pool"],
}
</script>

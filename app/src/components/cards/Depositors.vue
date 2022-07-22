<template>
  <v-card flat height="435px">
    <v-card-text class="mt-0">
      <ul>
        <li class="d-flex justify-space-between mb-3">
          <span>Address</span>
          <span>Balance</span>
        </li>

        <li class="d-flex justify-space-between my-2" v-for="(depositor, i) in depositors" :key="i">
          <v-btn flat density="compact" variant="text" color="primary" class="pa-0">
            {{ utils.truncateEthAddress(depositor.address) }}
          </v-btn>
          <span>{{ depositor.amount }} {{ token && token.symbol }}</span>
        </li>
      </ul>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ["token", "depositors", "utils"],
}
</script>

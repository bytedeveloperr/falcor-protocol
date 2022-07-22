<template>
  <v-card flat height="435px">
    <v-card-text class="px-0">
      <v-list lines="two">
        <template v-for="(transaction, i) in transactions" :key="i">
          <v-list-item
            link
            :prepend-icon="`mdi-${transaction.type === 'Deposit' ? 'arrow-bottom-left' : 'arrow-top-right'}`"
            :title="transaction.type"
            :subtitle="transaction.timestamp"
            color="primary"
          >
            <template v-slot:append>
              <span v-text="`${transaction.amount} ${token && token.symbol}`"></span>
            </template>
          </v-list-item>
          <v-divider inset v-if="i !== transactions.length - 1" />
        </template>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ["token", "transactions"],
}
</script>

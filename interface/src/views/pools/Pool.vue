<template>
  <v-row>
    <v-col cols="12">
      <v-card flat>
        <v-card-text>
          <div class="d-flex justify-space-between">
            <v-avatar size="100">
              <v-img src="https://cdn.vuetifyjs.com/images/cards/cooking.png" cover />
            </v-avatar>

            <v-btn flat variant="tonal" size="small" color="primary" class="text-uppercase" prepend-icon="mdi-plus">
              Deposit DAI
            </v-btn>
          </div>

          <div class="mb-3">
            <h4 class="my-3 h4 font-weight-bold">Itraf Foundation</h4>
            <v-chip label color="primary" prepend-icon="mdi-decagram-outline">Charity</v-chip>
          </div>

          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste exercitationem fuga autem?</p>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>

  <h5 class="h5 my-3">Balances</h5>

  <v-row>
    <v-col cols="12" md="4">
      <v-card flat height="100px">
        <v-card-text>
          <div class="text-uppercase">Total Deposit</div>
          <h4 class="h4 mt-3 font-weight-medium">$40,493 USDC</h4>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" md="4">
      <v-card flat height="100px">
        <v-card-text>
          <div class="text-uppercase">Current Yield</div>
          <h4 class="h4 mt-3 font-weight-medium">$40,493 USDC</h4>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" md="4">
      <v-card flat height="100px">
        <v-card-text>
          <div class="text-uppercase">Total Deposit</div>
          <h4 class="h4 mt-3 font-weight-medium">$40,493 USDC</h4>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="12" md="6">
      <v-card flat>
        <v-card-text>
          <p class="h5 mb-3">Depositors</p>

          <ul>
            <li class="d-flex justify-space-between mb-3">
              <span>Address</span>
              <span>Balance</span>
            </li>

            <li class="d-flex justify-space-between my-2" v-for="i in 10" :key="i">
              <v-btn flat density="compact" variant="text" color="primary" class="pa-0">0x86e...12Eb</v-btn>
              <span>$30,000</span>
            </li>
          </ul>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped>
ul {
  list-style: none;
}
</style>

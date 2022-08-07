<template>
  <div class="mb-3">
    <p class="h6 mb-3">Falcor's Overview</p>
    <v-row>
      <v-col md="4" cols="12">
        <Balance :value="'$' + state.totalDeposit" title="Total Deposits" />
      </v-col>

      <v-col md="4" cols="12">
        <Balance :value="'$' + state.totalYield" title="Total Current Yields" />
      </v-col>

      <v-col md="4" cols="12">
        <Balance :value="state.poolsCount" title="Total Donation Pools" />
      </v-col>
    </v-row>
  </div>

  <v-row>
    <v-col cols="12">
      <p class="h6 mb-3">Assets</p>

      <v-card flat>
        <v-card-text>
          <v-table>
            <thead>
              <tr>
                <th>#</th>
                <th>Asset</th>
                <th>Total Deposited</th>
                <th>Current Yield</th>
                <th class="d-none d-md-table-cell">% composition (USD)</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(token, i) in state.tokens" :key="`token-${i++}`">
                <td>{{ i }}</td>
                <td>
                  <v-avatar size="20"><v-img :src="token.logo" /></v-avatar>
                  &nbsp; {{ token.symbol }}
                </td>
                <td>{{ token.deposit }}</td>
                <td>{{ token.yield }}</td>
                <td class="d-none d-md-table-cell">
                  {{ Number(((token.deposit * token.price) / (state.totalDeposit || 1)) * 100).toFixed(1) }}%
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { onMounted, reactive } from "vue"
import Balance from "../components/cards/Balance.vue"
import { infoService } from "../services"

export default {
  components: { Balance },
  setup() {
    const state = reactive({ totalDeposit: 0, totalYield: 0, poolsCount: 0, tokens: [] })

    onMounted(async () => {
      const data = await infoService.getOverviewData()

      state.totalDeposit = data.totalDeposit
      state.totalYield = data.totalYield
      state.poolsCount = data.poolsCount
      state.tokens = data.tokens
    })

    return { state }
  },
}
</script>
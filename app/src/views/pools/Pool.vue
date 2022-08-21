<template>
  <template v-if="state.loading">
    <v-row>
      <Loading />
    </v-row>
  </template>
  <template v-else>
    <v-row>
      <v-col cols="12" class="mt-0 pt-0">
        <div class="d-flex">
          <v-avatar size="100">
            <v-img cover aspect-ratio="1" src="/assets/images/placeholder.svg" />
          </v-avatar>

          <v-spacer />

          <div class="d-flex">
            <v-btn flat icon="mdi-share" />
            &nbsp;
            <v-btn
              v-if="user.address == state.pool.creator"
              flat
              icon="mdi-cog"
              :to="`/pools/${state.pool.poolId}/settings`"
            >
            </v-btn>
          </div>
        </div>

        <div class="mb-3">
          <h4 class="my-3 h4 font-weight-medium">{{ state.pool.name }}</h4>
          <v-chip label color="primary" prepend-icon="mdi-decagram-outline">{{ state.pool.category }}</v-chip>
        </div>

        <p style="font-size: 16px">{{ state.pool.description }}</p>
      </v-col>
    </v-row>

    <div class="d-flex my-5">
      <p class="h6 font-weight-medium">Overview</p>
      <v-spacer />

      <v-menu elevation="0">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" variant="text" color="primary" density="compact" prepend-icon="mdi-vector-circle">
            Manage State
          </v-btn>
        </template>

        <v-list density="compact">
          <v-list-item
            density="compact"
            variant="text"
            v-for="(item, i) in state.manage"
            :key="i"
            :value="i"
            @click="() => item.function(item.title.toLowerCase())"
          >
            <v-list-item-avatar start density="compact">
              <v-list-item-icon :icon="item.icon"></v-list-item-icon>
            </v-list-item-avatar>

            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>

    <v-row class="mb-3">
      <v-col cols="12" md="4">
        <Balance :value="state.pool.balance" :token="state.pool.token" title="Total Deposit" />
      </v-col>
      <v-col cols="12" md="4">
        <Balance :value="state.pool.yield" :token="state.pool.token" title="Current Yield" />
      </v-col>
      <v-col cols="12" md="4">
        <Balance
          :value="state.pool.depositor && state.pool.depositor.amount"
          :token="state.pool.token"
          title="Your Deposit"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="6">
        <div class="d-flex my-3">
          <p class="h6 font-weight-medium">Depositors</p>
          <v-spacer />

          <v-btn variant="text" density="compact" color="primary" class="px-0">view all</v-btn>
        </div>

        <Depositors :utils="utils" :token="state.pool.token" :depositors="state.depositors" />
      </v-col>

      <v-col cols="12" md="6">
        <div class="d-flex my-3">
          <p class="h6 font-weight-medium">Transactions</p>
          <v-spacer />

          <v-btn variant="text" density="compact" color="primary" class="px-0">view all</v-btn>
        </div>

        <Transactions :token="state.pool.token" :transactions="state.transactions" />
      </v-col>
    </v-row>

    <PoolDepositModal :show="state.modals.deposit" :pool="state.pool" @toggleModal="toggleModal('deposit')" />
    <PoolWithdrawalModal :show="state.modals.withdraw" :pool="state.pool" @toggleModal="toggleModal('withdraw')" />
  </template>
</template>

<script>
import { onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import { poolService, connectionService } from "../../services";
import PoolDepositModal from "../../components/modals/PoolDeposit.vue";
import { utils } from "../../utils";
import Depositors from "../../components/cards/Depositors.vue";
import Balance from "../../components/cards/Balance.vue";
import PoolWithdrawalModal from "../../components/modals/PoolWithdrawal.vue";
import Transactions from "../../components/cards/Transactions.vue";
import Loading from "../../components/Loading.vue";

export default {
  components: { PoolDepositModal, Depositors, Balance, PoolWithdrawalModal, Transactions, Loading },
  setup() {
    const route = useRoute();
    const state = reactive({
      loading: false,
      pool: {},
      depositors: {},
      transactions: {},
      items: [{ title: "Share Pool", icon: "mdi-share" }],
      manage: [
        { title: "Deposit", icon: "mdi-cash-plus", function: toggleModal },
        { title: "Withdraw", icon: "mdi-cash-remove", function: toggleModal },
      ],
      modals: {
        deposit: false,
        withdraw: false,
      },
    });

    function toggleModal(type) {
      state.modals[type] = !state.modals[type];
    }

    onMounted(async () => {
      state.loading = true;

      state.pool = await poolService.getPool(route.params.id, connectionService.state.address);
      state.depositors = await poolService.getPoolDepositors(route.params.id);
      state.transactions = await poolService.getPoolTransactions(route.params.id);

      console.log(JSON.parse(JSON.stringify(state.pool)));

      state.loading = false;
    });

    return { user: connectionService.state, state, toggleModal, utils };
  },
};
</script>
<style scoped>
ul {
  list-style: none;
}
</style>

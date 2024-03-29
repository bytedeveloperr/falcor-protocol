<template>
  <v-row>
    <v-col md="8" cols="12" class="ma-0 py-0">
      <v-text-field
        prepend-inner-icon="mdi-magnify"
        color="primary"
        label="Search Donation Pools..."
        density="compact"
        variant="outlined"
        v-model="state.input.text"
      />
    </v-col>

    <v-col md="4" cols="12" class="ma-0 py-0">
      <v-select
        :items="categories"
        v-model="state.input.category"
        prepend-inner-icon="mdi-filter-outline"
        label="Filter Donation Pools..."
        variant="outlined"
        density="compact"
        color="primary"
        return-object
      />
    </v-col>
  </v-row>

  <div class="d-flex justify-space-between mb-5">
    <h6 class="font-weight-medium h6 mb-0">Explore</h6>
    <v-btn flat density="compact" variant="text" color="primary" to="/pools/create">New Donation Pool</v-btn>
  </div>

  <v-row>
    <template v-if="state.loading">
      <Loading />
    </template>

    <template v-else>
      <template v-if="state.pools.length > 0">
        <v-col v-for="(pool, i) in state.pools" :key="i" cols="12" md="4" lg="3">
          <PoolCard :pool="pool" />
        </v-col>
      </template>

      <template v-else>
        <Empty message="No pools available" />
      </template>
    </template>
  </v-row>
</template>

<script>
import { onMounted, reactive, ref, watch } from "vue";
import PoolCard from "../components/cards/Pool.vue";
import { poolService } from "../services";
import Empty from "../components/Empty.vue";
import Loading from "../components/Loading.vue";
import { usePoolStore } from "../stores";
import { storeToRefs } from "pinia";
import { categories } from "../config";

export default {
  components: { PoolCard, Empty, Loading },
  setup() {
    const { pools } = storeToRefs(usePoolStore());
    const state = reactive({ loading: false, pools: [], input: { text: "" } });

    onMounted(async () => {
      state.loading = true;

      await poolService.loadPools();
      state.pools = pools.value;

      state.loading = false;
    });

    watch(
      () => state.input.text,
      (n) => {
        state.pools = pools.value.filter((pool) => pool.name?.includes(n) || pool.description?.includes(n));
      }
    );

    watch(
      () => state.input.category,
      (n) => {
        state.pools = pools.value.filter((pool) => pool.category == n);
      }
    );

    return { state, categories };
  },
};
</script>

<template>
  <v-row>
    <v-col md="8" cols="12" class="ma-0 py-0">
      <v-text-field
        prepend-inner-icon="mdi-magnify"
        color="primary"
        label="Search Donation Pools..."
        density="compact"
        variant="outlined"
      />
    </v-col>

    <v-col md="4" cols="12" class="ma-0 py-0">
      <v-select
        :items="items"
        v-model="select"
        prepend-inner-icon="mdi-filter-outline"
        label="Filter Donation Pools..."
        variant="outlined"
        density="compact"
        color="primary"
        return-object
        single-line
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
import { onMounted, reactive, ref } from "vue"
import PoolCard from "../components/cards/Pool.vue"
import { poolService } from "../services"
import Empty from "../components/Empty.vue"
import Loading from "../components/Loading.vue"

export default {
  components: { PoolCard, Empty, Loading },
  setup() {
    const state = reactive({ loading: false, pools: [] })

    onMounted(async () => {
      state.loading = true

      state.pools = await poolService.getPools()

      state.loading = false
    })

    const select = ref("")
    const items = ["Florida", "Georgia", "Nebraska", "California", "New York"]

    return { state, items, select }
  },
}
</script>

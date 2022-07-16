<template>
  <v-row>
    <v-col md="8" cols="12" class="ma-0 py-0">
      <v-text-field
        prepend-inner-icon="mdi-magnify"
        color="primary"
        label="Search Stashes..."
        density="compact"
        variant="outlined"
      />
    </v-col>

    <v-col md="4" cols="12" class="ma-0 py-0">
      <v-select
        :items="items"
        v-model="select"
        prepend-inner-icon="mdi-filter-outline"
        label="Filter Stashes..."
        variant="outlined"
        density="compact"
        color="primary"
        return-object
        single-line
      />
    </v-col>
  </v-row>

  <div class="d-flex justify-space-between mb-5">
    <h6 class="font-weight-medium h6 mb-0">Explore Donation Pools</h6>
    <v-btn flat density="compact" variant="text" color="primary" to="/pools/create">
      <!-- <v-icon>mdi-plus</v-icon> -->
      Create donation pool
    </v-btn>
  </div>

  <v-row>
    <v-col v-for="(c, i) in count" :key="i" cols="12" md="3">
      <v-card link flat border height="300px" :to="'/pools/' + i">
        <v-card-text class="mb-0">
          <v-avatar size="50">
            <v-img src="https://cdn.vuetifyjs.com/images/cards/cooking.png" cover />
          </v-avatar>

          <h5 class="my-3 h5 font-weight-bold">Itraf Foundation</h5>
          <v-chip label color="primary" size="small" prepend-icon="mdi-decagram-outline">Charity</v-chip>

          <v-divider class="my-3" />

          <div style="font-size: 14px">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perferendis, ipsam.
          </div>
        </v-card-text>

        <v-card-actions class="px-3 mt-0">
          <span>$30,378 USDC</span>
          <v-spacer />
          <span class="mr-1">367 <v-icon size="small" icon="mdi-account-multiple" /></span>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { ref } from "vue"

export default {
  setup() {
    const count = 7
    const select = ref("")
    const items = ["Florida", "Georgia", "Nebraska", "California", "New York"]

    return { count, items, select }
  },
}
</script>

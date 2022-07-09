<template>
  <div>
    <div class="d-flex justify-space-between mb-5">
      <p class="h4 mb-5 font-weight-medium">Pools</p>

      <v-btn depressed link class="primary" to="/pool/create">
        <v-icon small>mdi-plus</v-icon>
        <span>New Pool</span>
      </v-btn>
    </div>

    <v-row class="mb-0">
      <v-col cols="12" md="8" class="py-0">
        <v-text-field
          filled
          rounded
          dense
          class="px-0"
          placeholder="Search pools..."
          prepend-inner-icon="mdi-magnify"
        />
      </v-col>
      <v-col cols="12" md="4" class="py-0">
        <v-select dense rounded filled placeholder="Filter by category..." />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="4" v-for="(pool, i) in pools" :key="i">
        <PoolCard :pool="pool" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import PoolCard from "@/components/cards/Pool.vue"

export default {
  name: "Explore",
  components: { PoolCard },

  setup() {
    const pools = [
      {
        name: "Matters Foundation Pool",
        category: "ngo",
        description: "A pool that belongs to the matters foundation",
        avatar: "https://i.picsum.photos/id/102/4320/3240.jpg?hmac=ico2KysoswVG8E8r550V_afIWN963F6ygTVrqHeHeRc",
      },
      {
        name: "Agbado development community",
        category: "community",
        description: "Help contribute to the development of our community",
        avatar: "https://i.picsum.photos/id/1061/3264/2448.jpg?hmac=HoVLqUN6k0SMxCPSdgoc9_6Mhu3nGYm_lL3NgrDbwFU",
      },
      {
        name: "Bayment school pool",
        category: "education",
        description: "This pool is dedicated to the bayment school and the funds go to helping the school grow",
        avatar: "https://guardian.ng/wp-content/uploads/2015/05/School.jpg",
      },
    ]

    return { pools }
  },
}
</script>

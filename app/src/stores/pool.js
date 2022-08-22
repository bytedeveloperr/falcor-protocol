import { defineStore } from "pinia";

export const usePoolStore = defineStore({
  id: "pool",

  state: () => ({ pools: [], pool: {} }),

  actions: {
    setPools(pools) {
      this.pools = [...pools];
    },

    updatePool(id, data) {
      const pool = this.pools.find((p) => p.id == id);

      if (this.pool.id == id) {
        Object.assign(this.pool, data);
      }

      if (pool) {
        Object.assign(pool, data);
      }
    },

    setCurrentpool(pool) {
      this.pool = pool;
    },
  },
});

<template>
  <v-card flat height="100px">
    <v-card-text>
      <div class="text-uppercase mb-3">{{ title }}</div>
      <h4 class="h4 mt-3 font-weight-medium">
        {{ format ? utils.formatAmount(value, currency) : value }} {{ token && token.symbol }}
      </h4>
    </v-card-text>
  </v-card>
</template>

<script>
import { utils } from "../../utils";

export default {
  props: ["token", "value", "title", "currency", "format"],
  setup() {
    return { utils };
  },
};
</script>

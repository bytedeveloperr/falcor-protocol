<template>
  <v-card flat height="100px">
    <v-card-text>
      <div class="text-uppercase mb-3">{{ title }}</div>
      <h4 class="h4 mt-3 font-weight-medium">{{ value }} {{ token && token.symbol }}</h4>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ["token", "value", "title"],
}
</script>

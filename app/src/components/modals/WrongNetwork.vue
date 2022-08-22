<template>
  <v-row justify="center">
    <v-dialog persistent v-model="show">
      <v-card class="py-3">
        <v-card-text class="text-center py-10">
          <h5 class="h5 mb-5">Wrong Network</h5>
          <p class="text-small">
            Hi Fren, You are connected to the wrong network. Please switch your network to Polygon (Mumbai) to use this
            DApp
          </p>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: ["show"],
  emits: ["toggleModal"],
  setup(ctx) {
    function toggleModal() {
      ctx.emit("toggleModal");
    }

    return { toggleModal };
  },
};
</script>

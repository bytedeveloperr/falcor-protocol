<template>
  <v-row>
    <v-col cols="12" md="6" class="mx-auto py-0">
      <v-sheet>
        <p class="h4 mb-5 font-weight-medium">Create Pool</p>

        <v-form>
          <v-text-field filled rounded dense placeholder="Pool Name" />
          <v-select filled rounded dense placeholder="Pool Token" />
          <v-textarea filled rounded dense placeholder="Pool Description" />

          <v-btn block depressed class="primary">Continue</v-btn>
        </v-form>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<style></style>

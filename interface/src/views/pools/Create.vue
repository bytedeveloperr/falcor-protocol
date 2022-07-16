<template>
  <v-row>
    <v-col cols="12" md="6" class="mx-auto">
      <p class="h4 text-center mb-5">Create a Donation Pool</p>
      <v-card flat class="py-10">
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="state.input.name"
              color="primary"
              density="compact"
              variant="outlined"
              label="Pool name"
            />

            <v-text-field
              v-model="state.input.description"
              color="primary"
              density="compact"
              variant="outlined"
              label="What's your pool about?"
            />

            <v-select
              v-model="state.input.category"
              :items="categories"
              item-title="title"
              item-value="slug"
              color="primary"
              density="compact"
              variant="outlined"
              label="Choose Category"
            />

            <v-select
              v-model="state.input.token"
              :items="tokens"
              item-title="symbol"
              item-value="symbol"
              color="primary"
              density="compact"
              variant="outlined"
              label="Choose Token"
            />

            <v-btn block flat color="primary">Create Donation Pool</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { reactive } from "vue"
import { categories, tokens } from "../../config/"

export default {
  setup() {
    const state = reactive({ input: {} })

    return { tokens, categories, state }
  },
}
</script>

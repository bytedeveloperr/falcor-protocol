<template>
  <v-row>
    <v-col cols="12" md="6" class="mx-auto">
      <p class="h4 mb-5 font-weight-bold">{{ state.pool.name }}</p>

      <v-form @submit.prevent="createPool" ref="form">
        <v-text-field
          v-model="state.input.name"
          color="primary"
          density="compact"
          :rules="[rules.required]"
          variant="outlined"
          label="Pool name"
        />

        <v-text-field
          v-model="state.input.description"
          color="primary"
          density="compact"
          :rules="[rules.required]"
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
          :rules="[rules.required]"
          variant="outlined"
          label="Choose Category"
        />

        <v-select
          disabled
          v-model="state.input.token"
          :items="tokens"
          item-title="symbol"
          item-value="address"
          color="primary"
          density="compact"
          :rules="[rules.required]"
          variant="outlined"
          label="Choose Token"
        />

        <v-btn flat type="submit" size="small" color="primary" :disabled="state.submitting">Update Pool Details</v-btn>
      </v-form>

      <!-- <div class="mt-5">
        <p class="h5">Pause Donation Pool</p>
        <v-switch inset color="primary" />
      </div> -->

      <div class="mt-10">
        <div class="mb-3">
          <p class="font-weight-medium">Update Image</p>
          <p class="text-secondary">Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, laboriosam.</p>
        </div>

        <v-avatar class="mt-0" size="100">
          <v-img cover aspect-ratio="1" src="/assets/images/placeholder.svg" />
        </v-avatar>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { onMounted, reactive, ref } from "vue"
import { categories, tokens } from "../../config/"
import { connectionService, poolService } from "../../services"
import { useRoute } from "vue-router"

export default {
  setup() {
    const form = ref(null)
    const route = useRoute()
    const state = reactive({ submitting: false, input: {}, pool: {} })

    const rules = { required: (value) => !!value || "This field is required" }

    onMounted(async () => {
      state.pool = await poolService.getPool(route.params.id, connectionService.state.address)

      state.input.name = state.pool.name
      state.input.token = state.pool.token
      state.input.category = state.pool.category
      state.input.description = state.pool.description
    })

    async function createPool() {
      state.submitting = true

      try {
        await form.value.validate()
        if (form.value.errors.length < 1) {
          await poolService.createPool(state.input)
        }
      } catch (e) {
        console.log(e)
      } finally {
        state.submitting = false
      }
    }

    return { tokens, categories, state, rules, createPool, form }
  },
}
</script>

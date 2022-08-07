<template>
  <v-row>
    <v-col cols="12" md="6" class="mx-auto">
      <p class="h4 text-center mb-5">Create a Donation Pool</p>

      <v-card flat class="py-10">
        <v-card-text>
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

            <v-text-field
              v-model="state.input.beneficiary"
              color="primary"
              density="compact"
              :rules="[rules.required]"
              variant="outlined"
              label="Beneficiary address"
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
              v-model="state.input.token"
              :items="tokens"
              item-title="symbol"
              item-value="address"
              color="primary"
              density="compact"
              :rules="[rules.required]"
              variant="outlined"
              label="Choose Token"
              return-object
            >
              <template v-slot:append-inner>
                <v-avatar density="compact" size="small">
                  <v-img :src="state.input.token && state.input.token.logo" />
                </v-avatar>
              </template>
            </v-select>

            <v-btn block flat type="submit" color="primary" :disabled="state.submitting">Create Donation Pool</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { reactive, ref } from "vue"
import { categories, tokens } from "../../config/"
import { poolService } from "../../services"

export default {
  setup() {
    const form = ref(null)
    const state = reactive({ submitting: false, input: {} })
    const rules = { required: (value) => !!value || "This field is required" }

    async function createPool() {
      state.submitting = true

      try {
        await form.value.validate()
        if (form.value.errors.length < 1) {
          await poolService.createPool({ ...state.input, token: state.input.token?.address })
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

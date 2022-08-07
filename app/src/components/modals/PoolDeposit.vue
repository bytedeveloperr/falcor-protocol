<template>
  <v-row justify="center">
    <v-dialog v-model="show">
      <v-card class="py-3">
        <v-card-text>
          <div class="d-flex">
            <p class="h5 mb-3 font-weight-bold">Deposit {{ pool.token && pool.token.symbol }}</p>
            <v-spacer />
            <v-btn flat icon="mdi-close" @click="toggleModal"></v-btn>
          </div>

          <v-form class="mt-5" @submit.prevent="deposit" ref="form">
            <v-text-field
              type="number"
              variant="outlined"
              density="compact"
              color="primary"
              :rules="[rules.required]"
              v-model="state.input.amount"
              :label="`Amount of ${pool.token && pool.token.symbol}`"
            >
              <template v-slot:append-inner>
                <v-avatar density="compact" size="small">
                  <v-img :src="pool.token.logo" />
                </v-avatar>
              </template>
            </v-text-field>

            <v-btn block flat type="submit" color="primary" :disabled="state.submitting">
              Deposit {{ pool.token && pool.token.symbol }}
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { ref } from "vue"
import { connectionService, poolService } from "../../services"

export default {
  props: ["show", "pool"],
  emits: ["toggleModal"],

  setup(props, ctx) {
    const form = ref(null)
    const state = { submitting: false, input: {} }
    const rules = { required: (value) => !!value || "This field is required" }

    function toggleModal() {
      ctx.emit("toggleModal")
    }

    async function deposit() {
      state.submitting = true
      try {
        await form.value.validate()

        if (form.value.errors.length < 1) {
          const data = {
            token: props.pool.token,
            poolId: props.pool.poolId,
            amount: state.input.amount,
            account: connectionService.state.address,
          }

          await poolService.deposit(data)
        }
      } catch (e) {
        console.log(e)
      } finally {
        state.submitting = false
      }
    }

    return { toggleModal, form, deposit, state, rules }
  },
}
</script>

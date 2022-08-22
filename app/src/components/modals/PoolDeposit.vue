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
              @input="updateApprovalStatus"
            >
              <template v-slot:append-inner>
                <v-avatar density="compact" size="small">
                  <v-img :src="pool.token.logo" />
                </v-avatar>
              </template>
            </v-text-field>

            <v-btn v-if="state.isApproved" block flat type="submit" color="primary" :disabled="state.submitted">
              Deposit {{ pool.token && pool.token.symbol }}
            </v-btn>

            <v-btn v-else block flat @click="approve" color="primary" :disabled="state.submitted">
              Approve {{ pool.token && pool.token.symbol }}
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { onMounted, reactive, ref } from "vue";
import { config } from "../../config";
import { connectionService, poolService, tokenService } from "../../services";
import { utils } from "../../utils";

export default {
  props: ["show", "pool"],
  emits: ["toggleModal"],

  setup(props, ctx) {
    const form = ref(null);
    const state = reactive({ isApproved: false, submitted: false, input: {} });
    const rules = { required: (value) => !!value || "This field is required" };

    function toggleModal() {
      ctx.emit("toggleModal");
    }

    onMounted(async () => {
      await updateApprovalStatus();
    });

    async function updateApprovalStatus() {
      const token = props.pool.token;

      if (token) {
        if (token.address === config.nullAddress) {
          state.isApproved = true;
        } else {
          const allowanceOptions = {
            token: token.address,
            spender: config.falcor.address,
            account: connectionService.state.address,
          };

          const amount = utils.parseUnits(String(state.input.amount || 0), token.decimals);
          const allowance = await tokenService.getAllowance(allowanceOptions);
          state.isApproved = !utils.toBigNumber(allowance).lt(amount);
        }
      }
    }

    async function approve() {
      try {
        state.submitted = true;

        const token = props.pool.token;
        const amount = utils.parseUnits(String(state.input.amount || 0), token.decimals);

        const approvalOptions = {
          amount,
          token: token.address,
          spender: config.falcor.address,
          account: connectionService.state.address,
        };

        const approval = await tokenService.approve(approvalOptions);
        await approval.wait();

        await updateApprovalStatus();
      } catch (e) {
        console.log(e);
      } finally {
        state.submitted = false;
      }
    }

    async function deposit() {
      try {
        state.submitted = true;
        await form.value.validate();

        if (form.value.errors.length < 1) {
          const data = {
            token: props.pool.token,
            poolId: props.pool.poolId,
            amount: state.input.amount,
            account: connectionService.state.address,
          };

          await poolService.deposit(data);

          ctx.emit("toggleModal");
          state.input = {};
          window.location.reload();
        }
      } catch (e) {
        console.log(e);
      } finally {
        state.submitted = false;
      }
    }

    return { toggleModal, updateApprovalStatus, approve, form, deposit, state, rules };
  },
};
</script>

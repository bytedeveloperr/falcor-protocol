<template>
  <v-row>
    <v-col cols="12" md="8" order="2" order-md="1">
      <v-card flat outlined>
        <v-card-text class="pb-1">
          <div class="d-flex justify-space-between">
            <div class="d-flex mb-5">
              <v-avatar size="40">
                <img :src="pool.avatar" :alt="pool.name" />
              </v-avatar>

              <div class="ms-5">
                <p class="h4 mb-1">{{ pool.name }}</p>

                <div class="d-flex text--secondary mb-3">
                  <span>
                    <v-icon small>mdi-layers</v-icon>
                    {{ pool.category }}
                  </span>
                  &nbsp; &bull; &nbsp;
                  <span>
                    <v-icon small>mdi-account-multiple</v-icon>
                    {{ 20 }}
                  </span>
                </div>
              </div>
            </div>

            <v-btn icon small>
              <v-icon>mdi-menu-down</v-icon>
            </v-btn>
          </div>

          <div class="text--secondary mb-5">
            <p>{{ pool.description }}</p>
          </div>

          <p class="h4 mb-3 text-uppercase">Depositors</p>
          <div class="">
            <ul class="list-unstyled">
              <li class="d-flex justify-space-between mb-3">
                <span>Address</span>
                <span>Amount</span>
                <span>
                  <v-btn depressed small>
                    Next &nbsp;
                    <v-icon small>mdi-arrow-right</v-icon>
                  </v-btn>
                </span>
              </li>

              <li v-for="c in 6" :key="c" class="d-flex justify-space-between pt-2 pb-1">
                <span>0x86e...2Eb</span>
                <span>$3,100</span>
                <span>
                  <v-btn text link class="primary--text pa-0 ma-0">View account</v-btn>
                </span>
              </li>
            </ul>
          </div>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12" md="4" order="1" order-md="2">
      <v-card flat outlined class="mb-3">
        <v-list-item two-line>
          <v-list-item-content>
            <div class="mb-4 text--secondary text-small text-uppercase">Total Pool balance</div>
            <v-list-item-title class="mb-2 h4">30,338 USDC</v-list-item-title>
          </v-list-item-content>

          <v-list-item-avatar size="35">
            <img src="https://cryptologos.cc/logos/usd-coin-usdc-logo.svg" alt="balance.symbol" />
          </v-list-item-avatar>
        </v-list-item>
      </v-card>

      <v-card flat outlined class="mb-3">
        <v-list-item two-line>
          <v-list-item-content>
            <div class="mb-4 text--secondary text-small text-uppercase">Your deposit</div>
            <v-list-item-title class="mb-2 h4">308 USDC</v-list-item-title>
          </v-list-item-content>

          <v-list-item-avatar size="35">
            <img src="https://cryptologos.cc/logos/usd-coin-usdc-logo.svg" alt="balance.symbol" />
          </v-list-item-avatar>
        </v-list-item>
      </v-card>

      <v-card flat outlined>
        <v-card-text>
          <div class="mb-3 text-uppercase">Deposit USDC</div>
          <v-form>
            <v-text-field
              filled
              rounded
              dense
              type="number"
              class="my-0 py-0"
              placeholder="Deposit amount"
              style="border-radius: 5px"
            />
            <v-btn depressed block type="submit" class="primary">Deposit</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { defineComponent } from "@vue/composition-api"

export default defineComponent({
  setup() {
    const pool = {
      name: "Agbado development community",
      category: "community",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit mollitia iusto quos vero, quo itaque molestiae dolore aspernatur quisquam, ipsa sunt eligendi, a optio autem quam repellendus rem et beatae?",
      avatar: "https://i.picsum.photos/id/1061/3264/2448.jpg?hmac=HoVLqUN6k0SMxCPSdgoc9_6Mhu3nGYm_lL3NgrDbwFU",
    }

    return { pool }
  },
})
</script>

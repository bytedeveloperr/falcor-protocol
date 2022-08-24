<template>
  <v-row>
    <template v-if="state.loading">
      <Loading />
    </template>
    <template v-else>
      <v-col cols="12" md="6" class="mx-auto">
        <p class="h4 mb-5 font-weight-bold">{{ pool.name }}</p>

        <v-form @submit.prevent="updatePool" ref="form">
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
          >
            <template v-slot:append-inner>
              <v-avatar density="compact" size="small">
                <v-img :src="state.input.token && state.input.token.logo" />
              </v-avatar>
            </template>
          </v-select>

          <v-btn flat type="submit" size="small" color="primary" :disabled="state.submitting">
            Update Pool Details
          </v-btn>
        </v-form>

        <div class="mt-10">
          <div class="mb-3">
            <p class="font-weight-medium">Display picture</p>
            <p class="text-secondary" style="font-size: 14px">
              Click on your donation pool display picture below to upload a new one.
            </p>
          </div>

          <label>
            <v-avatar class="mt-0" size="100" style="cursor: pointer">
              <v-img
                cover
                aspect-ratio="1"
                :src="`${pool.image ? config.ipfsGateway + '/' + pool.image : '/assets/images/placeholder.svg'}`"
              />
            </v-avatar>
            <input type="file" class="d-none" accept="image/*" @change="changeImage" />
          </label>
        </div>
      </v-col>
    </template>
  </v-row>
</template>

<script>
import { onMounted, reactive, ref } from "vue";
import { categories, config, tokens } from "../../config/";
import { connectionService, poolService } from "../../services";
import { useRoute } from "vue-router";
import Loading from "../../components/Loading.vue";
import { storeToRefs } from "pinia";
import { usePoolStore } from "../../stores";
import { storage } from "../../utils";

export default {
  components: { Loading },
  setup() {
    const form = ref(null);
    const route = useRoute();
    const { pool } = storeToRefs(usePoolStore());
    const state = reactive({ loading: false, submitting: false, input: {}, pool: {} });
    const rules = { required: (value) => !!value || "This field is required" };
    onMounted(async () => {
      state.loading = true;

      await poolService.loadPool(route.params.id, connectionService.state.address);

      state.input.name = pool.value.name;
      state.input.token = pool.value.token;
      state.input.category = pool.value.category;
      state.input.description = pool.value.description;

      state.loading = false;
    });

    async function updatePool() {
      state.submitting = true;
      try {
        await form.value.validate();
        if (form.value.errors.length < 1) {
          await poolService.updatePool(pool.value.poolId, state.input);
        }
      } catch (e) {
        console.log(e);
      } finally {
        state.submitting = false;
      }
    }

    async function changeImage(e) {
      const file = e.target.files[0];

      if (file instanceof File) {
        const cid = await storage.upload(file);
        await poolService.updatePoolImage(pool.value.poolId, `${cid}/${file.name}`);
      }
    }

    return { tokens, pool, categories, config, state, rules, updatePool, changeImage, form };
  },
};
</script>

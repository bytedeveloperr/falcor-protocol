import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vuetify from "vite-plugin-vuetify";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill";
import nodePolyfills from "rollup-plugin-node-polyfills";

export default defineConfig({
  plugins: [vue(), vuetify({ autoImport: true })],
  build: {
    commonjsOptions: { transformMixedEsModules: true },
    rollupOptions: { plugins: [nodePolyfills({})] },
  },

  optimizeDeps: {
    esbuildOptions: {
      define: { global: "globalThis" },
      plugins: [NodeGlobalsPolyfillPlugin({ buffer: true }), NodeModulesPolyfillPlugin({ util: true })],
    },
  },

  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      util: "util",
      buffer: "rollup-plugin-node-polyfills/polyfills/buffer-es6",
    },
  },
});

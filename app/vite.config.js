import { fileURLToPath, URL } from "url"
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import vuetify from "vite-plugin-vuetify"
import NodeGlobalsPolyfillPlugin from "@esbuild-plugins/node-globals-polyfill"
import NodeModulesPolyfillPlugin from "@esbuild-plugins/node-modules-polyfill"

export default defineConfig({
  plugins: [vue(), vuetify({ autoImport: true })],

  optimizeDeps: {
    esbuildOptions: {
      define: { global: "globalThis" },
      plugins: [NodeGlobalsPolyfillPlugin({ buffer: true }), NodeModulesPolyfillPlugin({ util: true })],
    },
  },

  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
})

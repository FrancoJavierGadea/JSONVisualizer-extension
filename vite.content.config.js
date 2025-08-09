import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
  build: {
    outDir: "dist-content",
    rollupOptions: {
      input: resolve(__dirname, "src/content.js"),
      output: {
        entryFileNames: "content.js",
        format: "iife", // Sin imports
        inlineDynamicImports: true, // Ahora sí funciona porque es un solo input
      },
    },
  },
});

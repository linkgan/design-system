import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
  base: "./",
  root: ".",
  publicDir: "public",
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        typeSpecimen: resolve(__dirname, "type-specimen.html"),
        colorSpecimen: resolve(__dirname, "color-specimen.html"),
      },
    },
  },
});

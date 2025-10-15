import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        content: resolve(__dirname, "src/content/content.tsx"),
        background: resolve(__dirname, "src/background/background.ts"),
      },
      output: {
        entryFileNames: (chunk) => `${chunk.name}.js`,
        chunkFileNames: "assets/[name].js",
        assetFileNames: "assets/[name][extname]"
      }
    }
  }
});

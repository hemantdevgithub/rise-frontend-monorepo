import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "./src"),
      },
      {
        find: "./runtimeConfig",
        replacement: "./runtimeConfig.browser",
      },
      {
        find: "@ui",
        replacement: path.resolve(__dirname, "../../packages/ui/src"),
      },
    ],
  },
  build: {
    outDir: "./dist",
  },
});

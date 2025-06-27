import { defineConfig, type UserConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

const config: UserConfig = {
  build: {
    target: ["es2015"],
    cssTarget: ["es2015", "safari12"],
    outDir: "./dist",
  },
  base: "./",
  server: {
    watch: {
      usePolling: true,
    },
  },
  plugins: [react()],
};

// https://vite.dev/config/
export default defineConfig(config);

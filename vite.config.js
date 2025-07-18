import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  const HOST = `${env.VITE_HOST ?? "http://localhost:3000"}`;
  const PORT = `${env.VITE_PORT ?? "3000"}`;

  return {
    plugins: [react(), tailwindcss()],
    server: {
      host: HOST,
      port: PORT,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: './src/setupTests.js',
      coverage: {
     exclude: [
  'src/main.jsx',
  'src/components/header.jsx',
  'src/components/footer.jsx',
  'src/components/select.tsx',
  'src/components/sonner.tsx',
  '**/*.test.{js,jsx,ts,tsx}',
  '**/__tests__/**',
  'node_modules/**',
],
    },
  },
});

import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import svgr from "vite-plugin-svgr"

export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  server: {
    allowedHosts: ["all"],
    origin:
      "https://dc29-2401-4900-468d-3275-547a-49c7-2107-fa2f.ngrok-free.app",
  },
})

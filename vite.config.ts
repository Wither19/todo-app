import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
        plugins: [react()],
        server: {
                host: "0.0.0.0",
                port: 5000,
                strictPort: true,
                hmr: {
                        clientPort: 5000,
                },
                allowedHosts: [
                        "8753cb0f-b58d-4311-ab1c-62f85ee31a8c-00-1ecbwwtukikun.spock.replit.dev",
                ],
        },
});

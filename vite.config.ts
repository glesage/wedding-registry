import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
	plugins: [react()],
	server: { allowedHosts: ["geoffroylesage.com", "https://glesage.github.io"] },
	base: "/wedding-registry/",
});

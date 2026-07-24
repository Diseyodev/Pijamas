import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // Se pasa la configuración nativa de Vite dentro del bloque 'vite':
  vite: {
    base: "/Pijamas/",
  },

  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    // import.meta.env.BASE_URL obtiene '/Pijamas/' en producción y '/' en dev
    basepath: import.meta.env.BASE_URL,
  });

  return router;
};
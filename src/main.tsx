import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import { QueryClientProvider } from '@tanstack/react-query'
import { getRouter } from './router'

const router = getRouter()

// import.meta.env.BASE_URL toma automáticamente '/' en local (dev)
// y '/Pijamas/' en producción (build) según la propiedad 'base' en vite.config.ts
router.options.basepath = import.meta.env.BASE_URL

const queryClient = router.options.context.queryClient

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import { QueryClientProvider } from '@tanstack/react-query'
import { getRouter } from './router'

// Obtenemos la instancia del router que ya tenías configurada
const router = getRouter()

// Extraemos el queryClient que definiste dentro del contexto de tu router
const queryClient = router.options.context.queryClient

// Registrar el tipo del router para autocompletado de TypeScript
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
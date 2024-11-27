import { createBrowserRouter, Navigate } from 'react-router';
import { Home } from './pages/Home';
import { AppLayout, ContentLayout } from './components/layouts';
import { LoadingSpinner } from './components';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        element: <ContentLayout />,
        hydrateFallbackElement: <LoadingSpinner />,
        children: [
          {
            path: 'detail/:id',
            lazy: async () => {
              const { Detail } = await import('./pages/Detail');
              return { Component: Detail };
            },
          },
          {
            path: 'dashboard/:id/:name',
            lazy: async () => {
              const { Dashboard } = await import('./pages/Dashboard');
              return { Component: Dashboard };
            },
          },
          {
            path: '*',
            element: <Navigate to="/" replace />,
          },
        ],
      },
    ],
  },
]);

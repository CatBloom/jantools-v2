import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { Home } from './pages/Home';
import { AppLayout, ContentLayout } from './components/layouts';

export const Router = () => {
  const router = createBrowserRouter([
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

  return <RouterProvider router={router} />;
};

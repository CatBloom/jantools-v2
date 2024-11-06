import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { lazy } from 'react';
import { Home } from './pages/Home';
import { AppLayout, ContentLayout } from './components/layouts';
const Detail = lazy(() => import('./pages/Detail'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

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
              element: <Detail />,
            },
            {
              path: 'dashboard/:id/:name',
              element: <Dashboard />,
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

import { createBrowserRouter, Navigate } from 'react-router-dom';
import { lazy } from 'react';
import { Home } from './pages/Home';
import { AppLayout, ContentLayout } from './components';
const Detail = lazy(() => import('./pages/Detail'));

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
        children: [
          {
            path: 'detail/:id',
            element: <Detail />,
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

import { createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';
import { Home } from './pages';
import { AppLayout, ContentLayout } from './components/layouts';
const About = lazy(() => import('./pages/About'));

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
            path: 'about',
            element: <About />,
          },
        ],
      },
    ],
  },
]);

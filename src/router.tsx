import { createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';
// import { Layout } from './components/layouts';
import { Home } from './pages';
const About = lazy(() => import('./pages/About'));
import { Header, Footer } from './components/layouts';
// import { Outlet } from 'react-router-dom';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import { Suspense } from 'react';
import { Container } from '@mui/material';
import { LoadingSpinner } from './components/LoadingSpinner';

export const Layout = () => {
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <ScrollRestoration />
        <Container maxWidth="md">
          <Outlet />
        </Container>
      </Suspense>
    </>
  );
};

function Test() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Test />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        element: <Layout />,
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

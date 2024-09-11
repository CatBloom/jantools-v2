// import { useState } from 'react'
import { Layout, Header, Footer } from './components/layouts';
import { Route, Routes } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { loadingState } from './state/loadingState';
import { LoagingSpinner } from './components/LoadingSpinner';
import { lazy } from 'react';
import { Home } from './pages';
const About = lazy(() => import('./pages/About'));

export function App() {
  const [loaging, setLoading] = useRecoilState(loadingState);

  // loading test
  const handler = async () => {
    setLoading(true);
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log('fetch');
        resolve();
      }, 2000);
    });
    setLoading(false);
  };

  return (
    <>
      <Header />
      {loaging ? (
        <LoagingSpinner />
      ) : (
        <>
          <Routes>
            <Route path="/" index element={<Home />} />
            <Route element={<Layout />}>
              <Route path="/about" element={<About />} />
            </Route>
          </Routes>
          <button onClick={handler}>スピナーテスト</button>
        </>
      )}
      <Footer />
    </>
  );
}

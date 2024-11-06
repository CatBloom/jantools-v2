import { StrictMode } from 'react';
import { RecoilRoot, RecoilEnv } from 'recoil';
import { createRoot } from 'react-dom/client';
import { App } from './App';
RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </StrictMode>
);

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "react-pdf-highlighter/dist/style.css";
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import StateProvider from './context/stateProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <StateProvider>
        <App />
      </StateProvider>
    </BrowserRouter>,
  </StrictMode>,
)

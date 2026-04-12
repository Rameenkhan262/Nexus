import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { MeetingProvider } from "./context/MeetingContext";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MeetingProvider>
      <App />
    </MeetingProvider>
  </StrictMode>
);

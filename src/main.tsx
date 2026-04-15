import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { MeetingProvider } from "./context/MeetingContext";
import { PaymentProvider } from "./context/PaymentContext";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <PaymentProvider>   
    <MeetingProvider>
      <App />
    </MeetingProvider>
  </PaymentProvider>
</StrictMode>
);

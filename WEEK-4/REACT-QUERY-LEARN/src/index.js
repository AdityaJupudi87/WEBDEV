import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

import { QueryClient, QueryClientProvider} from '@tanstack/react-query'

const queryClient = new QueryClient();
// Now using the provider we will inject the queryClient to the entire application
// React-Query handles both fetching and caching using this single instance of queryClient

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>   
    <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>

  </React.StrictMode>
);
reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import './index.css';

// loaders
import { getDetails } from './loaders/loaders';

// layout
import RootLayout from './layouts/RootLayout';
import HelpLayout from './layouts/HelpLayout';

// pages
import App from './App';
import About from './components/About';
import ContactPage from './pages/ContactPage';
import FaqPage from './pages/FaqPage';
import NotFound from './pages/NotFound';
import Details from './pages/Details';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route index element={<App />} />
      <Route loader={getDetails} path='details' element={<Details />} />
      <Route path='about' element={<About />} />
      <Route path='help' element={<HelpLayout />}>
        <Route path='faq' element={<FaqPage />} />
        <Route path='contact' element={<ContactPage />} />
      </Route>
      <Route path='*' element={<NotFound />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

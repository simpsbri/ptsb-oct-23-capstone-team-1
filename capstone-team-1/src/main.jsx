import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Root from './routes/root';
import Businesses from './routes/businesses';
import AllUsers from './routes/users';
import Projects from './routes/projects';
// import VerticalNav from './components/Navigation/HorizontalNav'
import MainLayout from './components/MainLayout';

import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <MainLayout>
        <Root />
      </MainLayout>
    ),
  },
  {
    path: '/businesses',
    element: (
      <MainLayout>
        <Businesses />
      </MainLayout>
    ),
  },
  {
    path: '/users',
    element: (
      <MainLayout>
        <AllUsers />
      </MainLayout>
    ),
  },
  {
    path: '/projects',
    element: (
      <MainLayout>
        <Projects />
      </MainLayout>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

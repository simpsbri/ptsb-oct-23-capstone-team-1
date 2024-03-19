import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import App from './App'
import Root from './routes/root'
import Businesses from './routes/businesses'
import AllUsers from './routes/users'
import Projects from './routes/projects'
import MainLayout from './components/MainLayout'
import Profile from './routes/userProfile'
import BusinessProfile from './routes/businessProfile'

import './index.css'

const router = createBrowserRouter([
  {
    path: '/', // catch-all route for all other paths
    element: (
      <MainLayout>
        <Outlet /> {/* renders the child route components */}
      </MainLayout>
    ),
    children: [
      {
        path: '/', // includes the root path as a child route
        element: <Root />,
      },
      {
        path: '/businesses',
        element: <Businesses />,
      },
      {
        path: '/businesses/:id',
        element: <BusinessProfile />,
      },
      {
        path: '/users',
        element: <AllUsers />,
      },
      {
        path: '/projects',
        element: <Projects />,
      },
      {
        path: '/users/:id',
        element: <Profile />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

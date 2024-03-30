import React, { lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import Root from './routes/root'
import Businesses from './routes/businesses'
import AllUsers from './routes/users'
import UserBlank from './routes/newUserBlank'
import Projects from './routes/projects'
import MainLayout from './components/MainLayout'
import Profile from './routes/userProfile'
import BusinessProfile from './routes/businessProfile'
import BusinessBlank from './routes/newBusinessProfile'
import { Suspense } from 'react'

import './index.css'

const LazyBusinessBlank = lazy(() => import('./routes/newBusinessProfile'))
const LazyBusinessProfile = lazy(() => import('./routes/businessProfile'))
const LazyUserProfile = lazy(() => import('./routes/userProfile'))

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
        path: '/businesses/CreateNewBusiness',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <LazyBusinessBlank />
          </Suspense>
        ),
      },
      {
        path: '/businesses/:id',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <LazyBusinessProfile />
          </Suspense>
        ),
      },
      {
        path: '/users',
        element: <AllUsers />,
      },
      {
        path: '/users/createNewUser',
        element: <UserBlank />,
      },
      {
        path: '/projects',
        element: <Projects />,
      },
      {
        path: '/users/:id',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <LazyUserProfile />
          </Suspense>
        ),
      },
    ],
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
export default router

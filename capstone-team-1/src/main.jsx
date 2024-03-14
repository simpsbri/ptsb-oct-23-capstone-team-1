import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import Root from './routes/root'
import Businesses from './routes/businesses'
import AllUsers from './routes/users'
import Projects from './routes/projects'

import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
  },
  {
    path: '/businesses',
    element: <Businesses />,
  },
  {
    path: '/users',
    element: <AllUsers />,
  },
  {
    path: '/projects',
    element: <Projects />,
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

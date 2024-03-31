import React, { lazy } from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
  Route,
  useLocation,
  BrowserRouter,
  Routes,
} from 'react-router-dom'
import Root from './routes/root'
import Businesses from './routes/businesses'
import AllUsers from './routes/users'
import UserBlank from './routes/newUserBlank'
import Projects from './routes/projects'
import MainLayout from './components/MainLayout'
import Profile from './routes/userProfile'
import BusinessProfile from './routes/businessProfile'
import BusinessBlank from './routes/newBusinessProfile'
import NoAuthority from './routes/notAuthorized'
import PrivateRoutes from './components/PrivateRoutes'
import { AuthProvider } from '../server/middleware/setAuth'
import { Suspense } from 'react'

import './index.css'

const LazyBusinessBlank = lazy(() => import('./routes/newBusinessProfile'))
const LazyBusinessProfile = lazy(() => import('./routes/businessProfile'))
const LazyUserProfile = lazy(() => import('./routes/userProfile'))

function App() {
  return (
    <div className='App'>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Root />} />
            <Route path='/' element={<MainLayout />}>
              <Route path='/' element={<PrivateRoutes />}>
                <Route path='/profile' element={<Profile />} />
                <Route path='/businesses' element={<Businesses />} />
                <Route
                  path='/businesses/CreateNewBusiness'
                  element={<LazyBusinessBlank />}
                />
                <Route
                  path='/users'
                  roles={['isAdmin']}
                  element={<AllUsers />}
                />
                <Route path='/users/createNewUser' element={<UserBlank />} />
                <Route path='/projects' element={<Projects />} />
                <Route
                  path='/businesses/:id'
                  element={<LazyBusinessProfile />}
                />

                <Route path='/users/:id' element={<LazyUserProfile />} />
              </Route>

              <Route path='/not-authorized' element={<NoAuthority />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}
export default App

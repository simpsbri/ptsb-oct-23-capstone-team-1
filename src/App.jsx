import React, { lazy, useContext } from 'react'
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
import Root from './root'
import Businesses from './routes/businesses'
import AllUsers from './routes/users'
import UserBlank from './routes/newUserBlank'
import Projects from './routes/projects'
import ProjectBlank from './routes/newProjectProfile'
import ProjectOverview from './routes/projectProfile'
import MainLayout from './components/MainLayout'
import Profile from './routes/userProfile'
import BusinessProfile from './routes/businessProfile'
import BusinessBlank from './routes/newBusinessProfile'
import NoAuthority from './routes/notAuthorized'
import PrivateRoutes from './components/PrivateRoutes'
import { AuthProvider } from '../server/middleware/setAuth'
import { AuthContext } from '../server/middleware/setAuth'
import { Suspense } from 'react'

import './index.css'

const LazyBusinessBlank = lazy(() => import('./routes/newBusinessProfile'))
const LazyBusinessProfile = lazy(() => import('./routes/businessProfile'))
const LazyUserProfile = lazy(() => import('./routes/userProfile'))

function DebugAuthProvider() {
  const authContext = useContext(AuthContext)

  return null
}

function App() {
  const { auth } = useContext(AuthContext)
  return (
    <div className='App'>
      <AuthProvider>
        <DebugAuthProvider />
        <BrowserRouter>
          <Suspense>
            <Routes>
              <Route path='/' element={<Root />} />
              <Route path='/' element={<MainLayout />}>
                <Route
                  path='/admin'
                  element={<PrivateRoutes isAdmin='Admin' />}
                >
                  <Route path='businesses' element={<Businesses />} />
                  <Route path='profile' element={<Profile />} />

                  <Route
                    path='users'
                    roles={['isAdmin']}
                    element={<AllUsers />}
                  />
                  <Route
                    path='businesses/CreateNewBusiness'
                    element={<LazyBusinessBlank />}
                  />
                  <Route
                    path='businesses/:id'
                    element={<LazyBusinessProfile />}
                  />
                  <Route path='projects' element={<Projects />} />
                  <Route path='projects/:id' element={<ProjectOverview />} />
                  <Route
                    path='projects/createNewProject'
                    element={<ProjectBlank />}
                  />
                  <Route path='users/:id' element={<LazyUserProfile />} />
                  <Route path='users/createNewUser' element={<UserBlank />} />
                </Route>

                <Route
                  path='/business'
                  element={<PrivateRoutes isAdmin='Business' />}
                >
                  <Route path='businesses/:id' element={<BusinessProfile />} />
                  <Route path='users/:id' element={<LazyUserProfile />} />
                </Route>

                <Route
                  path='/capstone'
                  element={<PrivateRoutes isAdmin='Capstone' />}
                >
                  <Route path='users/:id' element={<LazyUserProfile />} />
                  <Route path='projects' element={<Projects />} />
                  <Route path='projects/:id' element={<ProjectOverview />} />
                </Route>

                <Route path='/not-authorized' element={<NoAuthority />} />
                <Route path='*' element={<Navigate to='/not-authorized' />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}
export default App

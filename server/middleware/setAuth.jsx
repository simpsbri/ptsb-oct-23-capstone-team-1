import React, { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: null,
    isAdmin: null,
    user: null,
  })

  const [isLoading, setIsLoading] = useState(true)

  // authentication logic...
  const login = (token, isAdmin, user) => {
    setAuth({ token, isAdmin, user })
    setIsLoading(false)
  }

  // Simulate fetching auth state from an API
  useEffect(() => {
    const fetchAuthState = async () => {
      // Fetch auth state from API...
      // For now, we'll just simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      login('fake-token', true, 'fake-user')
    }

    fetchAuthState()
  }, [])

  if (isLoading) {
    return <p>Loading...</p> // Replace this with your loading spinner
  }

  return (
    <AuthContext.Provider value={{ auth, login }}>
      {children}
    </AuthContext.Provider>
  )
}

import React from 'react'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import HorizontalNav from './Navigation/HorizontalNav'

const MainLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <HorizontalNav />
      {children}
      <Footer />
    </div>
  )
}

export default MainLayout

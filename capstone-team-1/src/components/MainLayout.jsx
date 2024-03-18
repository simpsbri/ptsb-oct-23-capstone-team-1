import React from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import HorizontalNav from './Navigation/HorizontalNav';
import { Container } from '@mui/material';

const MainLayout = ({ children }) => {
  return (
    <div>
      <Container>
        <Header />
        <HorizontalNav />
        {children}
        <Footer />
      </Container>
    </div>
  );
};

export default MainLayout;

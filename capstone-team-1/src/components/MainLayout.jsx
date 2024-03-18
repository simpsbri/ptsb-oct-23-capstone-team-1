import React from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import HorizontalNav from './Navigation/HorizontalNav';
import { Container } from '@mui/material';

const MainLayout = ({ children }) => {
  return (
    <div>
      <Container
        maxWidth={false}
        sx={{ margin: '6px', padding: '20px', width: '100%' }}
      >
        <Header />
        <HorizontalNav />
        {children}
        <Footer />
      </Container>
    </div>
  );
};

export default MainLayout;

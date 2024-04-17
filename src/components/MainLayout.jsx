import React from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import HorizontalNav from './Navigation/HorizontalNav';
import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';

function MainLayout() {
  return (
    <div>
      <Container maxWidth={false} sx={{ width: '100%' }}>
        <Header />
        <HorizontalNav />
        <Outlet />
        <Footer />
      </Container>
    </div>
  );
}

export default MainLayout;

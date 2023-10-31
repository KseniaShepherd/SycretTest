import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from '../pages/MainPage/MainPage';
import PlacingOrderPage from '../pages/PlacingOrderPage/PlacingOrderPage';
import PaymentPage from '../pages/PaymentPage/PaymentPage';
const Router = () => {
    return (
        <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='/order' element={<PlacingOrderPage/>} />
      <Route path='/payment' element={<PaymentPage/>} />
      

    </Routes>
    );
};

export default Router;
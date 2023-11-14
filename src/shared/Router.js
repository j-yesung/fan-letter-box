import React from 'react';
import Main from 'pages/Main';
import Content from 'pages/Content';
import Header from 'components/Layouts/Header';
import Footer from 'components/Layouts/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Router = () => {
  return (
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="content/:id" element={<Main />} />
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
  );
};

export default Router;

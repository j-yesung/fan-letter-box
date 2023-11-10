import React from 'react';
import Main from 'pages/Main';
import Content from 'pages/Content';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="content/:id" element={<Content />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

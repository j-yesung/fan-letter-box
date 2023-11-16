import React, { useState } from 'react';
import Main from 'pages/Main';
import Header from 'components/Layouts/Header';
import Footer from 'components/Layouts/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SelectedContext } from 'context/SelectedContext';

const Router = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <BrowserRouter>
      <SelectedContext.Provider value={{ selectedOption, setSelectedOption }}>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="content/:id" element={<Main />} />
        </Routes>
        <Footer></Footer>
      </SelectedContext.Provider>
    </BrowserRouter>
  );
};

export default Router;

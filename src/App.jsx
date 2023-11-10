import React from 'react';
import Router from 'shared/Router';
import Header from 'components/Layouts/Header';
import Footer from 'components/Layouts/Footer';
import GlobalStyle from 'components/Layouts/GlobalStyle';

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Header></Header>
      <Router />
      <Footer></Footer>
    </>
  );
};

export default App;

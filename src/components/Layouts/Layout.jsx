import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from '../../pages/Main';

const Layout = props => {
  return (
    <>
      <Header></Header>
      <Main>{props.children}</Main>
      <Footer></Footer>
    </>
  );
};

export default Layout;

import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';

const Layout = props => {
  return (
    <>
      <Header></Header>
      {props.children}
      <Main></Main>
      <Footer></Footer>
    </>
  );
};

export default Layout;

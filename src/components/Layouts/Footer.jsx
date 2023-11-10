import React from 'react';
import styled from 'styled-components';

const FooterBox = styled.footer`
  grid-area: footer;
  border: 2px solid black;
  background-color: black;
  color: white;
`;

const Footer = () => {
  return <FooterBox>Footer</FooterBox>;
};

export default Footer;

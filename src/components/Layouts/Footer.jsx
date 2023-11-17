import React from 'react';
import styled from 'styled-components';

const FooterBox = styled.footer`
  grid-area: footer;
  color: #ff2525;
  bottom: 0;
  margin: 20px;
`;

const Footer = () => {
  return <FooterBox></FooterBox>;
};

export default Footer;

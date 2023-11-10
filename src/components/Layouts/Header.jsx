import React from 'react';
import styled from 'styled-components';

const HeaderBox = styled.header`
  grid-area: header;
  border: 2px solid black;
  background-color: black;
  color: white;
`;

const Header = () => {
  return <HeaderBox>Header</HeaderBox>;
};

export default Header;

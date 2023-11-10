import React from 'react';
import styled from 'styled-components';

const MainBox = styled.main`
  grid-area: main;
  background-color: orange;
`;

const Main = () => {
  return <MainBox>Main</MainBox>;
};

export default Main;

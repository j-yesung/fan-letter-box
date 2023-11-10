import React from 'react';
import styled from 'styled-components';
import Button from 'components/Button';

const MainBox = styled.main`
  grid-area: main;
  margin: 10px;
  border: 2px solid black;
`;

const Main = () => {
  console.log('Main 렌더링');

  return (
    <>
      <MainBox>
        <Button></Button>
        {/* <Button mainProps={data}></Button> */}
      </MainBox>
    </>
  );
};

export default Main;

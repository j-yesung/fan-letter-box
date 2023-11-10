import React from 'react';
import styled from 'styled-components';
import Button from 'components/Button';

const MainBox = styled.main`
  grid-area: main;
  border: 2px solid black;
`;

const Main = () => {
  console.log('Main 렌더링');
  const data = [
    { id: 1, name: '민지' },
    { id: 2, name: '하니' },
    { id: 3, name: '다니엘' },
    { id: 4, name: '해린' },
    { id: 5, name: '혜인' },
  ];

  return (
    <>
      <MainBox>
        <Button mainProps={data}></Button>
      </MainBox>
    </>
  );
};

export default Main;

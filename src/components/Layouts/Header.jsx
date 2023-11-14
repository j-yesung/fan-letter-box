import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const HeaderBox = styled.header`
  @font-face {
    font-family: 'RixInooAriDuriR';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2207-01@1.0/RixInooAriDuriR.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  font-family: 'RixInooAriDuriR';
  font-size: 30px;
  color: #000000;
  margin: 20px;
`;
const HomeButton = styled.button`
  position: absolute;
  left: 100px;
  top: 30px;
`;

const Header = () => {
  const navigate = useNavigate();
  const goToHomePage = () => {
    navigate('/');
  };

  return (
    <>
      <HeaderBox>
        <HomeButton onClick={goToHomePage}>홈으로 이동</HomeButton>
        New Jeans
      </HeaderBox>
    </>
  );
};

export default Header;

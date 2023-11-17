import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isActive, selectedData } from 'modules/fanLetter';

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
const HomeButton = styled.div`
  position: absolute;
  cursor: pointer;
  left: 100px;
  top: 30px;
  width: 30px;
  height: 30px;
  background-image: url('https://cdn-icons-png.flaticon.com/512/60/60817.png');
  background-size: cover;
`;

const Header = () => {
  const fanLetter = useSelector(state => state.fanLetter);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const goToHomePage = () => {
    dispatch(isActive('1'));
    dispatch(selectedData(fanLetter.data[0]));
    navigate('/');
  };

  return (
    <HeaderBox>
      <HomeButton onClick={goToHomePage}></HomeButton>
      New Jeans
    </HeaderBox>
  );
};

export default Header;

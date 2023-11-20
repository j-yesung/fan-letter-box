import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isActive, isMode, selectedData } from 'modules/fanLetter';
import { darkTheme, lightTheme } from 'components/style/theme';
import { useEffect } from 'react';
import * as S from '../style/Comment.styled';
import { Link } from 'react-router-dom';

const HEADER_BOX = styled.header`
  @font-face {
    font-family: 'RixInooAriDuriR';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2207-01@1.0/RixInooAriDuriR.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }

  display: flex;
  justify-content: space-between;
  font-family: 'RixInooAriDuriR';
  font-size: 30px;
  margin: 20px;
`;
const HOME_BUTTON = styled.div`
  cursor: pointer;
  width: 30px;
  height: 30px;
  background-image: url('https://cdn-icons-png.flaticon.com/512/60/60817.png');
  background-size: cover;
  filter: ${({ theme }) => theme.invertFilter};
`;
const MODE_BUTTON = styled(S.Button)`
  border: 2px solid ${({ theme }) => theme.buttonColor};
  color: ${({ theme }) => theme.buttonTextColor};
  background-color: ${({ theme }) => theme.buttonColor};

  &:hover {
    background: 0 0;
    color: ${({ theme }) => theme.buttonColor};
  }
`;

const Header = () => {
  const fanLetter = useSelector(state => state.fanLetter);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(isMode(lightTheme));
  }, [dispatch]);

  const goToHomePage = () => {
    dispatch(isActive('1'));
    dispatch(selectedData(fanLetter.data[0]));
    navigate('/');
  };

  const toggleTheme = () => {
    if (fanLetter.isMode === lightTheme) {
      dispatch(isMode(darkTheme));
    } else {
      dispatch(isMode(lightTheme));
    }
  };

  return (
    <HEADER_BOX>
      <HOME_BUTTON onClick={goToHomePage}></HOME_BUTTON>
      <Link to="/" onClick={goToHomePage}>
        New Jeans
      </Link>
      <MODE_BUTTON onClick={toggleTheme}>
        {fanLetter.isMode === darkTheme ? lightTheme.modeText : darkTheme.modeText}
      </MODE_BUTTON>
    </HEADER_BOX>
  );
};

export default Header;

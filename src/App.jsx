import React, { useEffect } from 'react';
import Router from 'shared/Router';
import GlobalStyle from 'components/Layouts/GlobalStyle';
import { useDispatch, useSelector } from 'react-redux';
import fakeData from 'data/fakeData.json';
import { getJsonData } from 'modules/fanLetter';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from 'components/style/theme';

const App = () => {
  const dispatch = useDispatch();
  const fanLetter = useSelector(state => state.fanLetter);

  useEffect(() => {
    dispatch(getJsonData(fakeData));
  }, [dispatch]);

  return (
    <>
      <ThemeProvider theme={fanLetter.isMode || lightTheme}>
        <GlobalStyle />
        <Router />
      </ThemeProvider>
    </>
  );
};

export default App;

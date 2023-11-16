import React, { useEffect } from 'react';
import Router from 'shared/Router';
import GlobalStyle from 'components/Layouts/GlobalStyle';
import { useDispatch } from 'react-redux';
import fakeData from 'data/fakeData.json'; // json은 웹팩이 일을 안 해줌
import { getJsonData } from 'modules/fanLetter';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getJsonData(fakeData));
  }, [dispatch]);

  return (
    <>
      <GlobalStyle />
      <Router />
    </>
  );
};

export default App;

import React, { useEffect, useRef, useState } from 'react';
import Router from 'shared/Router';
import GlobalStyle from 'components/Layouts/GlobalStyle';
import { CommonContext } from 'context/CommonContext';

const App = () => {
  const [data, setData] = useState([]);

  const fetchJsonData = async url => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('not ok..');
    }
    const jsonData = await response.json();
    return jsonData.data;
  };

  useEffect(() => {
    const JSON_URL = '/fakeData.json';

    fetchJsonData(JSON_URL)
      .then(data => setData(data))
      .catch(error => console.error('error:', error));
  }, []);

  return (
    <>
      <CommonContext.Provider value={data}>
        <GlobalStyle />
        <Router />
      </CommonContext.Provider>
    </>
  );
};

export default App;

import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

// data 받아와야할 듯
const Content = () => {
  const getParam = useParams();
  const location = useLocation();
  const userInfo = { ...location.state };
  console.log('userInfo: ', userInfo);

  // useEffect(() => {
  //   console.log('', getParam);
  // });

  /**
   * 이제 id 값 마다 보여지는 화면 다르게 하기
   */

  return (
    <>
      <div>Content</div>
    </>
  );
};

export default Content;

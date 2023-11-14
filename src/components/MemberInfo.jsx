import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const ImgBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  background-image: url(${props => props.$img});
  background-position: center;
  background-size: cover;
  transition: 0.25s;
  width: 500px;
  height: 300px;
  margin: 20px;
  cursor: pointer;
  filter: ${props => (props.$isActive ? 'grayscale(0)' : 'grayscale(1)')};

  &:hover {
    filter: grayscale(0);
    transform: scale(1.1);
  }
`;

const MemberInfo = props => {
  console.log('MemberInfo 렌더링');
  const [activeId, setActiveId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setActiveId(1);
  }, []);

  const goToContentPage = item => {
    setActiveId(item.id);
    navigate(`/content/${item.id}`, { state: item });
  };
  return (
    <>
      {/* Main 컴포넌트 전용 버튼 */}
      {props.data.map(item => {
        return (
          <ImgBox
            key={item.id}
            $img={item.img}
            $isActive={activeId === item.id}
            onClick={() => goToContentPage(item)}
          ></ImgBox>
        );
      })}
    </>
  );
};

export default MemberInfo;

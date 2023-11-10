import React from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ButtonBox = styled.button`
  display: flex;
  margin: 5px;
`;
const data = [
  { id: 1, name: '민지' },
  { id: 2, name: '하니' },
  { id: 3, name: '다니엘' },
  { id: 4, name: '해린' },
  { id: 5, name: '혜인' },
];

const Button = () => {
  console.log('Button 렌더링');
  const navigate = useNavigate();
  const goToContentPage = item => navigate(`/content/${item.id}`, { state: item });

  return (
    <>
      {/* Main 컴포넌트 전용 버튼 */}
      {data.map(item => {
        return (
          <ButtonBox
            key={item.id}
            onClick={() => {
              goToContentPage(item);
            }}
          >
            {item.name}
          </ButtonBox>
        );
      })}
    </>
  );
};

export default Button;

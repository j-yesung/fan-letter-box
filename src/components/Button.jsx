import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const ButtonBox = styled.button`
  display: flex;
  margin: 5px;
`;

const Button = props => {
  console.log('Button 렌더링', props);
  const navigate = useNavigate();

  return (
    <>
      {/* 이거는 Main 컴포넌트 전용 버튼 */}
      {props.mainProps.map(item => {
        return (
          <ButtonBox
            key={item.id}
            onClick={() => {
              navigate(`/content/${item.id}`);
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

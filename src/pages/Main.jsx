import React from 'react';
import styled from 'styled-components';
import MemberInfo from 'components/MemberInfo';
import Comment from 'components/Comment';
import Select from 'components/Select';

const MainContainer = styled.main`
  margin: 10px;
  transition: 0.25s;
`;
const Section = styled.section`
  display: flex;
  flex-direction: column;
`;

const Main = () => {
  return (
    <>
      <MainContainer>
        <MemberInfo></MemberInfo>
      </MainContainer>
      <Section>
        <Select />
        <Comment />
      </Section>
    </>
  );
};

export default React.memo(Main);

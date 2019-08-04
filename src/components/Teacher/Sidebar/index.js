import React from 'react';
import styled from 'styled-components';

import Header from './Header';
import Content from './Content';

const Wrapper = styled.div`
  width: 100%;
  max-width: 300px;
  min-width: 250px;
  min-height: 100vh;
  background-color: white;
  border-right: 1px solid #e4e6e8;
`;

const Sidebar = () => {
  return (
    <Wrapper>
      <Header />
      <Content />
    </Wrapper>
  );
};

export default Sidebar;

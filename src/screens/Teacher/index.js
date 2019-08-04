import React, { useState } from 'react';
import styled from 'styled-components';
import { Switch } from 'react-router-dom';

import { TeacherRoute } from 'components/Routes';
import SidebarToggler from 'components/SidebarToggler';
import Flex from 'components/Flex';
import Sidebar from 'components/Teacher/Sidebar';
import Header from 'components/Teacher/Header';
import Blog from 'screens/Teacher/Blog';

const Wrapper = styled(Flex)`
  background-color: gray;
  padding-left: ${props => (props.showSideBar ? '60px' : '0px')};
`;

const Content = styled.div`
  flex-grow: 1;
  background-color: white;
`;

const Body = styled.div`
  padding: 50px;
`;

export default function() {
  const [showSideBar, setShowSideBar] = useState(true);
  return (
    <>
      <SidebarToggler
        showSideBar={showSideBar}
        toggleSideBar={() => setShowSideBar(!showSideBar)}
      />
      <Wrapper showSideBar={showSideBar}>
        {showSideBar && <Sidebar />}
        <Content>
          <Header />
          <Body>
            <Switch>
              <TeacherRoute exact path="/teacher" component={Blog} />
              <TeacherRoute path="/teacher/blog" component={Blog} />
            </Switch>
          </Body>
        </Content>
      </Wrapper>
    </>
  );
}

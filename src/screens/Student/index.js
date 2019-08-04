import React, { useState } from 'react';
import styled from 'styled-components';
import { Switch } from 'react-router-dom';

import { StudentRoute } from 'components/Routes';
import SidebarToggler from 'components/SidebarToggler';
import Flex from 'components/Flex';
import Sidebar from 'components/Student/Sidebar';
import Header from 'components/Student/Header';
import Blogs from 'screens/Student/Blogs';

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
              <StudentRoute exact path="/student" component={Blogs} />
              <StudentRoute path="/student/blogs" component={Blogs} />
            </Switch>
          </Body>
        </Content>
      </Wrapper>
    </>
  );
}

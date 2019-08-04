import React, { useState } from 'react';
import SidebarToggler from 'components/SidebarToggler';
import styled from 'styled-components';
import { Switch } from 'react-router-dom';

import Flex from 'components/Flex';
import Sidebar from 'components/Supervisor/Sidebar';
import Header from 'components/Supervisor/Header';
import Profile from 'screens/Supervisor/Profile';
import { Add, Import, Remove } from 'screens/Supervisor/Student';
import { SupervisorRoute } from 'components/Routes';

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
              <SupervisorRoute exact path="/supervisor" component={Add} />
              <SupervisorRoute path="/supervisor/addstudent" component={Add} />
              <SupervisorRoute
                path="/supervisor/importstudent"
                component={Import}
              />
              <SupervisorRoute
                path="/supervisor/managestudent"
                component={Remove}
              />
              <SupervisorRoute path="/supervisor/profile" component={Profile} />
            </Switch>
          </Body>
        </Content>
      </Wrapper>
    </>
  );
}

import React, { useState } from 'react';
import styled from 'styled-components';
import { Switch, Route, Redirect } from 'react-router-dom';

import SidebarToggler from 'components/SidebarToggler';
import Flex from 'components/Flex';
import Sidebar from 'components/Admin/Sidebar';
import Header from 'components/Admin/Header';
import Blog from 'screens/Admin/Blog';
import Region from 'screens/Admin/Region';
import School from 'screens/Admin/School';

const Wrapper = styled(Flex)`
  background-color: gray;
  padding-left: ${props => (props.showSideBar ? '60px' : '0px')};
  flex-wrap: wrap;
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
              <Route
                exact
                path="/admin"
                render={() => <Redirect to="/admin/blogs" />}
              />
              <Route path="/admin/blogs" component={Blog} />
              <Route path="/admin/regions" component={Region} />
              <Route path="/admin/schools" component={School} />
            </Switch>
          </Body>
        </Content>
      </Wrapper>
    </>
  );
}

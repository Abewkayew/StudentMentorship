import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';

import Login from 'screens/Login';
import Admin from 'screens/Admin';
import Supervisor from 'screens/Supervisor';
import Teacher from 'screens/Teacher';
import Student from 'screens/Student';
import './App.css';

const AppWrapper = styled.div`
  background-color: white;
`;

function App() {
  return (
    <AppWrapper>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/login" />} />
        <Route path="/login" component={Login} />
        <Route path="/admin" component={Admin} />
        <Route path="/supervisor" component={Supervisor} />
        <Route path="/teacher" component={Teacher} />
        <Route path="/student" component={Student} />
      </Switch>
    </AppWrapper>
  );
}

export default App;

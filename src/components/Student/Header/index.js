import React from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { removeToken } from 'utils/helpers';
import LocaleToggle from 'containers/LocaleToggle';
import messages from './messages';
import Flex from 'components/Flex';

const Wrapper = styled(Flex)`
  height: 60px;
  box-shadow: 0px 4px 5px -2px #ccc;
  padding: 0px 20px;
`;

const StyledP = styled.p`
  margin-bottom: 0px;
  margin-right: 25px;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.65);
`;

const Left = styled(Flex)``;

class Header extends React.Component {
  handleLogout = () => {
    const { history } = this.props;
    removeToken();
    history.push('/login');
  };

  render() {
    return (
      <Wrapper alignItems="center" justifyContent="space-between">
        <Left>
          <Link to="/student/">
            <StyledP>
              <FormattedMessage {...messages.blogs} />
            </StyledP>
          </Link>
        </Left>
        <Left>
          <LocaleToggle />
          <Button onClick={this.handleLogout} icon="logout">
            <FormattedMessage {...messages.logout} />
          </Button>
        </Left>
      </Wrapper>
    );
  }
}

export default withRouter(Header);

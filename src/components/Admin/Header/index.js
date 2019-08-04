import React from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

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
          <Link to="/admin/">
            <StyledP>
              <FormattedMessage {...messages.blog} />
            </StyledP>
          </Link>
          <Link to="/admin/regions">
            <StyledP>
              <FormattedMessage {...messages.regions} />
            </StyledP>
          </Link>
          <Link to="/admin/schools">
            <StyledP>
              <FormattedMessage {...messages.schools} />
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

Header.propTypes = {
  updateLocale: PropTypes.func.isRequired,
};

export default withRouter(Header);

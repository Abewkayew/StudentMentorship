import React from 'react';
import styled from 'styled-components';
import { Icon } from 'antd';
import { FormattedMessage } from 'react-intl';

import messages from './messages';
import Flex from 'components/Flex';

const Wrapper = styled(Flex)`
  padding: 10px;
  border-bottom: 1px solid #e4e6e8;
`;

const SideHeader = () => {
  return (
    <Wrapper justifyContent="space-between" alignItems="center">
      <span>
        <FormattedMessage {...messages.header} />
      </span>
      <Icon type="arrow-down" />
    </Wrapper>
  );
};

export default SideHeader;

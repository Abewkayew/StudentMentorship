import React from 'react';
import { Icon, Tooltip } from 'antd';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

const Wrapper = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  text-align: center;
`;

const getPosition = showSideBar => (showSideBar ? 'left' : 'right');

const getIconColor = showSideBar => (showSideBar ? '#e4e6e8' : 'gray');

const getTooltipTitle = showSideBar =>
  showSideBar ? (
    <FormattedMessage {...messages.hide} />
  ) : (
    <FormattedMessage {...messages.show} />
  );

const SidebarToggler = ({ toggleSideBar, showSideBar }) => {
  return (
    <Wrapper>
      <Tooltip placement="left" title={getTooltipTitle(showSideBar)}>
        <Icon
          onClick={toggleSideBar}
          style={{ fontSize: '35px', color: getIconColor(showSideBar) }}
          theme="filled"
          type={`${getPosition(showSideBar)}-circle`}
        />
      </Tooltip>
    </Wrapper>
  );
};

export default React.memo(SidebarToggler);

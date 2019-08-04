import React from 'react';
import styled from 'styled-components';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import messages from './messages';
import Item from './Item';

const Wrapper = styled.div`
  background-color: white;
  padding: 20px 0px 5px 20px;
`;

const MyIcon = styled(Icon)`
  margin-right: 10px;
  font-size: 20px;
  color: black;
`;

const MySpan = styled.span`
  color: rgba(0, 0, 0, 0.65);
  font-size: 16px;
`;

const Content = () => {
  return (
    <Wrapper>
      <Link to="/admin/blogs">
        <Item>
          <MyIcon type="profile" />
          <MySpan>
            <FormattedMessage {...messages.blog} />
          </MySpan>
        </Item>
      </Link>
      <Link to="/admin/regions">
        <Item>
          <MyIcon type="global" />
          <MySpan>
            <FormattedMessage {...messages.regions} />
          </MySpan>
        </Item>
      </Link>
      <Link to="/admin/schools">
        <Item>
          <MyIcon type="bank" />
          <MySpan>
            <FormattedMessage {...messages.schools} />
          </MySpan>
        </Item>
      </Link>
    </Wrapper>
  );
};

export default Content;

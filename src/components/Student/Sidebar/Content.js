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
      <Link to="/student/blogs">
        <Item>
          <MyIcon type="profile" />
          <MySpan>
            <FormattedMessage {...messages.blogs} />
          </MySpan>
        </Item>
      </Link>
    </Wrapper>
  );
};

export default Content;
